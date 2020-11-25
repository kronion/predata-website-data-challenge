import json
import os

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

from .app import app

from .models import Website, db, Tag


@app.route("/website", methods=["POST"])
def create_website():
    """
    Creates a website from the POST data.

    Returns:
        The created website.
    """
    website_data = request.json
    url = request.form.get("url")
    tag_ids = request.args.get("tags", [])
    tags = db.session.query(Tag).filter(Tag.id.in_(tag_ids)).all()
    website = Website(url=url, tags=tags)
    db.session.add(website)
    db.session.commit()
    return jsonify(website)


@app.route("/website/<id>")
def get_website(id):
    """
    Retrieves a website.

    Args:
        id: The id for a website.

    Returns:
        The website.
    """
    return jsonify(Website.query.get(id))


@app.route("/websites")
def list_website():
    """
    Get all websites filtered by the query params.

    Params:
        tags: comma separated list of tag names to filter websites by.

    Returns:
        All filtered websites.
    """
    # TODO: implement
    pass


@app.route("/tag", methods=["POST"])
def create_tag():
    """
    Creates a tag from the POST data.

    Returns:
        The created tag.
    """
    # TODO: implement
    pass


@app.route("/tag/<id>")
def get_tag(id):
    """
    Retrieves a tag.

    Args:
        id: The id for the tag.

    Returns:
        The tag.
    """
    # TODO: implement
    pass


@app.route("/tags")
def list_tags():
    """
    Get all tags.

    Returns:
        All tags.
    """
    # TODO: implement
    pass


@app.route("/website/<website_id>/tag/<tag_id>", methods=["PUT"])
def add_tag_to_website(website_id, tag_id):
    """
    Associates a tag with a website.

    Args:
        website_id: The website to add the tag to.
        tag_id: The tag to be added to the website

    Returns:
        The updated website.

    """
    # TODO: implement
    pass


@app.route("/health")
def health():
    return "OK"
