from flask import Blueprint, request, jsonify
import json
from services.createUser import createUser
from lib.database import mongodb
from jwt import encode, decode
from lib.hasher import verify_password
import os

token_secret = os.environ.get('TOKEN_SECRET')

auth_v1 = Blueprint('auth_v1', __name__)
auth_v1.url_prefix = '/api/v1/auth'

@auth_v1.route('/signup', methods=['POST'])
def signup():
    params = request.get_json()

    email = params.get('email')
    password = params.get('password')
    name = params.get('name')
    surname = params.get('surname')
    birth = params.get('birth')

    user = createUser(
        name=name,
        surname=surname,
        email=email,
        password=password,
        birth=birth
    )

    return jsonify({
        'token': encode(
            {
            'name': user['name'],
            'surname': user['surname'],
            'email': user['email'],
            'birth': user['birth'],
            'password': user['password'],
            'code': str(user['code'])
        },
            token_secret,
            algorithm='HS256'
        )
    })

@auth_v1.route('/verify_email', methods=['POST'])
def verify_email():
    params = request.get_json()

    user = params.get('user')
    code = params.get('code')

    user = decode(
        user,
        token_secret,
        algorithms=['HS256']
    )

    if user['code'] == code:
        del user['code']

        # insert the user into the mongodb database and get the user
        created_user = mongodb.db.users.insert_one(user)

        return jsonify({
            'token': encode(
                {
                '_id': str(created_user.inserted_id),
                'name': user['name'],
                'surname': user['surname'],
                'email': user['email'],
                'birth': user['birth'],
                'password': user['password'],
            },
                token_secret,
                algorithm='HS256'
            )
        })



@auth_v1.route('/login', methods=['POST'])
def login():
    params = request.get_json()

    email = params.get('email')
    password = params.get('password')

    user = mongodb.db.users.find_one({'email': email})

    areThePasswordsEqual = verify_password(password, user['password'])

    if areThePasswordsEqual:
        return jsonify({
            'token': encode(
                {
                '_id': str(user['_id']),
                'name': user['name'],
                'surname': user['surname'],
                'email': user['email'],
                'birth': user['birth'],
                'password': user['password'],
            },
                token_secret,
                algorithm='HS256'
            )
        })
    else:
        return jsonify({
            'error': 'Invalid credentials'
        })

