module.exports = {
  apps: [
    {
      script: "./src/server.js",
      cwd: "backend/",
      name: "server",
    },
    {
      script: "front.js",
      cwd: "frontend/",
      name: "front",
      env: {
        NODE_ENV: "production",
        HOST_API: "localhost:3333",
      },
    },
  ],
};
