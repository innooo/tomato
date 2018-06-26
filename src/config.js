import axios from 'axios';
import { Toast } from 'antd-mobile';

// 拦截请求
axios.interceptors.request.use(config => {
  Toast.loading('加载中', 0);
  console.log('req', config);
  return config;
});

// 拦截响应
axios.interceptors.response.use(config => {
  setTimeout(() => Toast.hide(), 1000);
  console.log('res', config);
  return config;
});