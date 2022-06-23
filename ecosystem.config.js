module.exports = {
  apps : [{
    script: './dist/shared/infra/http/server.js',
  }, {
    script: './dist/shared/infra/http/queue.js',
  }],
};
