#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import Blueprint

# Internal package imports

reference = Blueprint('reference', __name__, url_prefix='/refs', template_folder='templates')