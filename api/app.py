import time
from flask import Flask,request
from flask_cors import CORS, cross_origin
from engine import engine


app = Flask(__name__)

CORS(app,supports_credentials=True)
@cross_origin(origin='*')
@app.route('/recom', methods=['GET','POST'])

def get_data():
    if request.method == 'POST':
        body = request.json['body']
        recom = engine(body[1])
        return {'data':recom}


