# Reel 10 · meningsreel 'Sportclubs, stop met affiches' (do 12/11 19u30)
v1 (9/11): testopname 1 in de SGM-studio (zonder groen doek), animaties + sfx + ondertitels (timing geschat op spraakpauzes, niet beluisterd). bash base.sh && ./render.sh vX [skipmotion]. Nieuwe opname: SRC=/pad SS=start D=duur bash base.sh (maskers in instagram/studio opnieuw zetten).

## v2 (di 10/11)
- Take: IMG_3229 (gsm, 4K, 30 fps), beste van 3 takes. Bron niet in de repo (31 MB).
- Uitknippen met MODNet (Xenova/modnet, ONNX, Apache-2.0): `python3.13 matte.py bron.mov 0.9 20.9 r10/alpha.mp4 model.onnx`. Strakke randen, geen groen doek nodig.
- `base2.sh`: persoon op 75%, hoofd onder het neonlogo (x 135, y 455), tafelrand achter het bureau.
- `motion.js`: ondertitels op de nieuwe spraak, animaties van v1 via WARP (tijdvervorming). v1 staat in `motion-v1.js`.
- Render: `bash base2.sh && ./render.sh v2 skipmotion` (of zonder skipmotion om de motion-track te herrenderen).
