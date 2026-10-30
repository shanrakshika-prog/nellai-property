const express = require("express"), path = require("path"), cfg = require("./src/config"), db = require("./src/db"), auth = require("./src/auth");
db.get(); auth.init();

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "50kb" }));
app.use((q, r, n) => { r.set({ "X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY", "Referrer-Policy": "same-origin" }); n(); });
app.use("/api/admin", require("./src/routes/admin"));
app.use("/api", require("./src/routes/public"));
app.use("/api", (q, r) => r.status(404).json({ error: "Not found" }));
app.use(express.static(path.join(__dirname, "public")));
app.use((err, q, r, n) => {
  if (err.type === "entity.parse.failed") return r.status(400).json({ error: "Invalid JSON" });
  console.error(err); r.status(500).json({ error: "Server error" });
});
app.listen(cfg.port, () => console.log(`Nellai Property running -> http://localhost:${cfg.port}   Admin -> /admin.html`));
