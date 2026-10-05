# Sportgrowth content hub

## Instagram-skills

De `ig-*` skills in `.claude/skills/` komen uit
[Jakeschincariol/instagram-agent-skill](https://github.com/Jakeschincariol/instagram-agent-skill) (MIT).

- Die skills lezen en schrijven hun werkbestanden in `~/.claude/instagram/`.
  In deze repo staan die bestanden in `instagram/` (`voice.md`, `swipe.md`,
  `plan.md`, `log.md`). Lees en schrijf daar, zodat ze bewaard blijven.
- Het account is @sportgrowth_media. Schrijf teksten voor Instagram in het
  Nederlands, tenzij anders gevraagd.
- De Python-scripts en `slop.json` zijn op Engelse tekst afgestemd. Bij
  Nederlandse tekst zijn alleen de controles op leestekens, onzichtbare
  tekens, lengte en hashtags betrouwbaar; beoordeel de rest zelf.
- Uitleg voor het team: `instagram/HANDLEIDING.md`.

## Dagelijkse to-do

Jari stuurt elke ochtend een bericht zoals "Goeiemorgen, vandaag zijn we {dag datum}, wat staat er op de agenda?".
Antwoord dan zo:

1. Lees eerst `instagram/plan.md`, het draaiboek en de shotlist van de lopende periode
   (`instagram/DRAAIBOEK-*.md`, `instagram/SHOTLIST-*.md`), `instagram/opvolging.md`
   en, als die bestaat, `instagram/log.md`.
2. **Kort lijstje bovenaan:** wat er vandaag moet gebeuren, met afvinkvakjes en een
   geschatte tijd per taak. Belangrijkste eerst. Vermeld ook wat er morgen klaar moet zijn.
3. **Daarna per taak stap voor stap:** wat, waar, hoe, en de kant-en-klare teksten
   (captions, DM's, stories) zodat Jari ze kan kopiëren.
4. Hou rekening met wat Jari zelf meldt (werk, weg, weinig tijd) en schuif taken door
   als iets niet lukt. Pas dan `plan.md` en het draaiboek aan.
5. Werk na afloop `instagram/opvolging.md` en de status in `plan.md` bij met wat Jari
   meldt (gepost, gestuurd, antwoord gekregen), commit en push.
6. Zit het draaiboek bijna leeg (minder dan 4 dagen), stel dan het volgende weekplan,
   draaiboek en de shotlist voor.

Checklist om af te vinken: https://claude.ai/artifact/DBgE35gbafou2zHS5PPqcV
- Collectie `tasks` (één document per taak, doc_id `{datum}-{volgnummer}`): `date` (JJJJ-MM-DD),
  `order`, `title`, `minutes`, `done`, `detail` (korte stappen, kant-en-klare teksten).
- Collectie `notes` (doc_id = datum): `text`, opmerkingen van Jari voor Claude.
- Lees beide met `ArtifactData` vóór je de to-do opstelt; schrijf nieuwe taken met een `batch`.
- Elke ochtend om ±7u30 start een routine in dit gesprek die dit automatisch doet.

Beschikbaarheid van Jari (vaste week):

| Dag | Tijd voor SportGrowth Media | Goed voor |
|---|---|---|
| Maandag | werkt tot 16u, 's avonds een beetje | kleine taken, inplannen, DM's |
| Dinsdag | vrij vanaf 12u; 18u-22u30 geeft hij padeltraining | monteren 's middags; padelbeelden filmen tijdens de training |
| Woensdag | vrij 9u-16u30 | hoofdwerkdag: shoots overdag, monteren, carrousels, analyses |
| Donderdag | werkt overdag, 's avonds een beetje | kleine taken, inplannen |
| Vrijdag | lukt meestal niet | niets plannen (posts staan vooraf ingepland) |
| Zaterdag | voetbal 12u30-18u; kleine taken lukken | stories op de gsm |
| Zondag | kleine taken lukken | stories op de gsm, reel staat vooraf ingepland |

Regels voor de planning:
- **Niet afgevinkt, met deadline** (een post die die dag online moest): kijk eerst of het toch gebeurd is
  (opmerking, of vraag het). Zo niet: zet de post op het eerstvolgende vrije moment en schuif wat
  erachter komt mee op. Pas `plan.md` en het draaiboek aan en zeg duidelijk wat er verschoof.
- **Niet afgevinkt, zonder deadline** (reageren, een DM, voorbereiding): bovenaan de lijst van vandaag.
- **Twee dagen na elkaar open:** vraag of de taak nog moet, of schrap ze.
- **Werkdagen:** hou de lijst rond een uur, tenzij Jari meer tijd meldt. Wil hij een dag niets doen,
  zet dan alleen wat op de gsm kan en die dag moet.
- **Opnames:** voor elke post met eigen beeld komt een shoot-taak (titel begint met "Shoot:") minstens
  2 dagen vóór de postdatum, monteren minstens 1 dag ervoor, en de post de dag ervoor ingepland.
  Groepeer shoots per locatie volgens de shotlist. Lukt die buffer niet, zeg het en stel voor de post
  op te schuiven.

Schrijf in het Nederlands (Vlaams), kort en concreet.
