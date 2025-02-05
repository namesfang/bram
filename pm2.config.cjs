module.exports = {
  apps: [
    {
      name: "bram",
      exec_mode: "cluster",
      instances: "max",
      script: "./build/index.js",
      env: {
        PORT: 6040
      }
    },
  ],
};
