import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FiPlusSquare, FiRefreshCcw } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Container, Content, RelacionadosContainer, NavBar } from './styles';
import Relacionado from './components/relacionado';
import SkeletonRelacionado from './components/relacionado/skeleton';
import api from '../../../services/api';
import ModalAddRelacionados from './components/ModalAddRelacionados';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

interface IRelacionadosTYPES {
  id: number;
  id_referencia: number;
  id_contato: number;
  referencia: {
    nome_razao: string;
    apelido_fantasia: string;
    avatar_url: string;
    celular: string;
    fixo: string;
    email: string;
  };
}

interface SignUpFormdata {
  idcontato: number;
  idreferencia: number;
}

const Relacionados: React.FC = () => {
  const location = useLocation();
  const formRef = useRef<FormHandles>(null);
  const queryParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const idUser = queryParams.get('idUser');
  const [relacionados, setRelacionados] = useState<IRelacionadosTYPES[]>([]);

  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  const handleAddRelacionado2 = useCallback(
    async (idreferencia: number) => {
      setLoadingAdd(true);
      try {
        const formData = {
          id_contato: idUser,
          id_referencia: idreferencia,
        };
        const response = await api.post('/references', formData);
        if (response.data.code === 201) {
          addToast({
            type: 'error',
            title: 'Error ao adicionar relacionado!',
            description: `${response.data.message}`,
          });
        } else {
          setModalOpen(false);
          addToast({
            type: 'success',
            title: 'Cadastro realizado',
            description: 'O contato foi referênciado!',
          });
          setRelacionados([...relacionados, response.data[0]]);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro servidor',
          description: `Ocorreu um erro com o servidor`,
        });
      }
      setLoadingAdd(false);
    },
    [addToast, idUser, relacionados],
  );

  const handleDeleteRelacionado = useCallback(
    (idReferencia: number) => {
      // console.log(idReferencia);
      const MySwal = withReactContent(Swal);

      MySwal.fire({
        title: 'Tem certeza que deseja excluir este contato de referência?',
        text: 'Este procedimento pode ser reversível!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar!',
      }).then(async (result) => {
        if (result.value) {
          // console.log(`${idContato} - ${idReferencia}`);
          await api
            .delete(
              `references/?contato=${idUser}&referencia=${idReferencia}`,
              {
                params: {
                  id_contato: idUser,
                  id_referencia: idReferencia,
                },
              },
            )
            .then(() => {
              // console.log(res.data);
              const updatedState = relacionados.filter(
                (relacionado) => relacionado.id_referencia !== idReferencia,
              );

              setRelacionados(updatedState);
              // console.log(res);
              // Swal.fire(
              //   'Excluído!',
              //   `${res.data} O contato foi removido da referência!`,
              //   'success',
              // );
              // history.push('/dashboard/contatos');
            });
        }
      });
    },
    [idUser, relacionados],
  );

  const carregarRelacionados = useCallback(async () => {
    setLoading(true);
    const response = await api.get(`/references/${idUser}`);
    setRelacionados(response.data);
    setLoading(false);
  }, [idUser]);

  useEffect(() => {
    carregarRelacionados();
  }, [carregarRelacionados]);

  return (
    <>
      <Container>
        <ModalAddRelacionados
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddRelacionado={handleAddRelacionado2}
        />
        <Content>
          <NavBar>
            <div>
              <nav>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      toggleModal();
                    }}
                  >
                    <div className="text">Adicionar</div>
                    <div className="icon">
                      <FiPlusSquare size={14} />
                    </div>
                  </button>
                </div>
              </nav>
            </div>
            {/* <div>
              <Form ref={formRef} onSubmit={() => {}}>
                <Input
                  name="email"
                  icon={FiSearch}
                  type="text"
                  placeholder="Localizar.."
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    // localizarAgora(e);
                  }}
                />
              </Form>
            </div> */}
            <div>
              <nav>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      /* TODO OPEN MODAL */
                      // openModal();
                    }}
                  >
                    <div className="iconCenter">
                      <FiRefreshCcw size={14} />
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          </NavBar>

          <RelacionadosContainer data-testid="foods-list">
            {loading ? (
              <>
                <SkeletonRelacionado />
              </>
            ) : (
              <>
                {relacionados &&
                  relacionados.map((relacionado) => (
                    <>
                      <Relacionado
                        key={relacionado.id}
                        relacionado={relacionado}
                        idContato={Number(idUser)}
                        handleDelete={handleDeleteRelacionado}
                      />
                    </>
                  ))}
                {loadingAdd ? <SkeletonRelacionado /> : <></>}
              </>
            )}
          </RelacionadosContainer>
        </Content>
      </Container>
    </>
  );
};

export default Relacionados;
