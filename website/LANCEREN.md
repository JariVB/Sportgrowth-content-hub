# sportgrowthmedia.be lanceren: stap voor stap

Reken op ±30 minuten. Doe het op een computer, dat is makkelijker dan op je telefoon.
Knoppen in Netlify kunnen iets anders heten dan hier staat; ze veranderen soms hun menu's.

---

## Fase 1 · De nieuwe site op `main` zetten (5 min)

De nieuwe site staat op de werkbranch `claude/github-account-access-pqxbaj`. Netlify haalt de site van `main`, dus die moet eerst samengevoegd worden.

1. Open de nieuwe pull request op GitHub (Claude maakt die aan, of jij via **Compare & pull request** op de repo-pagina).
2. Controleer dat de pull request van `claude/github-account-access-pqxbaj` naar `main` gaat.
3. Klik **Merge pull request** → **Confirm merge**.

✅ Klaar als je op github.com/JariVB/Sportgrowth-content-hub de map `website/site` ziet op `main`.

---

## Fase 2 · Netlify aan GitHub koppelen (10 min)

Je gebruikt je **bestaande** Netlify-site, zodat je domein blijft werken.

4. Ga naar **app.netlify.com** en open de site waar sportgrowthmedia.be aan hangt.
5. Ga naar **Site configuration → Build & deploy → Continuous deployment**.
6. Klik **Link repository** (of **Link site to Git**) → kies **GitHub** → geef Netlify toegang als dat gevraagd wordt → kies **JariVB/Sportgrowth-content-hub**.
7. Vul in:

   | Veld | Waarde |
   |---|---|
   | Branch to deploy | `main` |
   | Base directory | `website/site` |
   | Build command | *(leeg laten)* |
   | Publish directory | `website/site` |

8. Klik **Save** of **Deploy site**.
9. Ga naar **Deploys**. Wacht tot de bovenste deploy **Published** toont (meestal onder een minuut).

⚠️ Vanaf nu vervangt de nieuwe site meteen de oude op sportgrowthmedia.be.

✅ Klaar als je op sportgrowthmedia.be je foto op het padelterrein ziet.

---

## Fase 3 · Het formulier laten werken (5 min)

10. Ga naar **Forms** in het menu van je site.
11. Staat er **Enable form detection**? Klik erop. (Nodig om het formulier te laten werken.)
12. Ga naar **Deploys → Trigger deploy → Deploy site**, zodat Netlify het formulier vindt.
13. Ga terug naar **Forms**. Je ziet nu een formulier **analyse**.
14. **Forms → Form notifications → Add notification → Email notification**:
    - Event: **New form submission**
    - Form: **analyse**
    - E-mail: **jari@sportgrowthmedia.be**
15. **Test:** vul het formulier op je site zelf in (gebruik "Test" als clubnaam).
    - Je komt op de pagina "Bedankt, ik ga ermee aan de slag."
    - De aanvraag staat in **Forms → analyse**.
    - Er komt een mail binnen. Kijk ook in je spam, en markeer hem als "geen spam".

✅ Klaar als de testmail in je inbox staat.

---

## Fase 4 · Domein en beveiliging controleren (2 min)

16. **Domain management**: controleer dat `sportgrowthmedia.be` het **primaire domein** is en dat `www.sportgrowthmedia.be` ernaar doorverwijst.
17. Onder **HTTPS** moet een certificaat **actief** zijn (slotje in de browser).

---

## Fase 5 · Alles nakijken op je telefoon (5 min)

Open sportgrowthmedia.be op je telefoon en loop dit af:

- [ ] Foto's laden (jij bovenaan, Over mij, Wat ik doe, voor/na Jan Stilten)
- [ ] Knop **Gratis analyse** bovenaan springt naar het formulier
- [ ] Menu-links werken op de computer (Resultaat, Over mij, Werkwijze, Prijzen)
- [ ] Vragen onderaan klappen open
- [ ] Link naar Instagram en je e-mailadres werken
- [ ] **Privacy** onderaan opent de privacyverklaring
- [ ] Een foute link (bv. sportgrowthmedia.be/test) toont de pagina "Deze pagina bestaat niet"
- [ ] Stuur je link naar jezelf in WhatsApp: je ziet een voorbeeld met je foto en de titel

---

## Fase 6 · Instagram aanpassen (2 min)

18. Zet in je bio deze link, zodat je in Netlify of Google kan zien wie via Instagram komt:

    `https://sportgrowthmedia.be/?utm_source=instagram&utm_medium=social&utm_content=bio`

19. Post een story: *"Mijn nieuwe website staat online"* met een linksticker naar dezelfde link.

---

## Fase 7 · Gevonden worden op Google (10 min, mag later)

20. Ga naar **search.google.com/search-console** → **Property toevoegen** → **Domein** → `sportgrowthmedia.be`.
21. Google geeft een **TXT-record**. Voeg dat toe bij je domeinbeheer:
    - Beheert Netlify je domein? **Domain management → DNS settings → Add new record → TXT**.
    - Anders: bij de partij waar je het domein kocht.
22. Klik **Verifiëren** in Search Console (kan tot een paar uur duren).
23. Ga naar **Sitemaps** → vul `sitemap.xml` in → **Indienen**.
24. Optioneel: maak een **Google Bedrijfsprofiel** aan (business.google.com) met België als werkgebied (zonder adres te tonen, omdat je bij de clubs langsgaat of online werkt).

---

## Nog te doen na de lancering

- [ ] **Ondernemingsnummer** (BTW BE0...) in de footer en de privacyverklaring zodra je het hebt. Stuur het naar Claude, dan wordt het ingevuld.
- [ ] Vanaf nu: elke aanpassing die Claude maakt en die jij samenvoegt op `main`, gaat vanzelf online. Je hoeft nooit meer bestanden te uploaden.
