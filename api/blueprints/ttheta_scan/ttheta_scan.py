import os

from flask import Blueprint, render_template, jsonify, request

ttheta_scan_bp = Blueprint("ttheta_scan", __name__, static_folder="static",
                           template_folder="templates")


@ttheta_scan_bp.route("/")
def twotheta_scan():
    return render_template("twotheta_scan.html")


@ttheta_scan_bp.route("/get_directory_list", methods=["POST"])
def get_directory_list():
    directory = request.get_json().get("directory", None)
    files = []
    subdirs = []
    path = None
    if directory is not None:
        if os.path.isdir(directory):
            for p in os.listdir(directory):
                if p.split('.')[-1] in ["h5", "hdf5"]:
                    files.append(p)
                elif os.path.isdir(os.path.join(directory, p)):
                    subdirs.append(p)
    return jsonify({
        "Path": path,
        "Files": files,
        "Subdirs": subdirs
    })
