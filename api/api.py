from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import json

# Initialize Flask app, you can also use a config file:
#   Remove SQLAlchemy track modification warning.
#   Add database URI with this format : mysql://username:password@server:port/database
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@server:port/database'
db = SQLAlchemy(app)

from models import Map

# This is the router of your API, add all the routes you need.
# Your routes must start with '/api', it allows the proxy to know which port to use.

# The post route:
#   Need an email properties in the header and the json map in the body.
#   It will create a new entry in the database if the email does not already exist.
#   Otherwise it will modify the map of the existing row in the database.
@app.route('/api/map', methods=['POST'])
def save_map():
    map = Map.query.filter_by(email=request.headers['email']).first()
    if (map == None): 
        new_saved_map = Map(email=request.headers['email'], saved_map=json.loads(request.data))
        db.session.add(new_saved_map)
    else:
        map.saved_map = json.loads(request.data)
    db.session.commit()
    return {'success': True}

# The get route:
#   Query the requested item and returns it.
#   If the item does not exist, it returns success: False
@app.route('/api/map', methods=['GET'])
def load_map():
    saved_map = Map.query.filter_by(email=request.args['email']).first()
    if saved_map == None:
        return {'success': False}
    return {'success': True, 'saved_map': saved_map.saved_map}