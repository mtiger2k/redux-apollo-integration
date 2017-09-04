import React from 'react';
import SidebarWrapper from '../../../lib/sidebar/SidebarWrapper';

import UserPanel from '../../containers/sidebar/UserPanel';
import SidebarSearch from '../../containers/sidebar/SidebarSearch';
import SidebarMenu from '../../containers/sidebar/SidebarMenu';

export default function Sidebar({user}) {
  return (
    <SidebarWrapper>
      <UserPanel user={user} />
      <SidebarSearch />
      <SidebarMenu user={user} />
    </SidebarWrapper>
  );
}
