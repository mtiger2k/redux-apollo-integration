import React, { PropTypes } from 'react';

const propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

function TabPane({ id, children, active }) {
  return (
    <div className={active?'tab-pane active':'tab-pane'} id={id} >
      {children}
    </div>
  );
}

TabPane.propTypes = propTypes;

export default TabPane;
