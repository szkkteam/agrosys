#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app, url_for
from flask_security import current_user
from sqlalchemy import and_

# Internal package imports
from backend.api import ModelResource, ALL_METHODS
from backend.security.decorators import auth_required_same_user
from backend.security.models import User
from backend.extensions.api import api
from backend.extensions import db

from ..models import Farm, Farmer, Field, FarmerFarm
from .blueprint import farm_management


from backend.security.models import UserRole

def get_farms_details(user_id, farm_id=None):
    t = db.session.query(Farmer.id, Farmer.is_owner).filter(Farmer.user_id == user_id).subquery()
    query = db.session.query(Farm, t.c.is_owner).join(FarmerFarm, (FarmerFarm.farm_id == Farm.id)
            ).join(t, (t.c.id == FarmerFarm.farmer_id))
    if farm_id:
        print("Farm id: ", farm_id)
        print("Original query: ", query.all())
        result, is_owner = query.filter(Farm.id == farm_id).first()
        return dict(
            id=result.id,
            name=result.name,
            owner=is_owner)
    else:
        result = query.all()
        return [ { 'id': row.id, 'name': row.name, 'owner': is_owner, 'url': url_for('api.farm_resource', id=user_id, farm_id=row.id, _external=True) } for row, is_owner in result  ]

@api.model_resource(farm_management, Farm, '/user/<int:id>/farms', '/user/<int:id>/farms/<int:farm_id>')
class FarmResource(ModelResource):
    include_methods = ALL_METHODS
    method_decorators = (auth_required_same_user,)

    def create(self, farm, errors):
        if errors:
            return self.errors(errors)
        farmer = Farmer.get_or_create_owner(user=current_user)
        # Add the farm to the farmer instance
        farmer.farms.append(farm)
        # Add the farmer to the session
        farmer.save()
        return self.created(farm)

    def get(self, id, farm):
        #res = Farmer.query.filter(Farmer.user_id == id
        #res = Farm.query.join(FarmerFarm, FarmerFarm.farm_id == farm.id).all()
        #res = UserRole.query.all()
        #print("Query result: ", res)
        return self.serializer.dump({
            ** get_farms_details(id, farm.id),
            'fields': Field.filter_by(farm=farm).all()
        })

    def list(self, id):
        return get_farms_details(current_user.id)


