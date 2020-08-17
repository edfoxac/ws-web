/* eslint-disable react/prop-types */
import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FormHandles } from '@unform/core';
import { FiSearch, FiEdit, FiPlus } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FaUserTag } from 'react-icons/fa';
import Input from '../../../components/Input';
import {
  Form,
  LoadContatos,
  ListarRelacionados,
  TopoListarRelacionados,
} from './styles';
import api from '../../../../../services/api';
import Modal from '../Modal';

import { useMenu } from '../../../../../hooks/menu';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddRelacionado: (idreferencia: number) => void;
  // setRelacionados: (food: Omit<IRelacionadosTYPES, 'id'>) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddRelacionado,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [contatosFormat, setContatosFormat] = useState<any>();
  const [contatosv, setContatos] = useState([]);
  const [buscaContato, setBuscaContato] = useState<any>([]);
  const [localizar, setLocalizar] = useState('');
  const [loading, setLoading] = useState(false);
  const { urlPerfil, updateUrlPerfil } = useMenu();
  const history = useHistory();
  const carregarContatos = useCallback(async () => {
    await api.get(`/contatos/basic`).then((response) => {
      setContatos(response.data);
    });
  }, []);

  const carregarContatosRelacionados = useCallback(async () => {
    setLoading(true);
    if (localizar) {
      await api.get(`/contatos/basic/?search=${localizar}`).then((response) => {
        setBuscaContato(response.data);
        // console.log(response.data);
      });
    } else {
      setBuscaContato([]);
    }

    setLoading(false);
  }, [localizar]);

  useMemo(() => {
    const contatosw = contatosv
      .sort((a: any, b: any) => (a.nome_razao > b.nome_razao ? 1 : -1))
      .map((contato: any) => {
        const options = {
          value: `${contato.id}`,
          label: `${contato.nome_razao}`,
        };
        return options;
      });
    setContatosFormat(contatosw);
  }, [contatosv]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const localizarAgora = (e: React.FormEvent<HTMLInputElement>) => {
    setLocalizar(e.currentTarget.value);
  };

  const ativarMenu = useCallback(
    (rotaAtualizar: string, idUser: number) => {
      updateUrlPerfil(rotaAtualizar);
      history.push(`/dashboard/perfil/${rotaAtualizar}/?idUser=${idUser}`);
    },
    [history, updateUrlPerfil],
  );

  useEffect(() => {
    carregarContatos();
    carregarContatosRelacionados();
  }, [carregarContatos, carregarContatosRelacionados]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <>
        <div style={{ position: 'relative' }}>
          <Form ref={formRef} onSubmit={() => {}}>
            <h1>Adicionar contato relacionado</h1>
            <Input
              name="email"
              icon={FiSearch}
              type="text"
              value={localizar}
              placeholder="Localizar.."
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                localizarAgora(e);
              }}
            />

            {/* <Select
              name="idreferencia"
              icon={FaUserTag}
              placeholder="Selecione um contato"
              options={contatosFormat}
            /> */}

            {/* <Button type="submit"> Adicionar </Button> */}
          </Form>
          {loading ? (
            <>
              {/* <strong>Carregando...</strong> */}
              <TopoListarRelacionados>
                <SkeletonTheme color="#999591" highlightColor="#444">
                  <LoadContatos>
                    <div>
                      <Skeleton circle height={40} width={40} />
                      <strong>
                        <Skeleton width={200} />
                      </strong>
                    </div>
                  </LoadContatos>
                </SkeletonTheme>
              </TopoListarRelacionados>
            </>
          ) : (
            <>
              <TopoListarRelacionados>
                {buscaContato &&
                  buscaContato.map((contato: any) => (
                    <ListarRelacionados key={contato.id}>
                      <div>
                        <img
                          src={contato.avatar_url}
                          alt={contato.nome_razao}
                        />

                        <strong>
                          {contato.apelido_fantasia}
                          <span>{contato.nome_razao}</span>
                        </strong>

                        <span>
                          <Link
                            style={{
                              textDecoration: 'none',
                            }}
                            to={{
                              pathname: `/dashboard/perfil/`,
                              search: `idUser=${contato.id}`,
                            }}
                            onClick={() => ativarMenu('perfil', contato.id)}
                          >
                            {' '}
                            <FiEdit onClick={() => {}} />
                          </Link>
                          <FiPlus
                            onClick={() => {
                              handleAddRelacionado(contato.id);
                            }}
                          />
                        </span>
                      </div>
                    </ListarRelacionados>
                  ))}
              </TopoListarRelacionados>
            </>
          )}
        </div>
      </>
    </Modal>
  );
};

export default ModalAddFood;
