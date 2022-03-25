from api import db

# Class Map:
#   It is used to create the table in the database.
#   The table has 3 fields: id, email (but just used as a string here), saved_map (as a Json)
class Map(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(30), nullable=False)
    saved_map = db.Column(db.JSON, nullable=False)