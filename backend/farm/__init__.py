#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.magic import Bundle

farm_bundle = Bundle(__name__, blueprint_names=['crop', 'farm', 'field', 'production'])