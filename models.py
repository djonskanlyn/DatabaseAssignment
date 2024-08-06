#Add a Flask-SQLAlchemy model class
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import  Column, Integer, Text, TIMESTAMP
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    emails   = db.relationship('Email', backref='user', cascade="all, delete-orphan",lazy=True)

class Email(db.Model):
    id      = db.Column(db.Integer, primary_key=True)
    email   = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id',ondelete='CASCADE'),  nullable=False)

class Bmrdata(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    gender   = db.Column(db.String(10), nullable=False)
    age      = db.Column(db.Integer, nullable=False)
    height   = db.Column(db.Integer, nullable=False)
    weight   = db.Column(db.Integer, nullable=False)

class Registrations(db.Model):
    id           = db.Column(db.Integer, primary_key=True)
    username_reg = db.Column(db.String(80), nullable=False)
    email_reg    = db.Column(db.String(120), nullable=False)
    password_reg = db.Column(db.Text, nullable=False)
    

