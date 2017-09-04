import React from 'react';
import { history } from '../../../routes';
import { connect } from 'react-redux';
import SidebarMenuWrapper from '../../../lib/sidebar/SidebarMenuWrapper';
import SidebarMenuHeader from '../../../lib/sidebar/SidebarMenuHeader';
import TreeMenu from '../../../lib/sidebar/TreeMenu';

import _ from 'lodash';

const privateMainMenus = [
  {
    key: 1,
    id: 1,
    icon: 'fa fa-list',
    title: 'Feature',
    labelColor: 'green',
    url: '/feature',
    allRoles: true
  },
  {
    key: 2,
    id: 2,
    icon: 'fa fa-list',
    title: 'Channel List',
    url: '/channelList',
    allRoles: true
  },
];

const privateLastMenus = [
];

const publicMainMenus = [
 ];

const publicLabelsMenus = [
  {
      key: 92,
      id: 92,
      iconColor: 'aqua',
      title: '文档',
      showLabel: false,
      url:'/document'
    },
    {
    key: 93,
    id: 93,
    iconColor: 'aqua',
    title: '关于',
    showLabel: false,
    url: '/about'
  },
];


function onMenuClick(item) {
  if (item.url) {
    history.push(item.url);
  }
}

class SidebarMenu extends React.Component {
  render() {
    let {isAuthenticated, user} = this.props;
    let privateMenus = [];
    if (user) {
        privateMenus = privateMainMenus.filter(menuItem => (menuItem.allRoles || _.indexOf(menuItem.roles, user.role) != -1));
        let tmpLastMenus = privateLastMenus.filter((menuItem) => (menuItem.allRoles || _.indexOf(menuItem.roles, user.role) != -1));
        privateMenus = privateMenus.concat(tmpLastMenus);
    }
  const mainMenus = isAuthenticated ? privateMenus.concat(publicMainMenus) : publicMainMenus;
  const labelsMenus = publicLabelsMenus;
  return (
    <SidebarMenuWrapper>
      <SidebarMenuHeader title="主菜单" />
      {mainMenus.map((menu) =>
        <TreeMenu
          {...menu}
          onClick={() => onMenuClick(menu)}
          onItemClick={onMenuClick}
        />
      )}
      <SidebarMenuHeader title="其他" />
      {labelsMenus.map((menu) =>
        <TreeMenu
          {...menu}
          onClick={() => onMenuClick(menu)}
          onItemClick={onMenuClick}
        />
      )}
    </SidebarMenuWrapper>
  );
  }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.user,
        user: state.user.user
    }
}

export default connect(mapStateToProps)(SidebarMenu)
