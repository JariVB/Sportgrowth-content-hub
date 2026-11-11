# Reel 10 · meningsreel 'Sportclubs, stop met affiches' (do 12/11 19u30)
v1 (9/11): testopname 1 in de SGM-studio (zonder groen doek), animaties + sfx + ondertitels (timing geschat op spraakpauzes, niet beluisterd). bash base.sh && ./render.sh vX [skipmotion]. Nieuwe opname: SRC=/pad SS=start D=duur bash base.sh (maskers in instagram/studio opnieuw zetten).

## v2 (di 10/11)
- Take: IMG_3229 (gsm, 4K, 30 fps), beste van 3 takes. Bron niet in de repo (31 MB).
- Uitknippen met MODNet (Xenova/modnet, ONNX, Apache-2.0): `python3.13 matte.py bron.mov 0.9 20.9 r10/alpha.mp4 model.onnx`. Strakke randen, geen groen doek nodig.
- `base2.sh`: persoon op 75%, hoofd onder het neonlogo (x 135, y 455), tafelrand achter het bureau.
- `motion.js`: ondertitels op de nieuwe spraak, animaties van v1 via WARP (tijdvervorming). v1 staat in `motion-v1.js`.
- Render: `bash base2.sh && ./render.sh v2 skipmotion` (of zonder skipmotion om de motion-track te herrenderen).

## v3 (di 10/11, feedback Jari)
- Armen niet meer afgeknipt: persoon op volle breedte. Neonlogo hoger en kleiner (`studio/studio-sgm-hoog.png`, `NY=255 NR=112 OUT=studio-sgm-hoog.png node neon.js`).
- Grijze muur bij de hand weg: `comp.py` vergelijkt elk beeld met een lege-muurplaat (mediaan) en ontmengt de kleur van onscherpe randen.
- Echte tafel blijft in beeld (armen rusten er echt op), iets donkerder en warmer gekleurd; enkel de muur wordt studio.
- Hooktitel op de borst (top 1080), affiche + STOP links naast het hoofd.
- `bash base3.sh && ./render.sh v3`

## v5 (di 10/11, feedback: armen nog niet goed)
- Dichtere kadrering: persoon op 137%, tafel net onder beeld (armen lopen uit beeld). Logo nog hoger/kleiner (`studio-sgm-hoog2.png`, NY=200 NR=90), studio 120% (K=1.2, X0=108).
- `K=1.2 X0=108 Y0=0 SC=1.37 PX=-200 PY=-188 DARK=0.55 python3.13 comp.py ... studio-sgm-hoog2.png p3.mp4 bg3.png`, daarna `bash base3.sh && ./render.sh v5`.

## v6
- Studio onscherp (BLUR=7) en kast links donkerder, korrel GRAIN=3 over alles.

## v7
- Neonlogo scherp bovenop de onscherpe studio (NEON=studio/neon-laag-hoog2.png, `NOBG=1 NY=200 NR=90 node neon.js`). Gloed bij "Wij doen het voor jullie" op de nieuwe logoplaats.

## v9
- Onderaan naast de romp: donkere stoel altijd mee, witte muur altijd weg, studio onderaan donkerder (DARK=0.8). Geen geflikker of grijs meer linksonder.
