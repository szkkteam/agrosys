#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import Blueprint

# Internal package imports

crop = Blueprint('crop', __name__, url_prefix='/crops', template_folder='templates')
farm = Blueprint('farm', __name__, template_folder='templates')
parcel = Blueprint('parcel', __name__, template_folder='templates')
production = Blueprint('production', __name__, template_folder='templates')