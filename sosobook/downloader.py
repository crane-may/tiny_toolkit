# -*- coding: utf-8 -*-

import urllib2, json

def httpget(url):
  request = urllib2.Request(url)
  request.add_header('User-Agent', 'fake-client')

  request.add_header('Host', 'm.sosobook.cn')
  request.add_header('Connection', 'keep-alive')
  request.add_header('Cache-Control', 'max-age=0')
  request.add_header('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
  request.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36')
  request.add_header('Accept-Encoding', 'deflate,sdch')
  request.add_header('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4')

  response = urllib2.urlopen(request)
  html = response.read().strip()
  
  return html

html = httpget('http://m.sosobook.cn/cs/detail.php?mid=3416')
detail = json.loads(html[html.find("{"):])
# print detail['links']

for chap in detail['links']:
  cid = chap["cid"]
  page = 1
  pics = []
  while True:
    html = httpget("http://m.sosobook.cn/cs/manga.php?mid=3416&cid=%s&page=%d"%(cid, page))
    c = json.loads(html[html.find("{"):])
    page += 1
    pics += c["pics"]
    if c["next"] == 0:
      break
  
  print pics