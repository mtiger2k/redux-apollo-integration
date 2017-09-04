import React from 'react';
import { history}  from '../../../routes';

import HeaderWrapper from '../../../lib/header/HeaderWrapper';
import Logo from '../../../lib/header/Logo';
import MiniLogo from '../../../lib/header/MiniLogo';
import LargeLogo from '../../../lib/header/LargeLogo';
import Navbar from '../../../lib/header/Navbar';

import MessagesMenu from '../../containers/header/MessagesMenu';
import NotificationsMenu from '../../containers/header/NotificationsMenu';
import TasksMenu from '../../containers/header/TasksMenu';
import UserMenu from '../../containers/header/UserMenu';

export default function Header({user, loading}) {
  return (
    <HeaderWrapper>
      <Logo onClick={() => history.push('/')}>
        <MiniLogo>
          <b>贷</b>
        </MiniLogo>
        <LargeLogo>
          <b>银保车贷系统</b>
        </LargeLogo>
      </Logo>
      <Navbar>
        {/*<MessagesMenu />*/}
        {/*<NotificationsMenu />*/}
        {/*<TasksMenu />*/}
        <UserMenu user={user} loading={loading} />
      </Navbar>
    </HeaderWrapper>
  );
}
