import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

// eslint-disable-next-line import/no-unresolved
import { Container } from './styles';

interface IFoodPlate {
  id: number;
  nome_razao: string;
  avatar_url: string;
  // price: string;
  description: string;
  status: boolean;
}

interface IProps {
  food: IFoodPlate;
  handleDelete: (id: number) => {};
  handleEditFood: (food: IFoodPlate) => void;
}

const Food: React.FC<IProps> = ({
  food,
  handleDelete,
  handleEditFood,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(food.status);

  async function toggleAvailable(): Promise<void> {
    // TODO UPDATE STATUS (available)
    setIsAvailable(!isAvailable);
  }

  function setEditingFood(): void {
    // TODO - SET THE ID OF THE CURRENT ITEM TO THE EDITING FOOD AND OPEN MODAL
    handleEditFood(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.avatar_url} alt={food.nome_razao} />
      </header>
      <section className="body">
        <h2>{food.nome_razao}</h2>
        <p>{food.nome_razao}</p>
        <p className="price">
          <b>{food.nome_razao}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood()}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>
          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
