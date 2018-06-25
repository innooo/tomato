import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authAction } from './../redux/auth.redux';
import { Redirect } from 'react-router-dom';

import { Button } from 'antd-mobile';

@connect(
  state => state,
  {authAction}
)
class Auth extends Component {
  render() {
    const { authReducer, authAction } = this.props;
    const auth = (
      <div>
        <h1>请登录</h1>
        <Button type="primary" onClick={() => {authAction('LOGIN')}}>登录</Button>
      </div>
    );
    const dashboard = <Redirect to="dashboard" />
    return authReducer.isAuth ? dashboard : auth;
  }
}

export default Auth;