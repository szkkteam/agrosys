#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, ValidationError
from backend.api import fields

from backend.reference.models import Region
from ..models import Farm

DATA_FIELDS = (
    'id',
    'title',
    'role',
    'region_id',
    'region',
    'seasons',
)

FARM_PERMISSION_FIELDS = (
    'is_owner', 'permissions'
)

def object_id_exists(object_id, model):
    if not model.get_by(id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

class FarmSerializer(ModelSerializer):

    role = fields.Nested('FarmPermissionSerializer', many=False)

    region_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, Region))
    region = fields.Nested('RegionSerializer', many=False)

    seasons = fields.Nested('SeasonListSerializer', many=True, only=('id', 'title'))

    class Meta:
        model = Farm
        fields = DATA_FIELDS
        dump_only = ('id', 'role', 'region',)
        load_only = ('region_id', )

@api.serializer(many=True)
class FarmListSerializer(FarmSerializer):

    class Meta:
        model = Farm
        fields = DATA_FIELDS
        dump_only = ('id', 'role', 'region',)
        load_only = ('region_id', )


class FarmPermissionSerializer(ModelSerializer):

    class Meta:
        model = Farm
        fields = FARM_PERMISSION_FIELDS
        #dump_only = ('owner',)
