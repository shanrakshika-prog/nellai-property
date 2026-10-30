// Server-side validation + sanitising of a submitted listing. Never trust the browser.
const AM = ["a_lift","a_park","a_sec","a_pow","a_pool","a_gym","a_club","a_bore","a_gate","a_high","a_vis","a_cctv","a_fence","a_solar"];
const ENUM = { cat: ["house","land","apartment"], deal: ["purchase","rent","lease"], unit: ["sqft","cent","ground","acre"] };
const OPT = { furn: ["fu","fs","ff"], face: ["N","E","W","S"] };
const TEXT = { owner:[60,1], city:[60,1], loc:[80,1], addr:[160,1], lm:[200], title:[120,1], desc:[1500,1], dim:[40], zone:[80], water:[120], elec:[120] };
const txt = (v, max) => String(v ?? "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
const num = v => (v === "" || v == null ? NaN : Number(v));

exports.parseListing = (b = {}) => {
  const errors = [], o = {};
  for (const k in ENUM) ENUM[k].includes(b[k]) ? (o[k] = b[k]) : errors.push(`${k} is invalid`);
  for (const k in OPT) if (OPT[k].includes(b[k])) o[k] = b[k];
  for (const k in TEXT) { o[k] = txt(b[k], TEXT[k][0]); if (TEXT[k][1] && !o[k]) errors.push(`${k} is required`); }
  o.phone = String(b.phone ?? "").replace(/\s/g, "");
  if (!/^[6-9]\d{9}$/.test(o.phone)) errors.push("phone must be a 10-digit Indian mobile number");
  o.pin = String(b.pin ?? "").trim();
  if (!/^[1-9]\d{5}$/.test(o.pin)) errors.push("pin must be a 6-digit PIN code");
  o.price = num(b.price); if (!(o.price > 0 && o.price <= 1e10)) errors.push("price is invalid");
  o.area = num(b.area);   if (!(o.area > 0 && o.area <= 1e9)) errors.push("area is invalid");
  const dep = num(b.dep); o.dep = dep >= 0 && dep <= 1e10 ? dep : 0;
  const road = num(b.road); if (road >= 0 && road <= 500) o.road = String(road);
  if (o.cat !== "land") for (const k of ["bhk", "bath"]) { const n = num(b[k]); if (Number.isInteger(n) && n >= 1 && n <= 10) o[k] = n; }
  const photo = String(b.photo ?? "").trim();
  if (photo) /^https?:\/\/\S{3,480}$/.test(photo) ? (o.photo = photo) : errors.push("photo must be an http(s) URL");
  o.am = (Array.isArray(b.am) ? b.am : []).filter(a => AM.includes(a));
  o.neg = !!b.neg;
  return { errors, value: o };
};
