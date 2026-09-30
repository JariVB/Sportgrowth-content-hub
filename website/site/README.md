# sportgrowthmedia.be

Statische website (HTML + CSS), gehost op Netlify.

## Online zetten via Netlify (eenmalig)

1. Log in op app.netlify.com en open je site voor sportgrowthmedia.be.
2. **Site configuration → Build & deploy → Link repository** → kies GitHub → `JariVB/Sportgrowth-content-hub`.
3. Instellingen:
   - **Branch to deploy:** `main`
   - **Base directory:** `website/site`
   - **Build command:** leeg laten
   - **Publish directory:** `website/site`
4. Deploy. Daarna gaat elke wijziging op `main` vanzelf online.

## Formulier

Het aanvraagformulier gebruikt Netlify Forms. Inzendingen vind je in Netlify onder
**Forms → analyse**. Zet bij **Forms → Form notifications** een e-mailmelding aan,
zodat elke aanvraag in je mailbox binnenkomt.

## Nog in te vullen

- [x] E-mailadres jari@sportgrowthmedia.be.
- [ ] Ondernemingsnummer (BTW BE0...) in de footer van alle pagina's en in `privacy.html`, zodra je het hebt. Voor een Belgische onderneming is het verplicht op de website.
- [ ] Adres of maatschappelijke zetel in `privacy.html`.
- [x] Toestemming Jan Stilten voor quote en Instagram-beelden.
- [x] Logo S/G als SVG (`img/logo-sg.svg`, `favicon.svg`).
- [x] Voor/na-beelden van Jan Stilten Padel Academy (kinderen vervaagd).

## Bestanden

- `index.html` · startpagina
- `bedankt.html` · na het versturen van het formulier
- `privacy.html` · privacyverklaring
- `404.html` · pagina niet gevonden
- `styles.css` · alle opmaak
- `img/` · foto's (jpg + webp) en deelafbeelding `og.jpg`
- `fonts/` · lettertypes, lokaal gehost (geen Google Fonts, beter voor privacy)
