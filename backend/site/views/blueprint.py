#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import Blueprint

# Internal package imports

site = Blueprint('site', __name__, template_folder='../../../static')