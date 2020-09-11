from flask import Blueprint, render_template

ttheta_scan_bp = Blueprint("ttheta_scan", __name__, static_folder="static",
                           template_folder="templates")


@ttheta_scan_bp.route("/twotheta_scan")
def twotheta_scan():
    return render_template("twotheta_scan.html")
