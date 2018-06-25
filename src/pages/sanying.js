// 引入工具
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardAction, asyncDashboardAction } from './../redux/dashboard.redux'; // 引入action creator

// 引入ui组件
import { Button, List } from 'antd-mobile';
const Item = List.Item;


const mapStateToProps = state => state; // 将store中的状态state映射到这个组件的props中，num即为props的一个属性


const actionCreators = {dashboardAction, asyncDashboardAction}; // 将action同样映射到本组件的props中去

@connect(mapStateToProps, actionCreators) // 高阶组件（通过装饰器的写法）

class Sanying extends Component {
  handleItemClick(item, e) {
    console.log(item);
  }
  render() {
    const { dashboardReducer, dashboardAction, asyncDashboardAction } = this.props; // 这里面的变量都是通过connect高阶组件包装传进来的props
    return (
      <div>
        <List
          renderHeader={() => dashboardReducer}
        >
          {[1,2,3].map((item) => {
            return <Item
                    key={item}
                    extra={'No' + item}
                    onClick={e => {this.handleItemClick(item, e)}}
                  >{'name: ' + item}</Item>
          })}
        </List>
        <Button
          type="primary"
          onClick={() => {dashboardAction('ADD')}}
        >按钮</Button>
        <Button
          type=""
          onClick={() => {asyncDashboardAction('ADD')}}
        >异步</Button>
      </div>
    );
  }
}

export default Sanying;
