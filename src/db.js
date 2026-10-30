// Datastore: { meta, listings[], history[], brokers[] }.
// - Local dev (default): JSON file data/db.json, atomic writes.
// - Vercel: Upstash Redis (added from Vercel -> Storage). Used when its REST url/token env vars exist.
const fs = require("fs"),
  path = require("path"),
  cfg = require("./config");
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const remote = !!(URL_ && TOKEN),
  KEY = "nellaiProperty";
let state = null,
  dirty = false;

async function redis(...cmd) {
  const r = await fetch(URL_, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error("Redis: " + (j.error || r.status));
  return j.result;
}
function normalise(s) {
  s.meta = s.meta || {};
  s.listings = Array.isArray(s.listings) ? s.listings : [];
  s.history = Array.isArray(s.history) ? s.history : [];
  s.brokers = Array.isArray(s.brokers) ? s.brokers : [];
  s.meta.seq = s.meta.seq || Math.max(0, ...s.listings.map((l) => l.id));
  return s;
}
function writeFile() {
  fs.mkdirSync(path.dirname(cfg.dataFile), { recursive: true });
  const tmp = cfg.dataFile + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, cfg.dataFile);
}
function loadFile() {
  if (fs.existsSync(cfg.dataFile))
    state = normalise(JSON.parse(fs.readFileSync(cfg.dataFile, "utf8")));
  else
    state = normalise({ meta: {}, listings: require("./seed"), history: [] });
  writeFile();
  return state;
}
// Remote mode: reload the latest data at the start of every request.
async function load() {
  if (!remote) return state || loadFile();
  const raw = await redis("GET", KEY);
  if (raw) state = normalise(JSON.parse(raw));
  else {
    state = normalise({ meta: {}, listings: require("./seed"), history: [] });
    dirty = true;
  }
  return state;
}
// Remote mode: save changes before the response is sent (see server.js).
async function flush() {
  if (!remote || !dirty || !state) return;
  dirty = false;
  await redis("SET", KEY, JSON.stringify(state));
}
function save() {
  dirty = true;
  if (!remote) writeFile();
}

module.exports = {
  remote,
  load,
  flush,
  save,
  get: () => {
    if (state) return state;
    if (remote) throw new Error("db not loaded");
    if (process.env.VERCEL)
      throw new Error(
        "No database connected: add Upstash Redis in Vercel -> Storage",
      );
    return loadFile();
  },
  nextId: () => ++module.exports.get().meta.seq,
};
