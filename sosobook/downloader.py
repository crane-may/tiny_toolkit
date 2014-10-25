# -*- coding: utf-8 -*-
# sudo easy_install threadpool
import urllib, urllib2, json, os, threadpool

def ununicode(obj):
  if isinstance(obj, list):
    return [ununicode(i) for i in obj]
    
  elif isinstance(obj, dict):
    newobj = {}
    for k, v in obj.items():
      newobj[ununicode(k)] = ununicode(v)
    return newobj
    
  elif isinstance(obj, unicode):
    return obj.encode("utf8")
  else:
    return obj

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

def downloadtask(up):
  url, path = up
  urllib.urlretrieve(url, path)
  return url

def downloadtask_callback(request, result):
    print result

html = httpget('http://m.sosobook.cn/cs/detail.php?mid=3416')
detail = ununicode(json.loads(html[html.find("{"):]))

bootroot = detail["name"]
print bootroot

if not os.path.exists(bootroot):
  os.mkdir(bootroot)

pool = threadpool.ThreadPool(5) 
for chap in detail['links']:
  chaproot = ""
  if chap["title"] != "":
    chaproot += chap["title"]
  else:
    chaproot += chap["idx"]
    
  if chap["type"] == "0":
    chaproot += "_Eps"
  elif chap["type"] == "1":
    chaproot += "_Vol"
  
  if chaproot == "":
    chaproot = "unknow_"+chap["cid"]
  
  if not os.path.exists(bootroot+os.sep+chaproot):
    os.mkdir(bootroot+os.sep+chaproot)
  
  print "-"*20, chaproot
  
  cid = chap["cid"]
  page = 1
  pics = []
  
  while True:
    html = httpget("http://m.sosobook.cn/cs/manga.php?mid=3416&cid=%s&page=%d"%(cid, page))
    c = ununicode(json.loads(html[html.find("{"):]))
    page += 1
    pics += c["pics"]
    if c["next"] == 0:
      break
  
  tsk = []
  for p in pics:
    imgpath = bootroot+os.sep+chaproot+os.sep+p
    imgurl = "http://c-r2.sosobook.cn/pics/3416/%s/%s"%(cid,p)
    if not os.path.exists(imgpath):
      tsk.append([imgurl, imgpath])
  
  requests = threadpool.makeRequests(downloadtask, tsk, downloadtask_callback)
  [pool.putRequest(req) for req in requests]
  pool.wait()
  
  
# http://c-r2.sosobook.cn/pics/3416/131073/c0001.jpg