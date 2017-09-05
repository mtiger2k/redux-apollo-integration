import React from 'react';
import { connect } from 'react-redux'
import { update, clearMsg } from '../actions/user'

import PageWrapper from '../lib/page/PageWrapper';
import PageHeader from '../lib/page/PageHeader';
import Breadcrumb from '../lib/page/Breadcrumb';
import PageContent from '../lib/page/PageContent';
import Box from '../lib/widgets/Box';

import SettingsForm from './forms/SettingsForm';

export class SettingsPage extends React.Component {

    handleChange = (data) => {
        const { dispatch, update } = this.props;
        dispatch(clearMsg());
        dispatch(update({
            dispName: data.dispName,
            mobileNo: data.mobileNo
        }));
    }

    render() {
      const { user, successMsg } = this.props;
      return (
        <PageWrapper>
          <PageHeader
            title="设置"
            description=""
          >
            <Breadcrumb
              items={[
                { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
                { key: 2, title: 'Settings' },
              ]}
            />
          </PageHeader>
          <PageContent>
            <Box
            title="设置"
            status="primary"
            >
            <div id="settings">
            <SettingsForm initialValues={user} successMsg={successMsg} onSubmit={this.handleChange} />
            </div>
          </Box>
          </PageContent>
        </PageWrapper>
      );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    successMsg: state.user.successMsg
  }
}

function mapDispatchToProps(dispatch) {
    return { 
      dispatch,
      update
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
