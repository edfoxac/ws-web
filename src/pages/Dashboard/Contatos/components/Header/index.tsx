import React from 'react';

import { FiPlusSquare } from 'react-icons/fi';
// import { FaCartPlus } from 'react-icons/fa';
import { Container } from './styles';
// import Logo from '../../assets/logo.svg';

interface IHeaderProps {
  openModal: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => (
  <Container>
    <header>
      {/* <div className="text">
            <FaCartPlus size={24} />
            Produtos
         </div> */}

      <nav>
        <div>
          <button
            type="button"
            onClick={() => {
              /* TODO OPEN MODAL */
              openModal();
            }}
          >
            <div className="text">Novo contato</div>
            <div className="icon">
              <FiPlusSquare size={24} />
            </div>
          </button>
        </div>
      </nav>
    </header>
  </Container>
);

export default Header;
