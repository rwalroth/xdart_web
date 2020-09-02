from flask import Blueprint, render_template

bp = Blueprint(name=__name__, import_name="bp", template_folder="templates")


@bp.route("/")
def home():
    return render_template("index.html")
