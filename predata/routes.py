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
    q = Website.query
    # TODO: check with mgmt whether no "tags" param implies all or none
    if tag_names_csv := request.args.get("tags"):
        tag_names = tag_names_csv.split(",")
        tags = Tag.query.filter(Tag.name.in_(tag_names)).all()
        # FIXME: there's probably a more idiomatic way to do this with SQLAlchemy
        # but the obvious way results with a "in_() not yet supported for relationships"
        tag_ids = [tag.id for tag in tags]
        q = q.filter(Website.tags.any(Tag.id.in_(tag_ids)))
    # FIXME: probably gonna need pagination at some point...
    return jsonify(q.all())


@app.route("/tag", methods=["POST"])
def create_tag():
    """
    Creates a tag from the POST data.

    Returns:
        The created tag.
    """
    name = request.form.get("name")
    tag = Tag(name=name)
    db.session.add(tag)
    db.session.commit()
    # FIXME: ensure this returns HTTP 201
    return jsonify(tag)


@app.route("/tag/<id>")
def get_tag(id):
    """
    Retrieves a tag.

    Args:
        id: The id for the tag.

    Returns:
        The tag.
    """
    return jsonify(Tag.query.get(id))


@app.route("/tags")
def list_tags():
    """
    Get all tags.

    Returns:
        All tags.
    """
    # FIXME: pagination (see list_website above)
    return jsonify(Tag.query.all())


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
    website = Website.query.get(website_id)
    tag = Tag.query.get(tag_id)
    # TODO: avoid race condition? off the top of my head I'm not sure what SQLAlchemy
    # will do if multiple threads try to add different tags to the same website
    # simultaneously (Probably premature optimization for now though lol)
    website.tags.append(tag)
    db.session.add(website)
    db.session.commit()
    return jsonify(website)


@app.route("/health")
def health():
    return "OK"
