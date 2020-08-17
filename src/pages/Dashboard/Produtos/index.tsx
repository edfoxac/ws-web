import React, { useState, useEffect } from 'react';

import Food from './components/Food';
import ModalAddFood from './components/ModalAddFood';
import ModalEditFood from './components/ModalEditFood';
import Header from './components/Header';
import api from '../../../services/api';

import { FoodsContainer, Container } from './styles';

export interface UsuariosTYPES {
  id: string;
  nome_razao: string;
  avatar_url: string;
}
interface IFoodPlate {
  id: number;
  nome_razao: string;
  avatar_url: string;
  // price: string;
  description: string;
  status: boolean;
}

const Produtos: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    api.get(`/contatos?limit=10&skip=0`).then((response) => {
      setFoods(response.data);
    });
  }, []);

  // const [usuarios, setUsuarios] = useState<UsuariosTYPES[]>([]);
  // const [loading, setLoading] = useState(false);

  // const carregarUsuarios = useCallback(async () => {
  //    setLoading(true);
  //    const res = await api.get('providers').then((res) => {
  //       setUsuarios(
  //          res.data.sort(
  //             (b: UsuariosTYPES, a: UsuariosTYPES) => a.nome_razao < b.nome_razao,
  //          ),
  //       );
  //    });
  //    console.log(res);
  //    setLoading(false);
  // }, []);

  // useEffect(() => {
  //    // async function loadFoods(): Promise<void> {
  //    //    // TODO LOAD FOODS
  //    //    // await api.get('foods').then((response) => setFoods(response.data));
  //    // }
  //    // carregarUsuarios();
  //    // loadFoods();
  // }, []);

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'status'>,
  ): Promise<void> {
    try {
      // TODO ADD A NEW FOOD PLATE TO THE API
      const id = foods.length + 1;
      const updatedFood = { id, ...food, status: true };
      const response = await api.post('foods', updatedFood);
      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'status'>,
  ): Promise<void> {
    // TODO UPDATE A FOOD PLATE ON THE API
    const { id } = editingFood;
    const updatedFood = { id, ...food, status: true };
    const response = await api.put(`/foods/${editingFood.id}`, updatedFood);
    const updatedState = foods.filter((item) => item.id !== id);
    setFoods([...updatedState, response.data]);
  }

  async function handleDeleteFood(id: number): Promise<void> {
    // TODO DELETE A FOOD PLATE FROM THE API
    await api.delete(`/foods/${id}`);

    const updatedState = foods.filter((food) => food.id !== id);

    setFoods(updatedState);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    // TODO SET THE CURRENT EDITING FOOD ID IN THE STATE
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <Container>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </Container>
  );
};

export default Produtos;
