#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.app import create_app
# we import this here so celery can access it for its startup
from backend.extensions.celery import celery

app = create_app()