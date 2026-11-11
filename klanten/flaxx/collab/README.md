# Collab-reel Flaxx × SportGrowth Media · "Het verhaal achter Flaxx" (do 5/11 18u00)
v8 (3/11): hook = animatie (lijntekening speler, bal tikt op racket, trilling door onderarm, elleboog licht rood op, "4 elleboogoperaties") + hooksfx.py. Te vervangen door echt elleboogshot als dat er komt. v4 (2/11): geluid opnieuw opgebouwd (adelay werd genegeerd → nu stilte + concat per fragment, gemeten: Koen start op 2,5 s). v3 (2/11): hook 2,2 s met 0,28 s rust vóór Koen, Gilles G3 14,6-19,65 (met lichtgewicht/stijf/dempend), foto koen-jari-rackets-1 (ogen open). v1: 33 s, alles klaar behalve het openingsbeeld (tijdelijk: wazig racket).
| Tijd | Deel | Beeld | Geluid/tekst |
|---|---|---|---|
| 0-2,4 | Hook | elleboogshot di 3/11 (TIJDELIJK wazig racket) | "4 elleboogoperaties", kicker "Het verhaal achter Flaxx" |
| 2,4-12,7 | Verhaal | Koen naast bord "Ons verhaal" (V5 0,2-10,5) | Koen + ondertitels, naamband Koen Hubert · Oprichter Flaxx |
| 12,7-19 | Zoektocht | macro vlas 2870, 2867 (+ later vlasbeelden Gilles) | V5 10,9-17,2, "VLAS" groot |
| 19-24,3 | Materiaal | Gilles (G3 8,65-13,95) → close-ups CONTROL, POWER, rand FLAXX RACKETS | "Vlasvezel heeft een unieke combinatie" + Lichtgewicht / Stijf / Heel goed dempend |
| 24,3-28,85 | Rackets | push-ins 2904 (CONTROL), 2905 (POWER) | V4 4,6-9,15 "zeer hoge trillingsdemping" |
| 28,85-33 | Afsluiter | foto Koen + Jari | Flaxx × SportGrowth Media, embleem, flaxx, "Schrijf je in op flaxx.be", @flaxx_rackets · @sportgrowth_media |
Na te kijken: timing ondertitels Gilles (geschat op pauzes). Muziek: in Instagram toevoegen op 10-15 %.
Elleboogshot toevoegen: `HOOK=/pad/naar/clip.mov HOOKSS=<start> ./base.sh && ./render.sh v2 skipmotion`
Vlasbeelden Gilles: c1/c2 in base.sh vervangen.
Bouwen: base.sh (beeld + spraak) → motion.js (titels) → render.sh (mix + export).

**v9** · hook met AI-clip (Kling, `hook-kling-bron.mp4`): smash 0-0,75 s, snede met punch-in op de elleboog 0,75-2,2 s, watermerk weggesneden. Tekst "Last van je / elleboog / na padel?" (elleboog in rood) vanaf 0,75 s, slag in het geluid op de snede. Terug naar de getekende hook: `HOOKANIM=1 ./base.sh && HOOKANIM=1 node motion.js <mo> 0-70 && HOOKANIM=1 ./render.sh vX skipmotion`.
Let op: realistische AI-beelden in IG het label "AI-info" geven (Meta vraagt dit).

**v10** · c1/c2 (13,15-19,0) = vlasoogst uit een schermopname (`vlas-oogst-bron.mov`, post van Mechielsen Oldehove BV, UI weggesneden). **Toestemming vragen vóór posten**, of vervangen door beelden van Gilles/BioFibix.

**v11** · 13,15-15,2 veld + oogst (schermopname), 15,2-17,1 IMG_2870 en 17,1-19,0 IMG_2867 (racket van dichtbij, vlasstructuur). Toestemming Mechielsen Oldehove BV nog nodig.

**v12** · veld + oogst 13,15-16,3 (t/m "dat heel trillingsdempend werkt"), IMG_2870 16,3-18,05 ("Zo zijn we terechtgekomen bij"), IMG_2867 18,05-19,0 onder VLAS.

**v13** · brug 2,2-4,0 na de hook: getekende trilling (bal → racket → arm → rode elleboog) met "Elke slag stuurt / trillingen / naar je elleboog". Alles daarna 1,8 s later, totaal 34,8 s. In motion.js: `R(t,ta)` = oude tijdlijn, `window.render` schuift de tijd op.

**v14** · animatie eruit (terug naar 33 s, hook = enkel Kling-clip). Vlasveld 13,15-18,05 (t/m "Zo zijn we terechtgekomen bij"), IMG_2870 racket met vlasstructuur 18,05-19,0 onder VLAS, daarna Gilles.

**v15** · vlasdeel met foto's van BioFibix (`biofibix/`): drone-veld 13,15-15,2 · vlasplanten 15,2-16,6 · vezelrol 16,6-18,05 (logo weggesneden) · racket IMG_2870 18,05-19,0 onder VLAS. Geen schermopname van Mechielsen meer nodig.

**v16-A / v16-B** · slot 24,3-28,85 vervangen (V4 "mechanische eigenschap" eruit). A: Koen V2a 0,7-5,05 "De ERGO CONTROL en de ERGO POWER zijn twee verschillende types rackets". B: Koen panel IMG_2937 9,8-11,6 "We zijn uniek met onze rackets" + 14,8-18,15 "En we willen die pioniersrol blijven opnemen" (snedes op pauzes gemeten, niet beluisterd). Kiezen met `VAR=A|B ./base.sh && VAR=A|B node motion.js <mo>`.
Gekozen: **v16-B** (wo 4/11, Jari). Standaard staat VAR nu op B.
