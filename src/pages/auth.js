import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authAction, getData } from './../redux/auth.redux';
import { Redirect } from 'react-router-dom';

import { Button } from 'antd-mobile';

@connect(
  state => state.authReducer,
  { authAction, getData }
)
class Auth extends Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    const { isAuth, authAction, user, age } = this.props;
    // console.log(this.props);
    const auth = (
      <div>
        <h1>请登录</h1>
        <h2>姓名： {user} 年龄： {age}</h2>
        <Button type="primary" onClick={() => {authAction('LOGIN')}}>登录</Button>
      </div>
    );
    const dashboard = <Redirect to="dashboard" />
    return isAuth ? dashboard : auth;
  }
}

export default Auth;