import Image, re, os, time, glob, sys, datetime
from ExifTags import TAGS

last_value = None
def get_date(fn):
    global last_value
    im = Image.open(fn)
    if hasattr(im, '_getexif'):
        exifdata = im._getexif()
        for tag, value in exifdata.items():
            decoded = TAGS.get(tag, tag)
            if decoded == "DateTime":
                last_value = value
                return value
            print decoded, value
            
    return last_value
    raise Exception("not DateTime")

def new_path(fn):
    d = get_date(fn)
    
    assert re.match("^\d+:\d+:\d+ \d+:\d+:\d+$", d), "unkown exif date"
    path = d.split(" ")[0].split(":")[:2]
    pp = "-".join(path)
    return pp

# print new_path("DSC_2241.JPG")

if len(sys.argv) != 3:
    print "usage: python picture_sorter.py {src} {dst}"
    exit(0)

for fn in glob.glob(sys.argv[1]):
    pp = new_path(fn)
    dstp = os.sep.join([sys.argv[2], pp])
    print fn, "->", dstp
    if not os.path.exists(dstp):
        os.makedirs(dstp)
    
    with open(dstp+os.sep+fn.split(os.sep)[-1], "w") as fin:
        with open(fn) as fout:
            fin.write(fout.read())