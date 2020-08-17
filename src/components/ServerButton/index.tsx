/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from './styles';

export interface Props {
  selected?: boolean;
  isHome?: boolean;
  hasNotifications?: boolean;
  mentions?: number;
  avatarUrl?: string;
}

const ServerButton: React.FC<Props> = ({
  selected,
  isHome,
  hasNotifications,
  mentions,
  avatarUrl,
}) => {
  return (
    <>
      <Button
        isHome={isHome}
        hasNotifications={hasNotifications}
        mentions={mentions}
        className={selected ? 'active' : ''}
      >
        {isHome && <img src={avatarUrl} alt={avatarUrl} />}
      </Button>
    </>
  );
};

export default ServerButton;
