import datetime
from functools import wraps

from flask import request, redirect, jsonify, session, render_template
import jwt
from .config import Config
from .models import User


def validate_token(token):
    try:
        data = jwt.decode(token, key=Config.SECRET_KEY)
        user = User.query.filter_by(username=data["sub"]).first()
        if not user:
            raise KeyError
        return user
    except Exception as e:
        print(e)
        return None


def token_required(f):
    @wraps(f)
    def check_token(*args, **kwargs):
        token = session['token']
        if token is None:
            return render_template("403.html", message="Invalid token")
        user = validate_token(token)
        if user is not None:
            return f(*args, **kwargs)
        else:
            return render_template("403.html", message="Invalid token")
    return check_token


def roles_required(roles, need_all=True):
    def roles_decorator(f):
        @wraps(f)
        def roles_wrapper(*args, **kwargs):
            token = session['token']
            user = validate_token(token)
            if user is not None:
                userRoles = user.rolenames
                valid = [role in userRoles for role in roles]
                if (need_all and all(valid)) or (not need_all and any(valid)):
                    return f(*args, **kwargs)
            return render_template("403.html", message="User not authorized for this action"), 403
        return roles_wrapper
    return roles_decorator


def schedule_required(beamline):
    def schedule_decorator(f):
        @wraps(f)
        def schedule_wrapper(*args, **kwargs):
            user = validate_token(session["token"])
            if user is not None:
                now = datetime.datetime.utcnow()
                userSchedules = user.schedules
                for schedule in userSchedules:
                    if (schedule.beamline == beamline and
                            (schedule.start_date < now < schedule.end_date)):
                        return f(*args, **kwargs)
                return render_template(
                    "403.html", message="User not scheduled for this beamline"
                ), 403
            return render_template("403.html", message="User not authorized for this action"), 403
        return schedule_wrapper
    return schedule_decorator

