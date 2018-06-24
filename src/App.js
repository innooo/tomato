// 引入工具
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action, asyncAction } from './index.redux'; // 引入action creator

// 引入ui组件
import { Button, List } from 'antd-mobile';
const Item = List.Item;

class App extends Component {
  handleItemClick(item, e) {
    console.log(item);
  }
  render() {
    const { num, action, asyncAction } = this.props; // 这里面的变量都是通过connect高阶组件包装传进来的props
    return (
      <div className="App">
        <List
          renderHeader={() => num} // 通过从store中获取
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
          onClick={() => {action('ADD')}}
        >按钮</Button>
        <Button
          type=""
          onClick={() => {asyncAction('ADD')}}
        >异步</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {num: state}; // 将store中的状态state映射到这个组件的props中，num即为props的一个属性
}

const actionCreators = {action, asyncAction}; // 将action同样映射到本组件的props中去

App = connect(mapStateToProps, actionCreators)(App); // 高阶组件（装饰器）

export default App;
