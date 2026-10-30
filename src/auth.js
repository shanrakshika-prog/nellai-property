// Password hashing (scrypt) + signed expiring tokens (HMAC-SHA256). No third-party dependencies.
const crypto = require("crypto"),
  db = require("./db"),
  cfg = require("./config");

const hash = (pw, salt = crypto.randomBytes(16).toString("hex")) =>
  salt + ":" + crypto.scryptSync(pw, salt, 64).toString("hex");
function verify(pw, stored) {
  const [salt, h] = stored.split(":"),
    a = Buffer.from(h, "hex"),
    b = crypto.scryptSync(pw, salt, 64);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function init() {
  const m = db.get().meta;
  let changed = false;
  if (!m.secret) {
    m.secret = crypto.randomBytes(32).toString("hex");
    changed = true;
  }
  if (!m.admin) {
    changed = true;
    m.admin = { user: cfg.adminUser, pass: hash(cfg.adminPass) };
    console.log(
      `\n  Admin account created -> username: ${cfg.adminUser}  password: ${cfg.adminPass}\n  (set ADMIN_USER / ADMIN_PASS env vars before first run to change)\n`,
    );
  }
  if (changed) db.save();
}
const sign = (p) =>
  crypto
    .createHmac("sha256", db.get().meta.secret)
    .update(p)
    .digest("base64url");
function issue(user) {
  const p = Buffer.from(
    JSON.stringify({ u: user, exp: Date.now() + cfg.tokenTtlMs }),
  ).toString("base64url");
  return p + "." + sign(p);
}
function check(token) {
  const [p, s] = String(token || "").split(".");
  if (!p || !s) return null;
  const good = Buffer.from(sign(p)),
    got = Buffer.from(s);
  if (good.length !== got.length || !crypto.timingSafeEqual(good, got))
    return null;
  try {
    const d = JSON.parse(Buffer.from(p, "base64url"));
    return d.exp > Date.now() ? d.u : null;
  } catch {
    return null;
  }
}
function requireAdmin(req, res, next) {
  const user = check((req.get("Authorization") || "").replace(/^Bearer /, ""));
  if (!user) return res.status(401).json({ error: "Please log in as admin" });
  req.admin = user;
  next();
}
module.exports = { init, hash, verify, issue, requireAdmin };
