import os


class Config():
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    SECRET_KEY = "thisisthesecretkeyforxdartCHANGETHISINPRODUCTION"  # This needs to be changed for production!!
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_COOKIE_HTTPONLY = True
