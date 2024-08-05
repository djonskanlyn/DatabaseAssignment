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

