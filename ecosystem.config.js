// 20i Node.js Application Registration config (PM2 ecosystem format).
// 20i's "Discover applications" tool looks for this file + a .env (with PORT)
// in the document root. It runs server.js, our custom Next.js production server.
// Build first with `npm run build`, then upload, then discover.
module.exports = {
  apps: [
    {
      name: "awmedia-site",
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
