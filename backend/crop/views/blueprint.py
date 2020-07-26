#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import Blueprint

# Internal package imports

crop = Blueprint('crop', __name__, url_prefix='/crops', template_folder='templates')