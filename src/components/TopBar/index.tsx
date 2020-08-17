import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  MenuIcon,
  LogoutIcon,
  Logo,
  MessagIcon,
  MenuItensDireita,
} from './styles';
import wsLogo from '../../assets/wslogo.png';
import { useMenu } from '../../hooks/menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

const TopBar: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { signOut } = useAuth();
  const { updateUrl, updateUrlPerfil } = useMenu();

  const signOutMenu = useCallback(() => {
    updateUrl('');
    updateUrlPerfil('');
    signOut();
  }, [updateUrl, signOut, updateUrlPerfil]);

  return (
    <Container>
      <div>
        <Link to="/" onClick={() => updateUrl('')}>
          <Logo>
            <img src={wsLogo} alt="WS Agency" />
          </Logo>
        </Link>
      </div>

      <div />

      <MenuItensDireita>
        <MessagIcon />
        <MenuIcon />

        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <LogoutIcon style={{ marginTop: 7 }} onClick={signOutMenu} />
        </Typography>

        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>Sair do sistema</Typography>
        </Popover>
      </MenuItensDireita>
    </Container>
  );
};

export default TopBar;
