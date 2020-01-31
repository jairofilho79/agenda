const proxy = [
  {
    context: '/api',
    target: "https://jns-agenda-api.herukoapp.com",
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
