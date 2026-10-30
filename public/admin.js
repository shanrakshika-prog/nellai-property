const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = n => "₹" + Number(n).toLocaleString("en-IN");
const dt = s => s ? new Date(s).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";
const ICON = { house: "🏠", land: "🌾", apartment: "🏢" };
const NAME = { house: "House", land: "Land", apartment: "Apartment / Flat", purchase: "Purchase", rent: "Rent", lease: "Lease" };
let tok = sessionStorage.getItem("tok") || "", tab = "pending", hf = "";

async function api(path, opt = {}) {
  const r = await fetch("/api/admin" + path, { method: opt.method, headers: { "Content-Type": "application/json", Authorization: "Bearer " + tok }, body: opt.body && JSON.stringify(opt.body) });
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && path !== "/login") { logout(); throw new Error("Session expired. Please log in again."); }
  if (!r.ok) throw new Error(j.error || "Request failed");
  return j;
}
function show() {
  const on = !!tok;
  $("#login").classList.toggle("hidden", on); $("#dash").classList.toggle("hidden", !on); $("#logout").classList.toggle("hidden", !on);
  if (on) refresh();
}
function logout() { tok = ""; sessionStorage.removeItem("tok"); show(); }

$("#lf").onsubmit = async e => {
  e.preventDefault(); $("#lerr").textContent = "";
  try {
    const j = await api("/login", { method: "POST", body: { username: $("#u").value.trim(), password: $("#p").value } });
    tok = j.token; sessionStorage.setItem("tok", tok); $("#p").value = ""; show();
  } catch (x) { $("#lerr").textContent = x.message; }
};
$("#logout").onclick = logout;

const cards = (L, mode, brokers = []) => L.length ? `<div class="pg">${L.map(d => `<article class="pc"><div class="pc-im">${d.photo ? `<img src="${esc(d.photo)}" alt="" onerror="this.remove()">` : ICON[d.cat]}</div><div class="pc-b">
<div class="tags"><span>${ICON[d.cat]} ${NAME[d.cat]}</span><span>${NAME[d.deal]}</span></div><h4>${esc(d.title)}</h4>
<div class="pp">${fmt(d.price)}${d.deal == "rent" ? " /month" : ""}${d.dep ? ` · Deposit ${fmt(d.dep)}` : ""}</div>
<p class="mu">📍 ${esc(d.addr)}, ${esc(d.loc)}, ${esc(d.city)} – <b>${esc(d.pin)}</b></p><p>${esc(d.desc)}</p>
<div class="facts"><div><small>Area</small>${d.area} ${esc(d.unit)}</div><div><small>BHK / Baths</small>${d.bhk || "—"} / ${d.bath || "—"}</div><div><small>Owner</small>${esc(d.owner)}</div><div><small>Phone</small>${esc(d.phone)}</div></div>
${d.broker ? `<p class="broker-contact"><b>Assigned broker:</b> ${esc(d.broker.name)} · ${esc(d.broker.phone)}</p>` : ""}
<p class="mu">Submitted ${dt(d.createdAt)}</p></div><div class="acts">${mode == "pending"
 ? `<div class="assign"><label for="broker-${d.id}">Assign broker before publishing</label><select id="broker-${d.id}" data-broker-select="${d.id}"><option value="">Choose a broker</option>${brokers.map(b => `<option value="${b.id}">${esc(b.name)} · ${esc(b.phone)}</option>`).join("")}</select>${brokers.length ? "" : `<small>Add a broker in the Brokers tab before accepting.</small>`}</div><button class="ok" data-a="approve" data-id="${d.id}">✓ Accept</button><button class="no" data-a="reject" data-id="${d.id}">✕ Reject</button>`
 : `<button class="no" data-a="remove" data-id="${d.id}">🗑 Remove from site</button>`}</div></article>`).join("")}</div>`
 : `<div class="empty">${mode == "pending" ? "🎉 No pending submissions" : "Nothing here yet"}</div>`;

const brokerPanel = B => `<section class="broker-panel"><h2>Broker directory</h2><p class="mu">Add contacts here, then assign a broker when approving a property.</p>
<form id="brokerForm" class="broker-form"><div class="fld"><label for="brokerName">Broker name</label><input id="brokerName" name="name" maxlength="60" required></div>
<div class="fld"><label for="brokerPhone">Mobile number</label><input id="brokerPhone" name="phone" type="tel" inputmode="numeric" pattern="[6-9][0-9]{9}" maxlength="10" placeholder="10-digit Indian mobile" required></div>
<button class="btn">Add broker</button></form>
${B.length ? `<div class="broker-list">${B.map(b => `<article class="broker-row"><div><b>${esc(b.name)}</b><span>${esc(b.phone)}</span></div><small>${b.assignedCount ? `Assigned to ${b.assignedCount} listing${b.assignedCount == 1 ? "" : "s"}` : "Not assigned"}</small><button class="no" data-broker-delete="${b.id}" ${b.assignedCount ? "disabled title='Remove listing assignments before deleting'" : ""}>Remove</button></article>`).join("")}</div>` : `<div class="empty">No brokers added yet</div>`}</section>`;

const histTable = H => H.length ? `<div class="tw"><table><thead><tr><th>Date</th><th>Decision</th><th>Listing</th><th>Owner</th><th>Reason</th><th>By</th></tr></thead><tbody>${H.map(h => `<tr>
<td>${dt(h.at)}</td><td><span class="b ${h.action}">${h.action}</span></td>
<td><b>${esc(h.listing.title)}</b><br><small>${NAME[h.listing.deal]} · ${NAME[h.listing.cat]} · ${fmt(h.listing.price)} · ${esc(h.listing.loc)}, ${esc(h.listing.pin)}</small></td>
<td>${esc(h.listing.owner)}<br><small>${esc(h.listing.phone)}</small></td><td>${esc(h.reason) || "—"}</td><td>${esc(h.by)}</td></tr>`).join("")}</tbody></table></div>`
 : `<div class="empty">No decisions recorded yet</div>`;

async function refresh() {
  try {
    const s = await api("/stats");
    $("#stats").innerHTML = [["pending", "⏳ Pending"], ["approved", "✅ Accepted"], ["rejected", "❌ Rejected"], ["removed", "🗑 Removed"]]
      .map(([k, l]) => `<div class="st ${k}"><b>${s[k] || 0}</b><span>${l}</span></div>`).join("");
    $("#tabs").innerHTML = [["pending", `Pending (${s.pending || 0})`], ["live", "Live listings"], ["history", "History"], ["brokers", "Brokers"]]
      .map(([k, l]) => `<button class="${k == tab ? "on" : ""}" data-t="${k}">${l}</button>`).join("");
    $("#hf").classList.toggle("hidden", tab != "history");
    $("#hf").innerHTML = [["", "All"], ["approved", "Accepted"], ["rejected", "Rejected"], ["removed", "Removed"]]
      .map(([k, l]) => `<span class="opt ${k == hf ? "on" : ""}" data-h="${k}">${l}</span>`).join("");
    $("#content").innerHTML = tab == "history"
      ? histTable(await api("/history" + (hf ? "?action=" + hf : "")))
      : tab == "brokers" ? brokerPanel(await api("/brokers"))
      : cards(await api("/listings?status=" + (tab == "live" ? "approved" : "pending")), tab, tab == "pending" ? await api("/brokers") : []);
  } catch (e) { alert(e.message); }
}

document.addEventListener("click", async e => {
  const x = e.target.closest("[data-t],[data-h],[data-a],[data-broker-delete]"); if (!x) return;
  if (x.dataset.t) { tab = x.dataset.t; return refresh(); }
  if (x.dataset.h !== undefined) { hf = x.dataset.h; return refresh(); }
  if (x.dataset.brokerDelete) {
    if (!confirm("Remove this broker from the directory?")) return;
    try { await api(`/brokers/${x.dataset.brokerDelete}`, { method: "DELETE" }); refresh(); } catch (err) { alert(err.message); }
    return;
  }
  const { a, id } = x.dataset; let body = {};
  if (a == "approve") {
    const select = document.querySelector(`[data-broker-select="${id}"]`);
    if (!select || !select.value) return alert("Assign a broker before accepting this listing.");
    body.brokerId = Number(select.value);
    if (!confirm("Accept and publish this listing on the website?")) return;
  }
  if (a == "reject" || a == "remove") {
    const r = prompt(a == "reject" ? "Reason for rejection (saved in history):" : "Reason for removing this live listing:");
    if (r === null) return;
    if (!r.trim()) return alert("A reason is required.");
    body = { reason: r };
  }
  try { await api(`/listings/${id}/${a}`, { method: "POST", body }); refresh(); } catch (err) { alert(err.message); }
});

document.addEventListener("submit", async e => {
  if (e.target.id !== "brokerForm") return;
  e.preventDefault();
  const form = new FormData(e.target);
  try {
    await api("/brokers", { method: "POST", body: { name: form.get("name"), phone: form.get("phone") } });
    e.target.reset(); refresh();
  } catch (err) { alert(err.message); }
});
show();
