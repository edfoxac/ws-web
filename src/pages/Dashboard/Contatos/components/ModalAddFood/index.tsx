/* eslint-disable react/prop-types */
import React, { useRef, useCallback } from 'react';

// import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form } from './styles';
import api from '../../../../../services/api';
import Modal from '../Modal';
// import Input from '../Input';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import { useToast } from '../../../../../hooks/toast';
import getValidationErrors from '../../../../../utils/getValidationErrors';

interface IFoodPlate {
  id: number;
  nome_razao: string;
  avatar_url: string;
  // price: string;
  description: string;
  status: boolean;
}

interface SignUpFormdata {
  name: string;
  email: string;
  password: string;
}

interface ICreateFoodData {
  nome_razao: string;
  avatar_url: string;
  // price: string;
  status: boolean;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IFoodPlate, 'id' | 'available'>) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  // handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormdata) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password } = data;

        const formData = {
          nome_razao: name,
          senha: password,
          email,
        };
        const response = await api.post('/contatos', formData);
        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon WS AGENCY!',
        });

        // console.log(response.data.id);
        history.push(`/dashboard/perfil/?idUser=${response.data.id}`);

        setTimeout(() => {
          // window.location.reload(false);
        }, 500);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, Tente novamente!.',
        });
      }

      // console.log(data);
    },
    [addToast, history],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Adicionar</h1>
        <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
        <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="password"
        />
        <Button type="submit"> Cadastrar </Button>
      </Form>

      {/* <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo contato</h1>
        <Input name="nome_razao" placeholder="Nome completo" />

        <Input name="apelido_fantasia" placeholder="Apelido" />

        <Input name="email" placeholder="E-mail" />

        <Input name="senha" placeholder="Senha" />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form> */}
    </Modal>
  );
};

export default ModalAddFood;
