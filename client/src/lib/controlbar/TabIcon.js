import React, { PropTypes } from 'react';

const propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
};

function TabIcon({ href, icon, active }) {
  return (
    <li className={active?'active':''}>
      <a href={href} data-toggle="tab">
        <i className={icon}></i>
      </a>
    </li>
  );
}

TabIcon.propTypes = propTypes;

export default TabIcon;
