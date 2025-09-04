"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Workout, Routines
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token,jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


def requestValues(body, keys):
    for key in keys:
        if key not in body:
            raise APIException(f"{key} is not in body", status_code=400)

    return tuple(body.get(key) for key in keys)


def requestUser(id):
    user_by_id = User.query.get(id)
    if not user_by_id:
        return jsonify({"msg": f"The user that you are looking with the id:{id} is not on the DB"}), 404

    return user_by_id


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email:
        return jsonify({"msg": "Bad email or password"}), 400

    user = User.query.filter_by(email = email).one_or_none()

    if not user:
        return jsonify({"msg": "Bad username or password"}), 401
    
    if user.password != password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


"""
----------------------This section is for User Endpoint---------------------------------------
"""


@api.route('/user', methods=["GET"])
@jwt_required()
# decorador de jwt
def get_users():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

 

    users_list = User.query.all()
    # hacer validacion de jwt
    return jsonify([
        user.serialize() for user in users_list
    ]), 200


@api.route('/user', methods=["POST"])
def create_user():
    body = request.get_json()
    name, email, password = requestValues(body, ["name", "email", "password"])

    try:
        new_user = User(name=name, email=email, password=password)
        new_user.save_user()
    except:
        return jsonify({"msg": "Something went wrong while adding to DB"}), 500

    return jsonify(new_user.serialize()), 201


@api.route('/user/<int:id>', methods=['GET'])
# decorador jwt si solo quiero que vean x info
def get_user_by_id(id):
    user_by_id = User.query.get(id)
    if not user_by_id:
        return jsonify({"msg": f"The user that you are looking with the id:{id} is not on the DB"}), 404

    return jsonify(user_by_id.serialize()), 200


@api.route("user/<int:id>", methods=["PUT"])
def update_user(id):
    person = requestUser(id)

    body = request.get_json()
    name, email, password = requestValues(body, ["name", "email", "password"])

    if name:
        person.name = name
    if email:
        person.email = email
    if password:
        person.password = password

    db.session.commit()

    return jsonify(person.serialize()), 200


@api.route('/user/<int:id>', methods=["DELETE"])
def delete_user(id):
    user_id = User.query.get(id)
    db.session.delete(user_id)
    db.session.commit()


"""
----------------This section is for Workout Endpoint----------------------------------------
"""


@api.route('/workout', methods=["POST"])
def update_workout():
    body = request.get_json()

    name, section, machine, link, media = requestValues(
        body, ["name", "section", "machine", "link", "media"])

    if not name or not section or not machine:
        return jsonify({"msg": "Error information is missing"}), 400

    new_workout = Workout(name=name, section=section,
                          machine=machine, link=link, media=media)
    new_workout.update_workout()

    return jsonify(new_workout.serialize()), 201


@api.route('/workout', methods=["GET"])
def get_workouts():
    workouts_list = Workout.query.all()

    return jsonify(
        [workout.serialize() for workout in workouts_list]
    ), 201


@api.route("/workout/<int:id>", methods=["GET"])
def get_individual_workout(id):
    individual_workout = Workout.query.get(id)
    if not individual_workout:
        return jsonify({"msg": f"The Workout that you are looking with the id:{id} is not on the DB"}), 404

    return jsonify(individual_workout.serialize()), 200


@api.route("/workout/<int:id>", methods=["Delete"])
def delete_workout(id):
    workout_delete = Workout.query.get(id)
    db.session.delete(workout_delete)
    db.session.commit()


@api.route("/workout/<int:id>", methods=["PUT"])
def update_individual_workout(id):
    Workout_to_update = Workout.query.get(id)

    body = request.get_json()
    name, section, machine, link, media = requestValues(
        body, ["name", "section", "machine", "link", "media"])

    if name:
        Workout_to_update.name = name
    if section:
        Workout_to_update.section = section
    if machine:
        Workout_to_update.machine = machine
    if link:
        Workout_to_update.link = link
    if media:
        Workout_to_update.media = media

    db.session.commit()
    return jsonify(Workout_to_update.serialize()), 200

    """
    --------------------This Section is for Routines Endpoint--------------------
    """


@api.route("/routine", methods=["GET"])
def get_routines():
    routines_list = Routines.query.all()

    return jsonify([
        routine.serialize() for routine in routines_list
    ]), 200


"""@api.route("/routine", methods=["POST"])
def create_routines():

    body = request.get_json()
    name:
    Workout"""