import React, { useState, useCallback } from 'react';

import { FiTrash, FiEdit } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import { Container } from './styles';
import { useMenu } from '../../../../../hooks/menu';
// import api from '../../../../../services/api';

interface IRelacionadoTYPES {
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

interface IProps {
  relacionado: IRelacionadoTYPES;
  idContato: number;
  handleDelete: (id: number) => void;
}

const Relacionados: React.FC<IProps> = ({
  relacionado,
  idContato,
  handleDelete,
}: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAvailable, setIsAvailable] = useState(true);
  const history = useHistory();
  const { updateUrl, updateUrlPerfil } = useMenu();

  const ativarMenu = useCallback(
    (rotaAtualizar: string, idUser?: number) => {
      updateUrl(rotaAtualizar);
      if (idUser) {
        updateUrlPerfil(rotaAtualizar);
        history.push(`/dashboard/${rotaAtualizar}/?idUser=${idUser}`);
      } else {
        history.push(`/dashboard/${rotaAtualizar}`);
      }
    },
    [history, updateUrl, updateUrlPerfil],
  );

  return (
    <Container available={isAvailable}>
      <section className="body">
        <div className="headerDiv">
          <img
            src={relacionado.referencia.avatar_url}
            alt={relacionado.referencia.nome_razao}
          />
          <div className="icon-container">
            <div className="icons">
              <button
                type="button"
                className="icon"
                onClick={() => handleDelete(Number(relacionado.id_referencia))}
                data-testid={`remove-food-${relacionado.id}`}
              >
                <FiTrash size={14} />
              </button>
              <button
                type="button"
                className="icon"
                onClick={() =>
                  ativarMenu('perfil', Number(relacionado.id_referencia))
                }
                data-testid={`remove-food-${relacionado.id_referencia}`}
              >
                <FiEdit size={14} />
              </button>
            </div>
          </div>
        </div>

        <h2>{relacionado.referencia.apelido_fantasia}</h2>
        {relacionado.referencia.nome_razao ? (
          <p>{relacionado.referencia.nome_razao}</p>
        ) : (
          <></>
        )}
        {relacionado.referencia.celular ? (
          <p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{relacionado.referencia.celular}</span>
            </div>
          </p>
        ) : (
          <></>
        )}

        {relacionado.referencia.email ? (
          <p>{relacionado.referencia.email}</p>
        ) : (
          <></>
        )}
      </section>
    </Container>
  );
};

export default Relacionados;
