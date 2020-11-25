from dataclasses import dataclass
from typing import List
import json

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

from .app import app

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../website.db"
db = SQLAlchemy(app)

website_to_tags = db.Table(
    "website_to_tag",
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id")),
    db.Column("website_id", db.Integer, db.ForeignKey("websites.id")),
)


@dataclass
class Tag(db.Model):
    __tablename__ = "tags"
    id: int
    name: str

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)


@dataclass
class View:
    count: int
    date: str


@dataclass
class Website(db.Model):
    __tablename__ = "websites"
    id: int
    url: str
    tags: List[Tag]
    website_views: List[View]

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, unique=True, nullable=False)
    tags = db.relationship(
        "Tag",
        secondary=website_to_tags,
        lazy="subquery",
        backref=db.backref("websites", lazy=True),
    )
    views = db.Column(db.LargeBinary, nullable=True)

    @property
    def website_views(self):
        if self.views:
            return json.loads(self.views.decode())
        else:
            return []
