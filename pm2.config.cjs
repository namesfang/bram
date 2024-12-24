module.exports = {
  apps: [
    {
      name: "bram",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./build/index.js",
    },
  ],
};