import React, { Component } from 'react'

import PageWrapper from '../lib/page/PageWrapper';
import PageHeader from '../lib/page/PageHeader';
import Breadcrumb from '../lib/page/Breadcrumb';
import PageContent from '../lib/page/PageContent';

import Feature from '../components/feature'

class FeaturePage extends Component {

  render() {
    return (
    <PageWrapper>
      <PageHeader
        title="Feature page"
        description="Welcome to feature page"
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'feature' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <Feature />
      </PageContent>
    </PageWrapper>

    )
  }
}

export default FeaturePage