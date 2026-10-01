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

Schrijf in het Nederlands (Vlaams), kort en concreet.
