//??4. ???? ecosystem.config.js
//ecosystem.config.js
module.exports = {
  apps: [{
    name: 'cluster test',
    script: './server-register.js',
    instances: '3',
    mode: 'cluster',
  }]
}
