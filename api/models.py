from flask_sqlalchemy import SQLAlchemy
from uuid import uuid1, uuid4

# create db instance
db = SQLAlchemy()

# uuid= universally unique identifier: 128位全局唯一標識符
def get_uuid():
    return uuid4().hex

def get_xxid():
    return uuid1().hex

# here is the database table
class User(db.Model):
    __tablename__ = "users"
    #the id should be 32 characters long
    # if we don't provide the value, the value will be the default value
    id = db.Column(db.String(32),primary_key=True,unique=True,default=get_uuid())
    # email should be the longest string: 345 character long
    username = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text,nullable=False)

class Rating(db.Model):
    __tablename__ = 'rating'
    prik = db.Column(db.String(32),primary_key=True,unique=True)
    id = db.Column(db.String(32))
    rating = db.Column(db.Integer())
    lesson_id = db.Column(db.Integer())

class Marks(db.Model):
    __tablename__ = 'mark'
    prik = db.Column(db.String(32),primary_key=True,unique=True)
    id = db.Column(db.String(32))
    marks = db.Column(db.Integer())
    lesson_id = db.Column(db.Integer())