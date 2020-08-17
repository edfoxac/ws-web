/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiEdit,
  FiMapPin,
  FiCalendar,
  FiEdit3,
} from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FaUserTag, FaToggleOn, FaVenusMars } from 'react-icons/fa';
import { AiOutlineNumber } from 'react-icons/ai';
import axios from 'axios';

import { addHours, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import CheckboxInput from '../../../components/Checkbox';
import InputMask from '../../../components/InputMask';
import InputDate from '../../../components/InputDate';
import InputText from '../../../components/InputText';
import Button from '../../../components/Button';
import ButtonExcluir from '../../../components/ButtonExcluir';
import { sexoOptions, statusOptions, tipoOptions } from './data.js';
import {
  Container,
  Content,
  FormLayout,
  FormLayoutButton,
  FormGrpup,
  FormSpace,
  FormTitle,
  FormGrpupButton,
} from './styles';
import SkeletonPerfil from './skeleton';
import { useAuth } from '../../../hooks/auth';

import 'react-day-picker/lib/style.css';

interface ProfileFormdata {
  name: string;
  apelido: string;
  sexo: string;
  status: number;
  tipo_pessoa: string;
  data_nascimento: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
  celular: string;
  cpf_cnpj: string;
  rg_ie: string;
  end_endereco: string;
  end_numero: string;
  end_bairro: string;
  end_cidade: string;
  end_estado: string;
  end_cep: string;
  end_complemento: string;
  tipo_fornecedor: string;
  tipo_equipe: string;
  tipo_veiculo: string;
  tipo_cliente: string;
  obs: string;
  cargo_id: number;
  cargo?: {
    nome?: string;
    level?: string;
    id?: string;
  };
}
interface IDadosProfileFormdata {
  nome_razao: string;
  email: string;
  celular: string;
  sexo: Record<string, unknown>;
  tipo_pessoa: Record<string, unknown>;
  data_nascimento: string;
  status: Record<string, unknown>;
  cpf_cnpj: string;
  rg_ie: string;
  apelido_fantasia: string;
  avatar_url: string;
  end_endereco: string;
  end_numero: string;
  end_bairro: string;
  end_cidade: string;
  end_estado: string;
  end_cep: string;
  end_complemento: string;
  tipo_fornecedor: string;
  tipo_equipe: string;
  tipo_veiculo: string;
  tipo_cliente: string;
  obs: string;
  cargo_id: {
    nome?: string;
    level?: string;
    id?: string;
  };
}

const ProfilePerfil: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idUser = queryParams.get('idUser');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>('2020-01-01');
  const history = useHistory();
  const [dadosProfile, setDadosProfile] = useState<IDadosProfileFormdata>();

  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cepAtual, setCepAtual] = useState('');

  const [cargoId, setCargoId] = useState('');
  const [cargoLabel, setCargoLabel] = useState('');

  const [equipe, setEquipe] = useState<boolean>();
  const [equipevalor, setEquipevalor] = useState('');

  const [fornecedor, setFornecedor] = useState<boolean>();
  const [fornecedorvalor, setFornecedorvalor] = useState('');

  const [cliente, setCliente] = useState<boolean>();
  const [clientevalor, setClientevalor] = useState('');

  const [veiculo, setVeiculo] = useState<boolean>();
  const [veiculovalor, setVeiculovalor] = useState('');
  const [sexoTexto, setSexotexto] = useState('');
  const [statusTexto, setStatustexto] = useState('');
  const [tipoTexto, setTipotexto] = useState('');
  const [obs, setObs] = useState('');

  const [cargosv, setCargos] = useState([]);
  const [cargosFormat, setCargosFormat] = useState<any>();

  const { updateUser, user } = useAuth();
  const { addToast } = useToast();

  const carregarCep = useCallback(
    async (cepValor: string) => {
      const localizarCep = cepValor.replace('.', '');

      if (cepValor) {
        await axios
          .get(`https://viacep.com.br/ws/${localizarCep}/json/`)
          .then((response) => {
            setEndereco(response.data.logradouro);
            setBairro(response.data.bairro);
            setCidade(response.data.localidade);
            setEstado(response.data.uf);
            setCepAtual(response.data.cep);
            // console.log(response.data);
          });
      } else {
        setEndereco('');
        setBairro('');
        setCidade('');
        setEstado('');
      }
    },
    [setCepAtual],
  );
  const verificarEamil = useCallback(
    async (email: string, idContato: number) => {
      // if (email) {
      //   await axios
      //     .get(`contatos?id_contato=${idContato}&email=${email}`)
      //     .then((response) => {
      //       console.log('aqui 1');
      //     });
      // } else {
      //   console.log('aqui 2');
      // }
    },
    [],
  );

  const carregarProfile = useCallback(async () => {
    setLoading(true);
    await api.get(`profile/${idUser}`).then((responseProfile) => {
      setDadosProfile(responseProfile.data);
      setCepAtual(responseProfile.data.end_cep);
      setFornecedor(responseProfile.data.tipo_fornecedor);
      setEndereco(responseProfile.data.end_endereco);
      setBairro(responseProfile.data.end_bairro);
      setCidade(responseProfile.data.end_cidade);
      setEstado(responseProfile.data.end_estado);
      setObs(responseProfile.data.obs);

      if (responseProfile.data.data_nascimento) {
        const parsedDate2 = format(
          new Date(responseProfile.data.data_nascimento),
          'yyyy-MM-dd',
        );
        setSelectedDate(parsedDate2);
      } else {
        setSelectedDate('2020-01-01');
      }

      if (responseProfile.data.cargo) {
        setCargoId(responseProfile.data.cargo.id);
        setCargoLabel(responseProfile.data.cargo.nome);
      } else {
        setCargoId('-1');
        setCargoLabel('Sem cargo');
      }
      if (responseProfile.data.sexo === 'masculino') {
        setSexotexto('Masculino');
      }
      if (responseProfile.data.sexo === 'feminino') {
        setSexotexto('Feminino');
      }
      if (responseProfile.data.cep) {
        setCepAtual(responseProfile.data.cep);
      }
      if (responseProfile.data.status === 1) {
        setStatustexto('Ativo');
      }
      if (responseProfile.data.status === 0) {
        setStatustexto('Inativo');
      }
      if (responseProfile.data.tipo_pessoa === 'fisica') {
        setTipotexto('Física');
      }
      if (responseProfile.data.tipo_pessoa === 'juridica') {
        setTipotexto('Jurídica');
      }
      if (responseProfile.data.tipo_equipe === 'equipe') {
        setEquipe(true);
        setEquipevalor('equipe');
      }
      if (responseProfile.data.tipo_equipe !== 'equipe') {
        setEquipe(false);
        setEquipevalor('0');
      }
      if (responseProfile.data.tipo_cliente === 'cliente') {
        setCliente(true);
        setClientevalor('cliente');
      }
      if (responseProfile.data.tipo_cliente !== 'cliente') {
        setCliente(false);
        setClientevalor('0');
      }
      if (responseProfile.data.tipo_veiculo === 'veiculo') {
        setVeiculo(true);
        setVeiculovalor('veiculo');
      }
      if (responseProfile.data.tipo_veiculo !== 'veiculo') {
        setVeiculo(false);
        setVeiculovalor('0');
      }
      if (responseProfile.data.tipo_fornecedor === 'fornecedor') {
        setFornecedor(true);
        setFornecedorvalor('fornecedor');
      }
      if (responseProfile.data.tipo_fornecedor !== 'fornecedor') {
        setFornecedor(false);
        setFornecedorvalor('0');
      }
    });
    setLoading(false);
  }, [idUser]);

  const toggleCheckbox = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setEquipe(true);
      setEquipevalor('equipe');
    } else {
      setEquipe(false);
      setEquipevalor('0');
    }
  }, []);
  const toggleCheckboxCliente = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        setCliente(true);
        setClientevalor('cliente');
      } else {
        setCliente(false);
        setClientevalor('0');
      }
    },
    [],
  );
  const toggleCheckboxFornecedor = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        setFornecedor(true);
        setFornecedorvalor('fornecedor');
      } else {
        setFornecedor(false);
        setFornecedorvalor('0');
      }
      // console.log(e.currentTarget.checked);
    },
    [],
  );
  const toggleCheckboxVeiculo = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        setVeiculo(true);
        setVeiculovalor('veiculo');
      } else {
        setVeiculo(false);
        setVeiculovalor('0');
      }
      // console.log(e.currentTarget.checked);
    },
    [],
  );

  const carregarCargos = useCallback(async () => {
    await api.get(`cargos`).then((response) => {
      setCargos(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async (dataForm: ProfileFormdata) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
          sexo: Yup.string().required('Sexo obrigatório'),
        });

        await schema.validate(dataForm, {
          abortEarly: false,
        });

        const {
          name,
          apelido,
          email,
          old_password,
          password,
          celular,
          cpf_cnpj,
          rg_ie,
          sexo,
          status,
          tipo_pessoa,
          end_endereco,
          end_numero,
          end_bairro,
          end_cidade,
          end_estado,
          end_cep,
          end_complemento,
          tipo_fornecedor,
          tipo_equipe,
          tipo_cliente,
          tipo_veiculo,
          cargo_id,
        } = dataForm;

        const znDate = zonedTimeToUtc(selectedDate, 'America/Sao_Paulo');
        const addedDate = addHours(znDate, 24);
        const parsedDate1 = format(new Date(addedDate), 'yyyy-MM-dd');
        // console.log(parsedDate1);
        const formData = {
          nome_razao: name,
          apelido_fantasia: apelido,
          sexo,
          status,
          tipo_pessoa,
          email,
          celular,
          cpf_cnpj,
          rg_ie,
          tipo_fornecedor,
          tipo_equipe,
          tipo_cliente,
          tipo_veiculo,
          obs: `${obs}`,
          cargo_id,
          data: parsedDate1,
          ...(old_password
            ? {
                old_senha: old_password,
                senha: password,
              }
            : {}),
          ...(end_endereco ? { end_endereco } : {}),
          ...(end_bairro ? { end_bairro } : {}),
          ...(end_cidade ? { end_cidade } : {}),
          ...(end_estado ? { end_estado } : {}),
          ...(end_numero ? { end_numero } : {}),
          ...(end_cep ? { end_cep } : {}),
          ...(end_complemento ? { end_complemento } : {}),
        };

        const response = await api.put(`/contatos/${idUser}`, formData);
        setDadosProfile(response.data);
        if (response.data.sexo === 'masculino') {
          setSexotexto('Masculino');
        }
        if (response.data.sexo === 'feminino') {
          setSexotexto('Feminino');
        }
        if (response.data.status === '1') {
          setStatustexto('Ativo');
        }
        if (response.data.status === '0') {
          setStatustexto('Inativo');
        }

        if (response.data.tipo_pessoa === 'fisica') {
          setTipotexto('Física');
        }
        if (response.data.tipo_pessoa === 'juridica') {
          setTipotexto('Jurídica');
        }

        if (Number(idUser) === Number(user.id)) {
          updateUser(response.data);
        }

        // history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Prefil atualizado',
          description:
            'Suas informações do perfil foram atualizado com sucesso!',
        });
        // setTimeout(() => {
        //   // window.location.reload(false);
        // }, 1500);
        carregarProfile();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente!.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, updateUser, carregarProfile, idUser, user.id, selectedDate, obs],
  );

  useEffect(() => {
    carregarProfile();
    carregarCargos();
  }, [carregarProfile, carregarCargos]);

  useMemo(() => {
    const cargosw = cargosv
      .sort((a: any, b: any) => (a.nome > b.nome ? 1 : -1))
      .map((cargo: any) => {
        const options = { value: `${cargo.id}`, label: `${cargo.nome}` };
        return options;
      });
    setCargosFormat(cargosw);
  }, [cargosv]);

  const handleNameChange = useCallback((name: any) => {
    setSelectedDate(name);
    // console.log(name);
  }, []);

  const handleObsChange = useCallback((texto: string) => {
    setObs(texto);
  }, []);

  const handleExcluir = useCallback(() => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: 'Tem certeza que deseja excluir o contato?',
      text: 'Este procedimento não é reversível!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar!',
    }).then(async (result) => {
      if (result.value) {
        await api.delete(`contatos/${idUser}`).then(() => {
          Swal.fire('Excluído!', 'O contato foi removido!', 'success');
          history.push('/dashboard/contatos');
        });
      }
    });
  }, [idUser, history]);

  return (
    <>
      <Container>
        <Content>
          <Form
            initialData={{
              name: dadosProfile?.nome_razao,
              email: dadosProfile?.email,
              celular: dadosProfile?.celular,
              sexo: {
                value: `${dadosProfile?.sexo}`,
                label: `${sexoTexto}`,
              },
              tipo_pessoa: {
                value: `${dadosProfile?.tipo_pessoa}`,
                label: `${tipoTexto}`,
              },
              data_nascimento: selectedDate,
              status: {
                value: `${dadosProfile?.status}`,
                label: `${statusTexto}`,
              },
              cpf_cnpj: dadosProfile?.cpf_cnpj,
              rg_ie: dadosProfile?.rg_ie,
              apelido: dadosProfile?.apelido_fantasia,
              end_endereco: endereco,
              end_numero: dadosProfile?.end_numero,
              end_bairro: bairro,
              end_cidade: cidade,
              end_estado: estado,
              end_complemento: dadosProfile?.end_complemento,
              end_cep: cepAtual,
              tipo_equipe: equipevalor,
              tipo_veiculo: veiculovalor,
              tipo_fornecedor: fornecedorvalor,
              tipo_cliente: clientevalor,
              obs: `${obs}`,
              cargo_id: {
                value: `${cargoId}`,
                label: `${cargoLabel}`,
              },
              level: {
                value: `1`,
                label: `Colaborador`,
              },
            }}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            {loading ? (
              <SkeletonPerfil />
            ) : (
              <>
                <FormTitle>Informações</FormTitle>
                <FormLayout>
                  <FormGrpup>
                    <Input
                      name="name"
                      icon={FiUser}
                      type="text"
                      placeholder="Nome completo"
                    />
                  </FormGrpup>
                  <FormGrpup>
                    <Input
                      name="apelido"
                      icon={FiUser}
                      type="text"
                      placeholder="Apelido"
                    />
                  </FormGrpup>
                  <FormGrpup>
                    <Input
                      name="email"
                      icon={FiMail}
                      type="email"
                      placeholder="Email"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        verificarEamil(e.currentTarget.value, Number(idUser));
                        // console.log(e.currentTarget.value);
                      }}
                    />
                  </FormGrpup>
                </FormLayout>

                <FormLayout>
                  <FormGrpup>
                    <InputMask
                      mask="999.999.999-99"
                      name="cpf_cnpj"
                      icon={FiEdit}
                      type="text"
                      placeholder="CPF"
                    />
                  </FormGrpup>
                  <FormGrpup>
                    <InputMask
                      mask="aa 99.999.999"
                      name="rg_ie"
                      icon={FiEdit}
                      type="text"
                      placeholder="RG"
                    />
                  </FormGrpup>
                  <FormGrpup>
                    <InputMask
                      mask="(99) 99999-9999"
                      name="celular"
                      icon={FiPhone}
                      type="text"
                      placeholder="Celular"
                    />
                  </FormGrpup>
                </FormLayout>

                <FormLayout>
                  <FormGrpup style={{ maxWidth: 210 }}>
                    <InputDate
                      name="data_nascimento"
                      icon={FiCalendar}
                      placeholder="Data nascimento"
                      onNameChange={handleNameChange}
                      dataAtual={selectedDate}
                      // dataAtual="1981-02-22"
                      // type="date"
                      // onChange={() => {}}
                      // onSelect={(e: Date) => {
                      // setCurrentDate(e);
                      // console.log(e);
                      // }}
                    />
                  </FormGrpup>
                  <FormGrpup>
                    <Select
                      name="sexo"
                      icon={FaVenusMars}
                      placeholder="Sexo"
                      options={sexoOptions}
                    />
                  </FormGrpup>
                  <FormGrpup>
                    <Select
                      name="status"
                      icon={FaToggleOn}
                      placeholder="Status"
                      options={statusOptions}
                    />
                  </FormGrpup>
                  <FormGrpup>
                    <Select
                      name="tipo_pessoa"
                      icon={FaUserTag}
                      placeholder="Tipo pessoa"
                      options={tipoOptions}
                    />
                  </FormGrpup>
                </FormLayout>

                <FormSpace />
                <FormTitle>Endereço</FormTitle>
                <FormLayout>
                  <FormGrpup style={{ maxWidth: 250 }}>
                    <InputMask
                      mask="99999-999"
                      icon={FiMapPin}
                      name="end_cep"
                      type="text"
                      placeholder="CEP"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        carregarCep(e.currentTarget.value);
                      }}
                    />
                  </FormGrpup>
                  <FormGrpup>
                    <Input
                      disabled
                      name="end_endereco"
                      icon={FiMapPin}
                      type="text"
                      value={endereco}
                      placeholder="Endereço"
                    />
                  </FormGrpup>
                </FormLayout>

                <FormLayout>
                  <FormGrpup style={{ maxWidth: 120 }}>
                    <Input
                      icon={AiOutlineNumber}
                      name="end_numero"
                      type="text"
                      placeholder="Número"
                    />
                  </FormGrpup>
                  <FormGrpup style={{ maxWidth: 200 }}>
                    <Input
                      icon={FiMapPin}
                      name="end_complemento"
                      type="text"
                      placeholder="Complemento"
                    />
                  </FormGrpup>
                  <FormGrpup style={{ maxWidth: 120 }}>
                    <Input
                      disabled
                      icon={FiMapPin}
                      name="end_estado"
                      value={estado}
                      type="text"
                      placeholder="Estado"
                    />
                  </FormGrpup>
                  <FormGrpup style={{ maxWidth: 245 }}>
                    <Input
                      disabled
                      name="end_cidade"
                      icon={FiMapPin}
                      value={cidade}
                      type="text"
                      placeholder="Cidade"
                    />
                  </FormGrpup>
                  <FormGrpup style={{ maxWidth: 245 }}>
                    <Input
                      disabled
                      name="end_bairro"
                      icon={FiMapPin}
                      value={bairro}
                      type="text"
                      placeholder="Bairro"
                    />
                  </FormGrpup>
                </FormLayout>

                <FormSpace />
                <FormTitle>Senha</FormTitle>

                <FormLayout>
                  <FormGrpup style={{ maxWidth: '100%' }}>
                    <Input
                      name="old_password"
                      icon={FiLock}
                      type="password"
                      placeholder="Senha atual"
                    />
                  </FormGrpup>
                  <FormGrpup style={{ maxWidth: 210 }}>
                    <Input
                      name="password"
                      icon={FiLock}
                      type="password"
                      placeholder="Nova senha"
                    />
                  </FormGrpup>
                  <FormGrpup style={{ maxWidth: 210 }}>
                    <Input
                      name="password_confirmation"
                      icon={FiLock}
                      type="password"
                      placeholder="Confirmar senha"
                    />
                  </FormGrpup>
                  {equipe ? (
                    <>
                      <FormGrpup>
                        <Select
                          name="cargo_id"
                          icon={FaUserTag}
                          placeholder="Cargo na agência"
                          options={cargosFormat}
                        />
                      </FormGrpup>
                    </>
                  ) : (
                    <></>
                  )}
                </FormLayout>

                <FormSpace />
                <FormTitle>Tipos</FormTitle>
                <FormLayout>
                  <FormGrpup style={{ maxWidth: 210 }}>
                    <CheckboxInput
                      name="tipo_cliente"
                      icon={FaUserTag}
                      type="checkbox"
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        toggleCheckboxCliente(e);
                      }}
                      checked={cliente}
                      placeholder="Cliente"
                    />
                  </FormGrpup>

                  <FormGrpup style={{ maxWidth: 210 }}>
                    <CheckboxInput
                      name="tipo_fornecedor"
                      icon={FaUserTag}
                      type="checkbox"
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        toggleCheckboxFornecedor(e);
                      }}
                      checked={fornecedor}
                      placeholder="Fornecedor"
                    />
                  </FormGrpup>

                  <FormGrpup style={{ maxWidth: 210 }}>
                    <CheckboxInput
                      name="tipo_veiculo"
                      icon={FaUserTag}
                      type="checkbox"
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        toggleCheckboxVeiculo(e);
                      }}
                      checked={veiculo}
                      placeholder="Veículo"
                    />
                  </FormGrpup>

                  <FormGrpup style={{ maxWidth: 210 }}>
                    <label>
                      <CheckboxInput
                        name="tipo_equipe"
                        icon={FaUserTag}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          toggleCheckbox(e);
                        }}
                        checked={equipe}
                        type="checkbox"
                        placeholder="Equipe"
                      />
                    </label>
                  </FormGrpup>
                </FormLayout>

                <FormSpace />
                <FormTitle>Observações</FormTitle>
                <FormLayout>
                  <FormGrpup>
                    <InputText
                      name="obs"
                      onObsChange={handleObsChange}
                      icon={FiEdit3}
                      type="text"
                      placeholder="Observações do contato"
                    />
                  </FormGrpup>
                </FormLayout>

                <FormSpace />
                <FormLayoutButton>
                  <FormGrpupButton>
                    <Button
                      style={{ height: 40, color: '#f7ede8' }}
                      type="submit"
                    >
                      {' '}
                      Atualizar
                    </Button>
                  </FormGrpupButton>
                  <FormGrpupButton style={{ marginLeft: 15 }}>
                    <ButtonExcluir
                      style={{ height: 40, color: '#f7ede8' }}
                      type="button"
                      onClick={handleExcluir}
                    >
                      {' '}
                      Excluir
                    </ButtonExcluir>
                  </FormGrpupButton>
                </FormLayoutButton>
              </>
            )}
          </Form>
        </Content>
      </Container>
    </>
  );
};
export default ProfilePerfil;
