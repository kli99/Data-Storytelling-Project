from flask import Flask, render_template, redirect
from flask import jsonify
from datetime import datetime as dt, datetime
from datetime import timedelta
from flask_pymongo import PyMongo

app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/restaurants_db")


# Route to render index.html template using data from Mongo
@app.route("/")
def index():

    # Find one record of data from the mongo database
    # data = mongo.db.data.find()

    # Return template and data
    return render_template("index.html")


# Route that will trigger the scrape function by import scrape_mars
@app.route("/data")
def data():

    dataset = mongo.db.restaurants.find()

 # name a list for restaurants return data
    dataRes=[]

#     # loop date as column and prcp as values
    for restaurant in dataset:
        newlist= {}
        for k,v in restaurant.items():
            #create a dict to call and append the list with the dict            
            if(k != '_id'):
                newlist[k]= v
        dataRes.append(newlist)

# #     #Return the JSON representation of your dictionary.
    return jsonify(dataRes)

  

if __name__ == "__main__":
    app.run(debug=True)
