from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

def icon(size):
    scale=8
    im=Image.new('RGB',(512,512),'#f3eee4'); d=ImageDraw.Draw(im)
    d.rounded_rectangle((0,0,511,511),radius=128,fill='#203e31')
    points=[(19,14),(19,48),(30,48)]
    def curve(start,c1,c2,end):
        for i in range(1,41):
            t=i/40; u=1-t
            points.append((u**3*start[0]+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t**3*end[0],u**3*start[1]+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t**3*end[1]))
    curve((30,48),(40,48),(47,42),(47,33))
    curve((47,33),(47,24),(41,18),(32,18))
    points.append((32,26))
    curve((32,26),(37,26),(39,29),(39,33))
    curve((39,33),(39,37),(36,40),(31,40))
    points.extend([(27,40),(27,14)])
    d.polygon([(round(x*scale),round(y*scale)) for x,y in points],fill='#f3eee4')
    d.ellipse((45*scale,43*scale,53*scale,51*scale),fill='#b5cc8e')
    return im.resize((size,size),Image.Resampling.LANCZOS)

root=Path('public')
for name,size in [('favicon-96.png',96),('apple-touch-icon.png',180),('brand/bytelabs-icon-512.png',512)]:
    icon(size).save(root/name)
im=Image.new('RGB',(1200,630),'#f3eee4'); d=ImageDraw.Draw(im)
d.rounded_rectangle((760,-130,1370,770),radius=270,fill='#dfe5d1')
im.paste(icon(96),(76,72))
regular='C:/Windows/Fonts/segoeui.ttf'; bold='C:/Windows/Fonts/segoeuib.ttf'
d.text((192,76),'bytelabs.',font=ImageFont.truetype(bold,65),fill='#203e31')
d.text((76,244),'Websites. Software.',font=ImageFont.truetype(bold,66),fill='#203e31')
d.text((76,327),'Crafted for impact.',font=ImageFont.truetype(regular,58),fill='#647950')
d.text((80,498),'Independent studio founded by Omkar Joshi',font=ImageFont.truetype(regular,29),fill='#203e31')
im.save(root/'brand/bytelabs-social.png')
print('Created four search and sharing assets.')
