from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.resturant

# Create an instance of our Flask app.
app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# # Set route
# @app.route('/')
# def index():
#     return "please visit the api routes"

@app.route('/')
@cross_origin()
def home():
    restaurant_data = [doc for doc in db.restaurant.find({}, {'_id': False})]
    #cs_info_format = {"data": cs_info[0]}
    # print(cs_info)
    return jsonify(restaurant_data)

# @app.route('/api/CUISINE DESCRIPTION')
# @cross_origin()
# def CUISINE():
#     cs_status = [doc for doc in db.station_status.find({}, {'_id': False})]
#     cs_status_format = {"data": cs_status[0]}
#     return jsonify(cs_status_format)

if __name__ == "__main__":
    app.run(debug=True)