from functools import wraps

from flask import Blueprint, render_template, request, jsonify, redirect, session
from .models import User
from .security import token_required, roles_required, validate_token, schedule_required
from .config import Config
from .extensions import bcrypt
import jwt
import datetime

bp = Blueprint(name=__name__, import_name="bp", template_folder="templates")


@bp.route("/")
def home():
    return render_template("index.html")


@bp.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    else:
        user = User.query.filter_by(username=request.form["accountId"]).first()
        if not user:
            user = User.query.filter_by(email=request.form["accountId"]).first()
        if user and bcrypt.check_password_hash(user.password, request.form["password"]):
            token = jwt.encode({
                "sub": user.username,
                "iat": datetime.datetime.utcnow(),
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
            }, Config.SECRET_KEY)
            session['token'] = token.decode()
            return jsonify({"message": "login successful"})
        return jsonify({"message": "User or email invalid"})


@bp.route("/logout")
def logout():
    session['token'] = None
    return redirect("/")


@bp.route("/protected", methods=["GET", "POST"])
@token_required
@roles_required(["external_user", "admin"], False)
def protected():
    return jsonify({"message": "token accepted"})

@bp.route("/get_user_schedules", methods=["POST"])
@token_required
def get_user_schedules():
    user = validate_token(session['token'])
    if user is None:
        return jsonify({"message": "No schedules found"})

    schedules = user.schedules
    jschedules = []
    now = datetime.datetime.utcnow()
    for schedule in schedules:
        if schedule.start_date < now < schedule.end_date:
            jschedules.append(schedule.to_dict())
    return jsonify({"message": "valid token", "schedules": jschedules})


@bp.route("/bl2-1")
@token_required
@schedule_required("2-1")
def bl2_1():
    return render_template("bl2_1.html")
