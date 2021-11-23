from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from api.v1.auth import auth_v1
from dotenv import load_dotenv
import os
from lib.database import mongodb

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get("DATABASE")
mongodb.init_app(app)

app.register_blueprint(auth_v1)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")

