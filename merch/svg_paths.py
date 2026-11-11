# Maakt drukklare SVG's: alle tekst omgezet naar paden (geen lettertype nodig bij de drukker)
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import os
F='/home/user/Sportgrowth-content-hub/website/site/fonts/'
RJ=TTFont(F+'rajdhani-700.woff2'); IN=TTFont(F+'inter-var.woff2')
def text_path(font,txt,size,x,y,tracking=0.0,anchor='middle'):
    gs=font.getGlyphSet(); cmap=font.getBestCmap(); upm=font['head'].unitsPerEm; s=size/upm
    names=[cmap[ord(c)] for c in txt]; adv=[gs[n].width*s for n in names]
    total=sum(adv)+tracking*size*(len(txt)-1)
    cx=x-total/2 if anchor=='middle' else x
    out=[]
    for n,a in zip(names,adv):
        pen=SVGPathPen(gs); tp=TransformPen(pen,(s,0,0,-s,cx,y)); gs[n].draw(tp)
        d=pen.getCommands()
        if d: out.append(d)
        cx+=a+tracking*size
    return ' '.join(out), total
def emblem(ring,stroke,letters,R=44):
    sp,_=text_path(RJ,'S',36,29,62); gp,_=text_path(RJ,'G',36,71,62)
    return f'''<defs><linearGradient id="r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a78ff"/><stop offset="1" stop-color="#00d4ff"/></linearGradient></defs>
<circle cx="50" cy="50" r="{R}" fill="none" stroke="{ring}" stroke-width="6"/>
<path d="{sp}" fill="{letters}"/><line x1="55" y1="30" x2="45" y2="69" stroke="{stroke}" stroke-width="5.5" stroke-linecap="round"/><path d="{gp}" fill="{letters}"/>'''
def save(name,w,h,body):
    open('drukbestanden/'+name,'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}mm" height="{h}mm">{body}</svg>')
# 1 embleem borst (2 kleuren + licht grijs) en 1 kleur wit, 80 mm
save('borst-embleem-kleur-80mm.svg',100,100,emblem('url(#r)','#00d4ff','#e8eaee'))
save('borst-embleem-wit-80mm.svg',100,100,emblem('#ffffff','#ffffff','#ffffff'))
# 2 rug woordmerk D1: 200 mm breed
a,wa=text_path(RJ,'SPORTGROWTH',29.6,100,30,tracking=0.06)
b,wb=text_path(IN,'MEDIA',11,101.5,47,tracking=0.45)
save('rug-woordmerk-200mm.svg',200,52,f'<path d="{a}" fill="#ffffff"/><path d="{b}" fill="#00d4ff"/>')
save('rug-woordmerk-wit-200mm.svg',200,52,f'<path d="{a}" fill="#ffffff"/><path d="{b}" fill="#ffffff"/>')
print('woordmerk breedte', round(wa,1), round(wb,1))
