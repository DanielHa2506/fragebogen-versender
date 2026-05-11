// Achilles Altona — Fragebogen-Versender (Apps Script Backend)
// Muss im Account post@achilles-altona.de deployt werden,
// damit der Absender automatisch post@achilles-altona.de ist.

const TOKEN = "AA-2026-YlZxl66JKp19l4kbI7EiY3TTZ4JY";

const QUESTIONNAIRES = {
  alr_rsi:    { label: "ALR-RSI Skala",          url: "https://form.jotform.com/260753429924363" },
  spadi:      { label: "SPADI Index",            url: "https://form.jotform.com/241963687892375" },
  faam_g:     { label: "FAAM-G",                 url: "https://form.jotform.com/260753679302360" },
  ikdc:       { label: "IKDC",                   url: "https://form.jotform.com/260682980599374" },
  koos:       { label: "KOOS",                   url: "https://form.jotform.com/260684115261352" },
  acl_rsi:    { label: "ACL-RSI-Skala",          url: "https://form.jotform.com/241833088259060" },
  start_back: { label: "STarT Back Screening",   url: "https://form.jotform.com/260704124936354" },
  hoos:       { label: "HOOS",                   url: "https://form.jotform.com/260702969015357" },
  hsq_gv:     { label: "HSQ-GV",                 url: "https://form.jotform.com/253162589029059" },
  sf36:       { label: "SF-36",                  url: "https://form.jotform.com/242253066353048" },
  oxford_hip: { label: "Oxford Hip Score",       url: "https://form.jotform.com/241982881412360" }
};

const SUBJECT = "Dein Fragebogen — Achilles Altona";
const SENDER_NAME = "Praxis Achilles Altona";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: "Leere Anfrage." });
    }
    const body = JSON.parse(e.postData.contents);
    const token = body.token;
    const recipient = (body.recipient || "").trim();
    const key = body.key;

    if (token !== TOKEN) return json({ ok: false, error: "Nicht autorisiert." });
    if (!isValidEmail(recipient)) return json({ ok: false, error: "Ungültige Mailadresse." });

    const q = QUESTIONNAIRES[key];
    if (!q) return json({ ok: false, error: "Unbekannter Fragebogen." });

    MailApp.sendEmail({
      to: recipient,
      name: SENDER_NAME,
      subject: SUBJECT,
      htmlBody: buildHtmlBody(q),
      body: buildPlainBody(q)
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

function doGet() {
  return json({ ok: true, status: "Fragebogen-Versender bereit." });
}

function buildHtmlBody(q) {
  const url = escapeHtml(q.url);
  const label = escapeHtml(q.label);
  return [
    "<p>Moin,</p>",
    "<p>über den folgenden Link kannst du den Fragebogen ausfüllen. ",
    "Das dauert etwa 5–10 Minuten. Bitte fülle ihn vor unserem nächsten Termin aus.</p>",
    "<p>👉 <a href=\"" + url + "\">" + label + " ausfüllen</a></p>",
    "<p>Wenn du Fragen hast, melde dich gern in der Praxis.</p>",
    "<p>Viele Grüße<br>Praxis Achilles Altona</p>"
  ].join("");
}

function buildPlainBody(q) {
  return [
    "Moin,",
    "",
    "über den folgenden Link kannst du den Fragebogen ausfüllen. " +
      "Das dauert etwa 5–10 Minuten. Bitte fülle ihn vor unserem nächsten Termin aus.",
    "",
    q.label + ": " + q.url,
    "",
    "Wenn du Fragen hast, melde dich gern in der Praxis.",
    "",
    "Viele Grüße",
    "Praxis Achilles Altona"
  ].join("\n");
}

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
