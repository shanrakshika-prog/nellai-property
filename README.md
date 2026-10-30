# Nellai Property · நெல்லை சொத்து
Bilingual (Tamil / English) property portal with admin moderation. Node.js 18+ and Express only.

## Run
    npm install
    npm start              # http://localhost:3000   (admin: /admin.html)
Default admin: `admin` / `admin123` (created on first run). Set `ADMIN_USER` and `ADMIN_PASS` env vars **before the first run** to choose your own. To reset, delete the `meta.admin` entry in `data/db.json` and restart.

## How it works
Visitor posts a listing -> status **pending** (not public) -> admin assigns a broker and **accepts** (goes live) or **rejects** (reason required) -> every decision is stored in the **history** log. Public contact calls route to the assigned broker; phone numbers remain available only in the admin console. Live listings can later be **removed** (also logged).

## Structure
    server.js              app bootstrap, security headers, routing
    src/config.js          port, file paths, default admin
    src/db.js              JSON datastore (data/db.json), atomic writes
    src/auth.js            scrypt password hashing, signed expiring tokens, middleware
    src/validate.js        server-side validation / sanitising
    src/seed.js            sample approved listings
    src/routes/public.js   GET/POST /api/listings
    src/routes/admin.js    /api/admin/* (login, stats, listings, history, approve/reject/remove)
    public/                index.html, style.css, app.js (site) · admin.html, admin.css, admin.js (console)

## API
    GET  /api/listings                      approved listings
    POST /api/listings                      submit (pending)
    POST /api/admin/login                   {username,password} -> {token}
    GET  /api/admin/stats | /listings?status= | /history?action=
    GET  /api/admin/brokers                  broker directory (admin only)
    POST /api/admin/brokers                  add {name, phone}
    DELETE /api/admin/brokers/:id            remove an unassigned broker
    POST /api/admin/listings/:id/approve     accept {brokerId}
    POST /api/admin/listings/:id/reject      reject {reason}
    POST /api/admin/listings/:id/remove      remove {reason}
Admin calls need header `Authorization: Bearer <token>` (valid 8 hours).

## Production notes
Serve behind HTTPS, set a strong ADMIN_PASS, and for heavy traffic replace src/db.js with PostgreSQL/MongoDB (all data access goes through that one file plus the two route files).
