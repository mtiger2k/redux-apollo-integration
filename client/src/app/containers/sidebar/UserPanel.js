import React from 'react';
import UserPanel from '../../../lib/sidebar/UserPanel';

/*const user = {
  name: 'Alexander Pierce',
  title: 'Web Developer',
  joined: 'Nov. 2012',
  avatar: '/dist/img/user2-160x160.jpg',
  isOnline: true,
};*/

const UserPanel2 = ({user}) => {
  const onlineIcon = 'fa fa-circle text-success';
  //const offlineIcon = 'fa fa-circle text-danger';
  const statusIcon = onlineIcon;
  const statusText = '在线';
  return (
    <UserPanel
      image='/dist/img/user2-160x160.jpg'
      name={user?user.dispName:''}
      statusIcon={statusIcon}
      statusText={statusText}
    />
  );
}

export default UserPanel2
