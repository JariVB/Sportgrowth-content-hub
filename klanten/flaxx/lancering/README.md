# Lanceringsvideo Flaxx (gratis, Flaxx post zelf) · v1 (2/11)
19.4 s, 1080x1920, zonder geluid (Flaxx kiest muziek in Instagram).
1 slowmotion bezoeker test (133602) "Net gelanceerd op Sports NEXT" · 2 reveal stand (2859) · 3 Koen geeft racket aan bezoeker (2857) · 4 orbit ERGO POWER · 5 orbit ERGO CONTROL · 6 macro vlas (2870) "BIOFIBIX® Hypermat Flax Fiber" · 7 custom racket (2885) "Innovatie uit België" · 8 racket (2884) "Meld je aan via de link in bio".
Overlays: overlays.js (Flaxx-groen, Inter).

# v2 (2/11) · premium opbouw, 24 s
Gebouwd zoals productlanceringen van topmerken: verhaal in 5 delen, één kleurlook (contrast, iets minder verzadigd, warm, vignet, filmkorrel), grote typografie (Inter), ritme op 120 BPM (0,5 s per beeld), eindkaart met logo + eigen tagline "Naturally FLAXX."
| Tijd | Beeld | Tekst |
|---|---|---|
| 0-0.6 | zwart | |
| 0.6-4.2 | macro vlas (2870, 2867), langzame zoom | "Uit vlas." / "Gemaakt in België." |
| 4.2-8.2 | 8 snelle beelden (close-ups, rand FLAXX RACKETS, racket Stephanie) | |
| 8.2-15.2 | orbits CONTROL en POWER | ERGO CONTROL 340–345 g · centrale sweetspot / ERGO POWER 355–360 g · hogere sweetspot |
| 15.2-19.9 | slowmotion slag, reveal stand, Koen met bezoeker | NSR · Natural Strain Reduction / Gelanceerd op Sports NEXT |
| 19.9-24 | eindkaart zwart | flaxx-logo · Naturally FLAXX. · De ERGO-lijn · Schrijf je in op flaxx.be |
Bestanden: flaxx-lancering-v2-met-sounddesign.mp4 (drone, hits op elke snede, riser, impact op het logo) en flaxx-lancering-v2-zonder-geluid.mp4 (voor eigen muziek in Instagram).
Bouwen: v2-overlays.js → v2-sound.py → v2-build.sh. Logo = uit foto van de stand gehaald (flaxx-logo-uit-foto.png): officieel logobestand vragen aan Koen voor de finale versie.

# v3 (2/11) · motion graphics
Zelfde montage als v2 + animaties (v3-motion.js, 720 frames, transparante track):
- tekst schuift uit een masker omhoog en wordt scherp (blur → scherp), kicker met krimpende letterafstand
- Belgische driekleur tekent zich onder "Gemaakt in België."
- woorden op de beat: Licht. / Stijf. / Dempend. / Vlas. (punch-in), zoeker-hoeken + teller 01/04, beeld-punch op elke snede
- witte flits op hero, POWER, NSR en eindkaart
- CONTROL / POWER: groot rangnummer 01/02 in contour, gewicht telt op naar 340–345 g / 355–360 g, lijn tekent zich
- NSR in contour + typemachine "Natural Strain Reduction"
- "Sports NEXT · Mechelen · 01.11.2026", lower third "Koen Hubert · Oprichter Flaxx"
- eindkaart: donkergroene gloed, logo-onthulling met wipe + lichtstreep, "Naturally FLAXX." letter per letter, CTA flaxx.be, credit "Beelden · SportGrowth Media"
Bouwen: v3-build.sh (basisbeeld) → node v3-motion.js <map> → samenvoegen met v2-sound.py (extra whooshes).
- 2/11 Jari: 'Licht. Stijf. Dempend.' en 'Koen Hubert · Oprichter Flaxx' goedgekeurd.
- v9 (2/11): eindkaart met officiële logo's van Flaxx (klanten/flaxx/logo/, PDF van Koen → PNG/SVG). = DEFINITIEF optie A.
- v10 (2/11): 6 verbeterpunten AdManage: geen zwart begin (start op vlas), donkere vlek achter grote woorden, teller start bij 300/315 g, slow motion gestabiliseerd (vidstab), teksten hoger (UI Instagram), langzame zoom op eindkaart. 23,4 s. = DEFINITIEF.
