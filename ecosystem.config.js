module.exports = {
  apps: [
    {
      script: "./src/server.js",
      cwd: "/root/alpha-multi/AlphaMulti/backend/",
      name: "server",
    },
    {
      script: "./front.js",
      cwd: "/root/alpha-multi/AlphaMulti/frontend/",
      name: "front",
      env: {
        NODE_ENV: "production",
        HOST_API: "104.207.132.230:3333",
      },
    },
  ],
};
