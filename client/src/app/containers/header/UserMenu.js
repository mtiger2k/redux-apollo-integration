import React from 'react';

import UserMenu from '../../../lib/header/UserMenu';
import { history } from '../../../routes';

/*const user = {
  name: 'Alexander Pierce',
  title: 'Web Developer',
  joined: 'Nov. 2012',
  avatar: '/dist/img/user2-160x160.jpg',
  online: true,
};*/

function onLinkClick(link) {
  // eslint-disable-next-line no-alert
  // alert(`route to ${link.url}`);
  history.push(link.url);
}

function onButtonClick(button) {
  // eslint-disable-next-line no-alert
  // alert(`button ${button.text} clicked`);
  history.push(button.url);
}

export default function ({user, loading}) {
  return (
    <UserMenu
      image='/dist/img/user2-160x160.jpg'
      name={loading?'loading':user.dispName}
      title={loading?'loading':`${user.username} - ${user.dispName}`}
      description={`Role: ${loading?'loading':(user.role?user.role:'role')}`}
      links={[
        { key: 1, text: 'Followers', url: '/followers' },
        { key: 2, text: 'Sales', url: '/sales' },
        { key: 3, text: 'Friends', url: '/friends' },
      ]}
      buttons={[
        { key: 1, text: '设置', align: 'left', url: '/settings' },
        { key: 2, text: '注销', url: '/signout' },
      ]}
      onLinkClick={onLinkClick}
      onButtonClick={onButtonClick}
    />
  );
}
