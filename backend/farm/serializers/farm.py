#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, ValidationError
from backend.api import fields

from backend.reference.models import Country
from ..models import Farm

DATA_FIELDS = (
    'id',
    'title',
    'role',
    'country_id',
    'country',
    'seasons',
)

FARM_PERMISSION_FIELDS = (
    'is_owner', 'permissions'
)

def object_id_exists(object_id, model):
    print("Country id: ", object_id)
    if not model.get_by(id=object_id):
        print("Countries: ", Country.all())
        raise ValidationError('ID %i does not exist.' % (object_id))

class FarmSerializer(ModelSerializer):

    role = fields.Nested('FarmPermissionSerializer', many=False)

    country_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, Country))
    country = fields.Nested('CountrySerializer', many=False)

    seasons = fields.Nested('SeasonListSerializer', many=True)

    class Meta:
        model = Farm
        fields = DATA_FIELDS
        dump_only = ('id', 'role', 'country',)
        load_only = ('country_id', )

@api.serializer(many=True)
class FarmListSerializer(FarmSerializer):

    class Meta:
        model = Farm
        fields = DATA_FIELDS
        dump_only = ('id', 'role', 'country',)
        load_only = ('country_id', )


class FarmPermissionSerializer(ModelSerializer):

    class Meta:
        model = Farm
        fields = FARM_PERMISSION_FIELDS
        #dump_only = ('owner',)
