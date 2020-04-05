#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os

# Pip package imports
import click
import flask_s3
from flask.cli import with_appcontext
from flask import current_app
# Internal package imports

@click.group()
def s3():
    """Upload assets to Amazon S3"""
    pass

@s3.command()
@with_appcontext
def upload():
    flask_s3.create_all(current_app, filepath_filter_regex=r'build|fonts|admin|img')
