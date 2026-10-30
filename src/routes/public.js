// Public API: browse approved listings, submit a new one (goes to the admin queue as "pending").
const router = require("express").Router(), db = require("../db"), { parseListing } = require("../validate");
const hits = new Map(); // ip -> timestamps (simple in-memory rate limit: 10 submissions / hour)

const toPublic = ({ status, reviewedAt, reviewedBy, rejectReason, phone, brokerId, ...rest }) => ({
  ...rest,
  canCallBroker: Number.isInteger(brokerId) && db.get().brokers.some(b => b.id === brokerId),
});

router.get("/listings", (req, res) => {
  res.json(db.get().listings.filter(l => l.status === "approved").sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(toPublic));
});

router.get("/listings/:id/call", (req, res) => {
  const listing = db.get().listings.find(l => l.id === Number(req.params.id) && l.status === "approved");
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  const broker = db.get().brokers.find(b => b.id === listing.brokerId);
  if (!broker) return res.status(404).json({ error: "No broker is assigned to this listing" });
  res.redirect(302, `tel:${broker.phone}`);
});

router.post("/listings", (req, res) => {
  const now = Date.now(), recent = (hits.get(req.ip) || []).filter(t => now - t < 36e5);
  if (recent.length >= 10) return res.status(429).json({ error: "Too many submissions. Please try again later." });
  const { errors, value } = parseListing(req.body);
  if (errors.length) return res.status(400).json({ errors });
  recent.push(now); hits.set(req.ip, recent);
  const listing = { ...value, id: db.nextId(), status: "pending", createdAt: new Date().toISOString(), reviewedAt: null, reviewedBy: null, rejectReason: "" };
  db.get().listings.push(listing); db.save();
  res.status(201).json({ id: listing.id, status: "pending" });
});
module.exports = router;
