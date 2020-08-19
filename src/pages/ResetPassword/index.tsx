import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import logoImg from '../../assets/wslogo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('password obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
          // addToast({
          //    type: 'error',
          //    title: 'Token inválido!',
          //    description:
          //       'Ocorreu um erro ao resetar sua password, tente novamente.',
          // });
          // return;
        }

        await api.post('password/reset', {
          senha: password,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar password!',
          description:
            'Ocorreu um erro ao resetar sua password, tente novamente.',
        });
        // Disparar o toast
      }

      // console.log(data);
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar password</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova password"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da password"
            />
            <Button type="submit"> Alterar password </Button>
          </Form>
        </AnimationContainer>
      </Content>
      {/* <Background /> */}
    </Container>
  );
};

export default ResetPassword;
