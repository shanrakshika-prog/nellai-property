const path = require("path");
module.exports = {
  port: process.env.PORT || 3000,
  dataFile: path.join(__dirname, "..", "data", "db.json"),
  adminUser: process.env.ADMIN_USER || "admin",     // used only when the admin account is first created
  adminPass: process.env.ADMIN_PASS || "admin123",  // CHANGE THIS before first run
  tokenTtlMs: 8 * 60 * 60 * 1000,
};
