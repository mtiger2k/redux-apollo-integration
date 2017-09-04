import React from 'react';

import FooterWrapper from '../../../lib/footer/FooterWrapper';

export default function Footer() {
  return (
    <FooterWrapper>
      <div className="pull-right hidden-xs">
        <b>Version</b> 3.0
      </div>
      <strong>
        <span>Copyright &copy; 2015-2017 </span>
        银保车贷系统
      </strong> All rights reserved.
    </FooterWrapper>
  );
}
