# Fragebogen-Versender — Achilles Altona

Kleine iPad-Webapp, mit der die Anmeldung mit zwei Taps einen JotForm-Fragebogen-Link per E-Mail an Patient:innen schickt. Versand läuft über `post@achilles-altona.de`.

## Architektur

- **Frontend:** statisches HTML/CSS/JS, gehostet auf GitHub Pages.
- **Backend:** Google Apps Script Web App, deployt im Account `post@achilles-altona.de`. Verschickt Mails per `MailApp.sendEmail()`.
- **Schutz:** Geheim-Token im URL-Hash der App. Ohne korrektes Token verweigert das Apps Script den Versand.

## Einrichtung — Schritt für Schritt

### 1. Token festlegen

Sich eine lange Zufallszeichenkette ausdenken (oder generieren), z. B.:

```
AchillesAltona-2026-Px7q9m2vB4nLk
```

Diesen Wert an **zwei Stellen** eintragen:

- `Code.gs`: Konstante `TOKEN` ersetzen.
- iPad-Link: hinter `#k=` im Lesezeichen (siehe Schritt 4).

### 2. Apps Script Web App anlegen

1. Im Browser **mit `post@achilles-altona.de` einloggen** (nicht mit einem persönlichen Account).
2. `https://script.google.com` öffnen → **Neues Projekt**.
3. Den Standardcode löschen, Inhalt von `Code.gs` einfügen.
4. Token in der `TOKEN`-Konstante eintragen, speichern.
5. **Bereitstellen → Neue Bereitstellung** → Typ „Webanwendung".
   - Ausführen als: **Ich** (`post@achilles-altona.de`)
   - Zugriff: **Alle**
6. Beim ersten Deployment fragt Google nach Berechtigungen (Mailversand). Bestätigen.
7. Die generierte **Web-App-URL** kopieren (endet auf `/exec`).

### 3. Frontend konfigurieren

In `config.js` den Wert von `appsScriptUrl` durch die Web-App-URL aus Schritt 2 ersetzen.

### 4. Auf GitHub Pages veröffentlichen

1. Neues öffentliches GitHub-Repo anlegen.
2. Alle Dateien aus diesem Ordner committen und pushen.
3. Repo-**Settings → Pages → Source: `main` / `root`** → Speichern.
4. Nach ein paar Minuten ist die App unter `https://<user>.github.io/<repo>/` erreichbar.

### 5. iPads einrichten

Auf jedem iPad in Safari öffnen:

```
https://<user>.github.io/<repo>/#k=DEIN-TOKEN
```

Dann **Teilen → Zum Home-Bildschirm**. Das Token bleibt im Lesezeichen erhalten und ist für die Mitarbeiter:innen unsichtbar.

## Tägliche Nutzung

1. App vom Home-Bildschirm öffnen.
2. Patient:innen-Mailadresse eintippen.
3. Auf den gewünschten Fragebogen tippen.
4. Bestätigungsdialog mit „Senden" bestätigen.
5. Toast „✓ … gesendet" — Mailfeld wird automatisch geleert.

## Fragebögen hinzufügen / ändern

Buttons werden an **zwei Stellen** definiert (Frontend zeigt sie an, Backend versendet sie):

1. `config.js` → Eintrag im Array `questionnaires`.
2. `Code.gs` → Eintrag im Objekt `QUESTIONNAIRES` (gleicher `key`).

Nach Änderung in `Code.gs` muss eine **neue Bereitstellung** im Apps Script erstellt werden (oder die bestehende aktualisiert). Die URL bleibt gleich.

## Token tauschen (z. B. nach Verlust eines iPads)

1. In `Code.gs` neuen Wert für `TOKEN` setzen, Bereitstellung aktualisieren.
2. Auf allen iPads das Lesezeichen mit dem neuen `#k=…`-Wert ersetzen.

## Limits

Google Workspace erlaubt bis zu ~1500 Mails pro Tag über `MailApp` — für den Praxisalltag mehr als ausreichend.

## DSGVO-Hinweise

- Versand erfolgt komplett über Google Workspace (eigener AV-Vertrag mit Google).
- Keine Drittanbieter zwischengeschaltet.
- Jeder Versand wird im „Gesendet"-Ordner von `post@achilles-altona.de` archiviert — vollständige Nachvollziehbarkeit.
- Antworten der Patient:innen (z. B. „falscher Fragebogen") landen wieder im `post@`-Postfach.
