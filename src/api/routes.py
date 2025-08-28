"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Workout
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



def requestValues(body,keys):
    for key in keys:
        if key not in body:
            raise APIException(f"{key} is not in body", status_code=400)
        
    return tuple(body.get(key) for key in keys )

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello(): 

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

"""
This section is for User Endpoint
"""
@api.route('/user', methods=["GET"])
def get_users():
    users_list = User.query.all()
    
    return jsonify([
        user.serialize() for user in users_list
    ]), 200

@api.route('/user', methods=["POST"])
def create_user():
    body = request.get_json()

    name, email, password = requestValues(body, ["name","email","password"])
    
    try:
        new_user = User(name=name,email=email,password=password)
        new_user.save_user()
    except:
        return jsonify({"msg": "Something went wrong while adding to DB"}), 500

    

    return jsonify(new_user.serialize()), 201
    

@api.route('/user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user_by_id = User.query.get(id)
    if not user_by_id:
        return jsonify({"msg": f"The user that you are looking with the id:{id} is not on the DB"}), 404

    return jsonify(user_by_id.serialize()), 200   

@api.route('/user', methods=["DELETE"])
def delete_user(id):
    user_id = User.query.get(id)
    db.session.delete(user_id)
    db.session.commit()

"""
This section is for Workout Endpoint
"""
@api.route('/workout', methods=["POST"])
def update_workout():
    body = request.get_json()

    name, section, machine, link, media = requestValues(body, ["name", "section", "machine", "link", "media"])

    if not name or not section or not machine:
        return jsonify({ "msg": "Error information is missing" }), 400

    new_workout= Workout(name=name, section = section, machine  = machine, link = link, media = media )
    new_workout.update_workout()

    return jsonify(new_workout.serialize()), 201

@api.route('/workout', methods=["GET"])
def get_workouts():
    workouts_list = Workout.query.all()    
      
    return jsonify(
        [workout.serialize() for workout in workouts_list]
    ), 201