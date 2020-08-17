/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

// import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import {
  FiArrowLeft,
  FiArrowRight,
  FiRefreshCcw,
  FiSearch,
  FiPlusSquare,
  FiEdit,
} from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import ModalAddFood from './components/ModalAddFood';
import {
  Container,
  Content,
  Schedule,
  NextAppointment,
  NavBar,
} from './styles';
import SkeletonContatos from './skeleton';
import api from '../../../services/api';
import Input from '../../../components/Input';
import { useMenu } from '../../../hooks/menu';

interface SignInFormData {
  localizar: string;
}
export interface Props {
  selected?: boolean;
}

interface IContatoTYPES {
  id: string;
  nome_razao: string;
  apelido_fantasia: string;
  avatar_url: string;
  description: string;
  status: boolean;
  available: boolean;
  created_at: Date;
  tipo_pessoa: string;
}

const Contatos: React.FC<Props> = () => {
  const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [contatos, setContatos] = useState<IContatoTYPES[]>([]);
  useEffect(() => {
    const div = messagesRef.current;
    // console.log(params.path);
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [messagesRef]);
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [localizar, setLocalizar] = useState('');

  // const [isAvailable, setIsAvailable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // const [users, setUsers] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const previousPage = () => {
    setSkip(skip - limit);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const nextPage = () => {
    setSkip(skip + limit);
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const startPage = () => {
    setSkip(0);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectedWeekDayAsText = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  const carregarContatos = useCallback(async () => {
    setLoading(true);

    // Primeiro parametro é a pagina /10
    // Segundo parametro é a quantidade /10/20

    await api
      .get<IContatoTYPES[]>(
        `contatos?limit=${limit}&skip=${skip}&search=${localizar}`,
      )
      .then((response) => {
        setContatos(response.data);
      });

    setLoading(false);
  }, [limit, skip, localizar]);

  useEffect(() => {
    carregarContatos();
  }, [carregarContatos]);
  const formRef = useRef<FormHandles>(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const localizarAgora = (e: React.FormEvent<HTMLInputElement>) => {
    setLocalizar(e.currentTarget.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { url, updateUrl, updateUrlPerfil } = useMenu();
  const ativarMenu = useCallback(
    (rotaAtualizar: string) => {
      updateUrl(rotaAtualizar);
      updateUrlPerfil('perfil');
      history.push(`/dashboard/${rotaAtualizar}`);
    },
    [history, updateUrl, updateUrlPerfil],
  );

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  return (
    <Container>
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={() => {}}
      />
      <Content>
        <Schedule>
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
            <div>
              <Form ref={formRef} onSubmit={() => {}}>
                <Input
                  name="email"
                  icon={FiSearch}
                  type="text"
                  placeholder="Localizar.."
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    localizarAgora(e);
                  }}
                />
              </Form>
            </div>
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
                    {skip > 10 ? (
                      <>
                        <div
                          className="iconLeft"
                          onClick={() => previousPage()}
                        >
                          <FiArrowLeft size={12} />
                        </div>
                        <div className="iconCenter" onClick={() => startPage()}>
                          <FiRefreshCcw size={12} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="iconLeftInativo">
                          <FiArrowLeft size={12} />
                        </div>
                        <div className="iconCenterInativo">
                          <FiRefreshCcw size={12} />
                        </div>
                      </>
                    )}
                    <div className="iconRight" onClick={() => nextPage()}>
                      <FiArrowRight size={12} />
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          </NavBar>
          <div>
            {loading ? (
              <>
                <SkeletonContatos />
              </>
            ) : (
              <>
                {contatos &&
                  contatos.map((contato) => (
                    <NextAppointment
                      key={contato.id}
                      available={contato.status}
                    >
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
                            onClick={() => ativarMenu('perfil')}
                          >
                            <FiEdit />
                          </Link>
                        </span>
                      </div>
                    </NextAppointment>
                  ))}
              </>
            )}
          </div>
        </Schedule>
      </Content>
    </Container>
  );
};

export default Contatos;
