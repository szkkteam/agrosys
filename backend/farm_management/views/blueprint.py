#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import Blueprint

# Internal package imports

farm_management = Blueprint('farm_management', __name__, url_prefix='/farm', template_folder='templates')