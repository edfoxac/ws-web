/* eslint-disable react/prop-types */
import React from 'react';
import { IconBaseProps } from 'react-icons';
import { Button } from './styles';

export interface Props {
  selected?: boolean;
  isHome?: boolean;
  hasNotifications?: boolean;
  mentions?: number;
  avatarUrl?: string;
  nameIcon?: string;
  functionAtivarButton?: Function;
  icon?: React.ComponentType<IconBaseProps>;
}
const MenuButton: React.FC<Props> = ({
  selected,
  isHome,
  icon: Icon,
  nameIcon,
  hasNotifications,
  mentions,
}) => {
  return (
    <Button
      isHome={isHome}
      hasNotifications={hasNotifications}
      mentions={mentions}
      className={selected ? 'active' : ''}
    >
      {Icon && <Icon size={18} />} <span>{nameIcon}</span>
    </Button>
  );
};

export default MenuButton;
