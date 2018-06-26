import React, { Component } from 'react';
import { List, Button } from 'antd-mobile';
import {
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { authAction } from './../redux/auth.redux';

// ui
import Sanying from './sanying';
const Item = List.Item;

const Yiying = props => (
  <div>一营</div>
);

const Erying = props => (
  <div>二营</div>
);

@connect(
  state => state,
  { authAction }
)

class Dashboard extends Component {
  render() {
    const { authReducer, authAction, match } = this.props;
    const app = (
      <div>
        <Button onClick={() => {authAction('LOGOUT')}}>注销</Button>
        <List
          renderHeader={() => "骑兵团"}
        >
          <Item
            extra={"一营"}
          ><Link to={`${match.url}/yiying`}>一营</Link></Item>
          <Item
            extra={"二营"}
          ><Link to={`${match.url}/erying`}>二营</Link></Item>
          <Item
            extra={"三营"}
          ><Link to={`${match.url}/sanying`}>三营</Link></Item>
        </List>
        <Route path={`${match.url}/yiying`} component={Yiying} />
        <Route path={`${match.url}/erying`} component={Erying} />
        <Route path={`${match.url}/sanying`} component={Sanying} />
      </div>
    );
    const login = <Redirect to="/login" />;
    return authReducer.isAuth ? app : login;
  }
}

export default Dashboard;
