# -*- coding: utf-8 -*-
#sudo easy_install reportlab

import os, sys
from reportlab.lib.pagesizes import A4, landscape, portrait
from reportlab.pdfgen import canvas

if len(sys.argv) != 2 or not os.path.exists(sys.argv[1]):
  print "usage:", sys.argv[0], " <img_root>"
  exit(0)

bookroot = sys.argv[1]
chaproots = list(os.listdir(bookroot))

for chap in chaproots:
  pdfpath = bookroot+os.sep+chap+'.pdf'
  imgs = list(os.listdir(bookroot+os.sep+chap))
  print pdfpath, len(imgs)
  
  (w, h) = portrait(A4)
  c = canvas.Canvas(pdfpath, pagesize = portrait(A4))
  for img in imgs:
    c.drawImage(bookroot+os.sep+chap+os.sep+img, 0, 0, w, h, preserveAspectRatio=True)
    c.showPage()
  
  c.save()