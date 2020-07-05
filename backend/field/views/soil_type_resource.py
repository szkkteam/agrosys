#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app, url_for, request, abort
from flask_security import current_user
from sqlalchemy import desc
from sqlalchemy import and_
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.farm_management.models import Farm
from backend.extensions import db

from ..models import SoilType
from .blueprint import field as field_bp


@api.model_resource(field_bp, SoilType, '/soils', '/soils/<int:id>')
class SoilTypeResource(ModelResource):
    include_methods = (GET, LIST, )




