import React from 'react';
import { connect } from 'react-redux';
import LayoutWrapper from '../../../lib/layout/LayoutWrapper';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Controlbar from './Controlbar';

function Layout({ user, loading, children }) {
  return (
    <LayoutWrapper color="blue">
      <Header user={user} loading={loading} />
      <Sidebar user={user} loading={loading} />
      {children}
      <Footer />
      <Controlbar />
    </LayoutWrapper>
  );
}

export default connect((state) => {
  return {
    user: state.user.user,
    loading: state.user.loading
  }
})(Layout)
