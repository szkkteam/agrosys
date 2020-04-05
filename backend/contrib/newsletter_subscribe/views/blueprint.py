#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import Blueprint

# Internal package imports

newsletter_subscribe = Blueprint('newsletter_subscribe', __name__, template_folder='templates')