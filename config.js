const CONFIG = {
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbyZXslI_Ftepz2JuNDVXOFRFca-XrLFkSe6upLEHEb3dOAYD2Vy3KA68rqODwyz1m_T/exec",

  // Fragebögen nach Körperregion gruppiert.
  // Die `key`-Werte müssen exakt zu Code.gs (QUESTIONNAIRES) passen — nicht ändern.
  // `desc` = kurzer Beschreibungssatz auf der Kachel (ENTWURF — fachlich bitte prüfen/korrigieren).
  groups: [
    {
      region: "Knie",
      items: [
        { key: "ikdc",    label: "IKDC",          desc: "Kniefunktion, Symptome & Sportfähigkeit — Selbsteinschätzung.", url: "https://form.jotform.com/260682980599374" },
        { key: "koos",    label: "KOOS",          desc: "Kniebeschwerden & Alltag bei Verletzung oder Arthrose.",       url: "https://form.jotform.com/260684115261352" },
        { key: "acl_rsi", label: "ACL-RSI-Skala", desc: "Psychische Bereitschaft zur Sport-Rückkehr nach Kreuzbandriss.", url: "https://form.jotform.com/241833088259060" }
      ]
    },
    {
      region: "Hüfte",
      items: [
        { key: "hoos",       label: "HOOS",             desc: "Hüftbeschwerden & Funktion bei Verletzung oder Arthrose.", url: "https://form.jotform.com/260702969015357" },
        { key: "oxford_hip", label: "Oxford Hip Score", desc: "Hüftschmerz & Funktion, v. a. rund um eine Hüft-OP.",      url: "https://form.jotform.com/241982881412360" }
      ]
    },
    {
      region: "Schulter",
      items: [
        { key: "spadi", label: "SPADI Index", desc: "Schmerz & Einschränkung der Schulter im Alltag.", url: "https://form.jotform.com/241963687892375" }
      ]
    },
    {
      region: "Fuß & Sprunggelenk",
      items: [
        { key: "faam_g",  label: "FAAM-G",        desc: "Funktion von Fuß & Sprunggelenk in Alltag und Sport.",            url: "https://form.jotform.com/260753679302360" },
        { key: "alr_rsi", label: "ALR-RSI Skala", desc: "Psychische Bereitschaft zur Sport-Rückkehr nach Bandverletzung am Sprunggelenk.", url: "https://form.jotform.com/260753429924363" }
      ]
    },
    {
      region: "Rücken",
      items: [
        { key: "start_back", label: "STarT Back Screening", desc: "Risiko-Einschätzung bei Rückenschmerzen.", url: "https://form.jotform.com/260704124936354" }
      ]
    },
    {
      region: "Kopf",
      items: [
        { key: "hsq_gv", label: "HSQ-GV (Headache)", desc: "Screening von Kopfschmerz-Beschwerden.", url: "https://form.jotform.com/253162589029059" }
      ]
    },
    {
      region: "Allgemein",
      items: [
        { key: "sf36", label: "SF-36", desc: "Allgemeine gesundheitsbezogene Lebensqualität.", url: "https://form.jotform.com/242253066353048" }
      ]
    }
  ]
};
