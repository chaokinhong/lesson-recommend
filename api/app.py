from flask import Flask,request,jsonify,session
from flask_cors import CORS
from engine import engine,prep_data
from flask_bcrypt import Bcrypt
from flask_session import Session
from models import db, User,Rating,Marks
from config import ApplicationConfig
from enginehii import recom_engine
import numpy as np


app = Flask(__name__)

app.config.from_object(ApplicationConfig)

# set up session(server-side session), so the session in flask will always be store in the server side
server_session = Session(app)

#set up password hash
bcrypt = Bcrypt(app)

# solve block by CORS
CORS(app,supports_credentials=True)

# init the application instance with db
db.init_app(app)

# create a new app context
with app.app_context():
    db.create_all()


@app.route('/recom', methods=['GET','POST'])
def get_data():
    if request.method == 'POST':
        body = request.json['body']
        recom = engine(body[1])
        return {'data':recom}


# return info about current login user
@app.route('/@me')
def get_current_user(): 
    # if have invalid session will return none
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error':'Unauthorized'}),401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        'id':user.id,
        'username':user.username
    })



@app.route('/rating',methods=['POST'])
def post_rating():
    user_id = session.get('user_id')
    prik = request.json['prik']
    lesson_id = request.json['lesson_id']
    rating = request.json['rating']
    

    rating_exist = Rating.query.filter(Rating.id == user_id).filter(Rating.lesson_id == lesson_id).first()
    app.logger.info(rating_exist)

    if rating_exist is not None:
        db.session.delete(rating_exist)
        db.session.commit()
    

    new_rating = Rating(prik=prik,id=user_id,rating=rating,lesson_id=lesson_id)

    db.session.add(new_rating)
    db.session.commit()
    return jsonify({
        'id':new_rating.id,
        'lesson_id':new_rating.lesson_id,
        'rating':new_rating.rating
    })

@app.route('/post_mark',methods=['POST'])
def post_mark():
    user_id = session.get('user_id')
    prik = request.json['prik']
    lesson_id = request.json['lesson_id']
    marks = request.json['mark']
    mark_exist = Marks.query.filter(Marks.id == user_id).filter(Marks.lesson_id == lesson_id).first()
    if mark_exist is not None:
        db.session.delete(mark_exist)
        db.session.commit()
    

    new_marks = Marks(prik=prik,id=user_id,marks=marks,lesson_id=lesson_id)

    db.session.add(new_marks)
    db.session.commit()
    return jsonify({
        'id':new_marks.id,
        'lesson_id':new_marks.lesson_id,
        'marks':new_marks.rating
    })

@app.route('/get_marks')
def get_marks():
    user_id = session.get('user_id')
    marks = Marks.query.filter(Marks.id == user_id).all()
    lessonid_store = []
    marks_store = []
    for item in marks:
        lessonid_store.append(item.lesson_id)
        marks_store.append(item.rating)

    return jsonify({
      'key':lessonid_store,
      'value':marks_store
    })




@app.route('/get_rating')
def get_rating():
    user_id = session.get('user_id')
    rating = Rating.query.filter(Rating.id == user_id).all()
    lessonid_store = []
    rating_store = []
    for item in rating:
        lessonid_store.append(item.lesson_id)
        rating_store.append(item.rating)

    return jsonify({
      'key':lessonid_store,
      'value':rating_store
    })


@app.route('/recom_by_user')
def recom_by_user():
    user_id = session.get('user_id')
    rating = Rating.query.filter(Rating.id == user_id).all()
    lessonid_store = []
    rating_store = []
    for item in rating:
        lessonid_store.append(item.lesson_id)
        rating_store.append(item.rating)
    rating_dict = dict(zip(lessonid_store,rating_store))
    arr = np.zeros(57)
    for index,value in enumerate(arr):
        for item in rating_dict.items():
            if item[0]== index:
                arr[index] = item[1]
    
    top_n_lesson = recom_engine(arr,6)
    return jsonify({
        'lessons':top_n_lesson
    })
    
    
    

@app.route('/register',methods=["POST"])
def register_user():
    username = request.json["username"]
    password = request.json["password"]
    
    # return true if have an existing user
    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        # status code 409: conflict
        return jsonify({'error':'User already exists'}),409 
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session['user_id'] = new_user.id

    return jsonify({
        'id': new_user.id,
        'username': new_user.username
    })
    

@app.route('/login', methods=["POST"])
def login_user():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()

    # no user in sql
    if user is None:
        return jsonify({'error':'Unauthorized'}),401

    # is password check is wrong, wrong password
    if not bcrypt.check_password_hash(user.password,password):
        return jsonify({'error':'Unauthorized'}),401
    
    #if actually get successful login, server has no way to keep the login session alive,
    # so need to return a cookie to client (server side sessions)
    # store the data inside the session
    # user_id: uuid
    session['user_id'] = user.id

    return jsonify({
        'id': user.id,
        'username':user.username
    })

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id')
    return '200'
    
@app.route('/lesson',methods=['GET'])
def lesson():
    lesson_features_mat,lesson_name, title_df_data,df = prep_data()
    return jsonify({'lessons':lesson_name})


if __name__ == "__main__":
    app.run(debug=True)
