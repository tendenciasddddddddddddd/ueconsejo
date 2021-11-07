module.exports = {
    apps : [{
      name : "plataform",
      script    : "./build/index.js",
      watch: false,
      max_memory_restart: '1G',
      instances : 1,
      exec_mode : "cluster",
      env_production: {
        NODE_ENV :"production"
      }
    }]
  }