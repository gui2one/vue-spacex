import shapefile
import json
import bson
sf = shapefile.Reader("../public/world.dbf")

print(sf)

json_data = {}
# print(sf.shapes())

# print(dir(sf.shapes()[0].parts))
points = []
for shp in sf.shapes():
    points.append(shp.points)

json_data["Shapes"] = points
# print(json_data)
with open("output.json", "w") as f:
    f.write(json.dumps(json_data))


