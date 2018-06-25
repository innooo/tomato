const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/data', (req, res) => {
  res.json({user: 'Jack', age: 18});
});

app.get('/test', (req, res) => {
  res.send('<strong>测试</strong>')
});

// 监听端口
app.listen(9093, () => {
  console.log('Node app listen at 9093');
});