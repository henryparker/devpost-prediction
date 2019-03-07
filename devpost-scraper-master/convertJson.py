import csv
import json

data = json.load(open("./data.json"))

f = csv.writer(open("test.csv","w+"))

f.writerow(["Title", "ShortPitch", "Description", "Tag", "Win"])

for dat in data:
    f.writerow([dat["name"],dat["tagline"],dat["description"],dat["tags"],1 if dat["winner"] else 0])

