module.exports = {
  apps: [
      {
          script: './src/server.js',
          cwd: 'backend/',
          name: 'server'
      },
      {
          script: 'front.js',
          cwd: 'frontend/',
          name: 'front'
      }
  ]
}