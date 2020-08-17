/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Switch, Route } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import ProfilePerfil from './Perfil';
import Pits from './Pits';
import Arquivos from './Arquivos';
import Financeiro from './Financeiro';
import Relacionados from './Relacionados';
import api from '../../services/api';
import {
  AvatarInputTopo,
  AvatarInput,
  Grid,
  SubMenu,
  Headers,
  Header,
  DadosPerfilTopo,
  SubMenuBotao,
} from './styles';
import { useMenu } from '../../hooks/menu';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface IDadosProfileFormdata {
  nome_razao: string;
  email: string;
  apelido_fantasia: string;
  avatar_url: string;
}

const Profile: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  // console.log('assuming query param is id', queryParams.get('idUser'));
  const [loading, setLoading] = useState(false);
  const idUser = queryParams.get('idUser');
  const { urlPerfil, updateUrlPerfil } = useMenu();
  const [dadosProfile, setDadosProfile] = useState<IDadosProfileFormdata>();
  const { updateUser, user } = useAuth();
  const { addToast } = useToast();
  //
  //
  const carregarProfile = useCallback(async () => {
    setLoading(true);
    await api.get(`profile/${idUser}`).then((responseProfile) => {
      setDadosProfile(responseProfile.data);
    });
    setLoading(false);
  }, [idUser]);

  useEffect(() => {
    carregarProfile();
    // console.log(idUser);
  }, [carregarProfile]);

  const ativarMenu = useCallback(
    (rotaAtualizar: string) => {
      updateUrlPerfil(rotaAtualizar);
      history.push(`/dashboard/perfil/${rotaAtualizar}/?idUser=${idUser}`);
    },
    [history, idUser, updateUrlPerfil],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch(`/contatos/avatar/${idUser}`, data).then((response) => {
          if (Number(idUser) === Number(user.id)) {
            updateUser(response.data);
          }
          // setDadosProfile(response.data);
          // console.log(idUser, user.id);
          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 1500);

          // history.push(`/dashboard/perfil/?idUser=${response.data.id}`);
        });

        // console.log(e.target.files[0]);
      }
    },
    [addToast, idUser, updateUser, user.id],
  );

  return (
    <div style={{ gridArea: 'CD' }}>
      <Grid>
        <Headers>
          <Header>
            <header>
              {loading ? (
                <>
                  <AvatarInputTopo>
                    <SkeletonTheme color="#999591" highlightColor="#444">
                      <Skeleton circle height={89} width={89} />
                    </SkeletonTheme>
                  </AvatarInputTopo>
                  <DadosPerfilTopo>
                    <SkeletonTheme color="#999591" highlightColor="#444">
                      <Skeleton height={30} width={186} />
                    </SkeletonTheme>
                  </DadosPerfilTopo>
                </>
              ) : (
                <>
                  {/* <AvatarInputTopo>
                    <img
                      src={dadosProfile?.avatar_url}
                      alt={dadosProfile?.avatar_url}
                    />
                  </AvatarInputTopo> */}
                  <AvatarInput>
                    <img
                      src={dadosProfile?.avatar_url}
                      alt={dadosProfile?.avatar_url}
                    />
                    <label htmlFor="avatar">
                      <FiCamera />
                      <input
                        type="file"
                        id="avatar"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </AvatarInput>
                  <DadosPerfilTopo>
                    <div>{dadosProfile?.apelido_fantasia}</div>
                    <div>{dadosProfile?.nome_razao}</div>
                  </DadosPerfilTopo>
                </>
              )}
            </header>
          </Header>
          <SubMenu>
            <nav>
              <div>
                <SubMenuBotao active={urlPerfil === 'perfil' ? 'active' : ''}>
                  <button type="button" onClick={() => ativarMenu('perfil')}>
                    <div className="iconCenter">Perfil</div>
                  </button>
                </SubMenuBotao>
                <SubMenuBotao active={urlPerfil === 'pits' ? 'active' : ''}>
                  <button type="button" onClick={() => ativarMenu('pits')}>
                    <div className="iconCenter">Pits</div>
                  </button>
                </SubMenuBotao>
                <SubMenuBotao active={urlPerfil === 'arquivos' ? 'active' : ''}>
                  <button type="button" onClick={() => ativarMenu('arquivos')}>
                    <div className="iconCenter">Arquivos</div>
                  </button>
                </SubMenuBotao>
                <SubMenuBotao
                  active={urlPerfil === 'financeiro' ? 'active' : ''}
                >
                  <button
                    type="button"
                    onClick={() => ativarMenu('financeiro')}
                  >
                    <div className="iconCenter">Financeiro</div>
                  </button>
                </SubMenuBotao>
                <SubMenuBotao
                  active={urlPerfil === 'relacionados' ? 'active' : ''}
                >
                  <button
                    type="button"
                    onClick={() => ativarMenu('relacionados')}
                  >
                    <div className="iconCenter">Relacionados</div>
                  </button>
                </SubMenuBotao>
              </div>
            </nav>
          </SubMenu>
        </Headers>
        <Switch>
          <Route path="/dashboard/perfil" exact component={ProfilePerfil} />
          <Route
            path="/dashboard/perfil/perfil"
            exact
            component={ProfilePerfil}
          />
          <Route path="/dashboard/perfil/pits" exact component={Pits} />
          <Route path="/dashboard/perfil/arquivos" exact component={Arquivos} />
          <Route
            path="/dashboard/perfil/financeiro"
            exact
            component={Financeiro}
          />
          <Route
            path="/dashboard/perfil/relacionados"
            exact
            component={Relacionados}
          />
        </Switch>
      </Grid>
    </div>
  );
};

export default Profile;
