// Admin API: login, review queue, accept / reject / remove, and the decision history.
const router = require("express").Router(), db = require("../db"), auth = require("../auth");
const fails = new Map(); // ip -> {n, t}  login throttling: 5 failures / 15 min

router.post("/login", (req, res) => {
  const f = fails.get(req.ip) || { n: 0, t: Date.now() };
  if (Date.now() - f.t > 9e5) { f.n = 0; f.t = Date.now(); }
  if (f.n >= 5) return res.status(429).json({ error: "Too many attempts. Try again in 15 minutes." });
  const { username, password } = req.body || {}, a = db.get().meta.admin;
  if (username === a.user && typeof password === "string" && auth.verify(password, a.pass)) {
    fails.delete(req.ip); return res.json({ token: auth.issue(a.user), user: a.user });
  }
  f.n++; fails.set(req.ip, f);
  res.status(401).json({ error: "Invalid username or password" });
});

router.use(auth.requireAdmin);

const snap = l => ({ title: l.title, cat: l.cat, deal: l.deal, loc: l.loc, city: l.city, pin: l.pin, price: l.price, owner: l.owner, phone: l.phone });
function decide(req, res, from, to, action, needReason) {
  const l = db.get().listings.find(x => x.id === +req.params.id);
  if (!l) return res.status(404).json({ error: "Listing not found" });
  if (l.status !== from) return res.status(409).json({ error: `Listing is ${l.status}, expected ${from}` });
  let broker = null;
  if (to === "approved") {
    const brokerId = Number((req.body || {}).brokerId);
    if (!Number.isInteger(brokerId) || brokerId < 1) return res.status(400).json({ error: "Assign a broker before accepting this listing" });
    broker = db.get().brokers.find(b => b.id === brokerId);
    if (!broker) return res.status(400).json({ error: "Selected broker was not found" });
  }
  const reason = String((req.body || {}).reason || "").trim().slice(0, 300);
  if (needReason && !reason) return res.status(400).json({ error: "A reason is required" });
  const at = new Date().toISOString();
  Object.assign(l, { status: to, reviewedAt: at, reviewedBy: req.admin, rejectReason: to === "approved" ? "" : reason });
  if (broker) l.brokerId = broker.id;
  const assignedBroker = broker || db.get().brokers.find(b => b.id === l.brokerId);
  db.get().history.unshift({ id: db.nextId(), listingId: l.id, action, reason, by: req.admin, at, listing: { ...snap(l), broker: assignedBroker ? { name: assignedBroker.name, phone: assignedBroker.phone } : null } });
  db.save(); res.json(l);
}

router.get("/stats", (req, res) => {
  const s = {}; db.get().listings.forEach(l => (s[l.status] = (s[l.status] || 0) + 1)); res.json(s);
});
router.get("/listings", (req, res) => {
  const st = req.query.status;
  const { listings, brokers } = db.get(), brokerById = new Map(brokers.map(b => [b.id, b]));
  res.json(listings.filter(l => !st || l.status === st).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(l => ({ ...l, broker: brokerById.get(l.brokerId) || null })));
});
router.get("/history", (req, res) => {
  const a = req.query.action; res.json(db.get().history.filter(h => !a || h.action === a));
});
router.get("/brokers", (req, res) => {
  const state = db.get();
  res.json(state.brokers.map(b => ({ ...b, assignedCount: state.listings.filter(l => l.brokerId === b.id).length })));
});
router.post("/brokers", (req, res) => {
  const name = String((req.body || {}).name || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
  const phone = String((req.body || {}).phone || "").replace(/\s/g, "");
  if (!name) return res.status(400).json({ error: "Broker name is required" });
  if (!/^[6-9]\d{9}$/.test(phone)) return res.status(400).json({ error: "Enter a valid 10-digit Indian mobile number" });
  if (db.get().brokers.some(b => b.phone === phone)) return res.status(409).json({ error: "A broker with this mobile number already exists" });
  const broker = { id: db.nextId(), name, phone };
  db.get().brokers.push(broker); db.save(); res.status(201).json(broker);
});
router.delete("/brokers/:id", (req, res) => {
  const id = Number(req.params.id), state = db.get(), index = state.brokers.findIndex(b => b.id === id);
  if (index < 0) return res.status(404).json({ error: "Broker not found" });
  if (state.listings.some(l => l.brokerId === id)) return res.status(409).json({ error: "This broker is assigned to a listing and cannot be removed" });
  state.brokers.splice(index, 1); db.save(); res.json({ ok: true });
});
router.post("/listings/:id/approve", (req, res) => decide(req, res, "pending", "approved", "approved", false));
router.post("/listings/:id/reject",  (req, res) => decide(req, res, "pending", "rejected", "rejected", true));
router.post("/listings/:id/remove",  (req, res) => decide(req, res, "approved", "removed", "removed", true));
module.exports = router;
