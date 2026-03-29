# Wiehler KMU Beratung Website

Deutschsprachige One-Pager-Website fuer Franz Wiehler (Konfliktnavigator). Realisiert mit reinem HTML, CSS und JavaScript.

## Inhalte
- Hero mit Claim, Vertrauensfaktoren und CTA
- Referenz-Slider, Angebotsmodule und Timeline mit CV-Highlights
- Persona-Szenarien, Video-Platzhalter und Kontaktbereich mit Formular

## Struktur
```
.
├── index.html        # Markup nach neuem Inhaltsplan
├── css/styles.css    # Design-Token, Layout, Responsiveness
├── js/main.js        # Scroll-Animationen, Slider, Formularfeedback
└── .github/
    └── copilot-instructions.md
```

## Entwicklung & Vorschau
1. Stelle sicher, dass ein lokaler Webserver verfuegbar ist (z. B. `python3`).
2. Server starten: `python3 -m http.server 8000` und anschliessend `http://localhost:8000` im Browser oeffnen.
3. Alternativ index.html per Doppelklick oeffnen (ohne Sticky-Navi, aber ausreichend fuer schnelle Checks).

## Anpassungstipps
- Farben via CSS-Variablen (`:root`) steuern.
- Texte und Persona-Bausteine in `index.html` anpassen (klarer Aufbau, Kommentare im Code).
- Fonts via Google Fonts (Libre Baskerville, Work Sans); Austausch ueber `<link>` im `<head>`.
# kmu-website
