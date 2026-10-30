// Tiny JSON-file datastore: { meta, listings[], history[] }. Atomic writes (tmp file + rename).
const fs = require("fs"), path = require("path"), cfg = require("./config");
let state = null;

function save() {
  const tmp = cfg.dataFile + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, cfg.dataFile);
}
function load() {
  fs.mkdirSync(path.dirname(cfg.dataFile), { recursive: true });
  if (fs.existsSync(cfg.dataFile)) state = JSON.parse(fs.readFileSync(cfg.dataFile, "utf8"));
  else { state = { meta: {}, listings: require("./seed"), history: [] }; }
  state.brokers = Array.isArray(state.brokers) ? state.brokers : [];
  state.meta.seq = state.meta.seq || Math.max(0, ...state.listings.map(l => l.id));
  save();
  return state;
}
module.exports = {
  get: () => state || load(),
  save,
  nextId: () => { const s = module.exports.get(); return ++s.meta.seq; },
};
