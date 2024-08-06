#Add a Flask-SQLAlchemy model class
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import  Column, Integer, Text, TIMESTAMP
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    emails   = db.relationship('Email', backref='user', cascade="all, delete-orphan", lazy=True)

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

class Categories(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    category    = db.Column(db.String(80), unique=True, nullable=False)
    recipes     = db.relationship('Recipes', backref='cat_br_rec', cascade="all, delete-orphan", lazy=True)

class Recipes(db.Model):
    id              = db.Column(db.Integer, primary_key=True)
    recipe          = db.Column(db.String(80), unique=True, nullable=False)
    category_id     = db.Column(db.Integer, db.ForeignKey('categories.id',ondelete='CASCADE'), nullable=False)
    instructions    = db.relationship('Instructions', backref='rec_br_ins', uselist=False, cascade="all, delete-orphan", lazy=True)
    ingredients     = db.relationship('Ingredients', backref='rec_br_ing', cascade="all, delete-orphan", lazy=True)

class Instructions(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    instruction = db.Column(db.String(250), nullable=False)
    receipe_id  = db.Column(db.Integer, db.ForeignKey('recipes.id',ondelete='CASCADE'), unique=True, nullable=False)

class Ingredients(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    ingredient  = db.Column(db.String(150), nullable=False)
    measure     = db.Column(db.String(150), nullable=False)
    receipe_id  = db.Column(db.Integer, db.ForeignKey('recipes.id',ondelete='CASCADE'), nullable=False)

    

