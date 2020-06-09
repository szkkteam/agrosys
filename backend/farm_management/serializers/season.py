#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer
from backend.api import fields, ValidationError

from ..models import Season

SEASON_FIELDS = (
    'id',
    'title',
    'start_date',
    'end_date'
)

class SeasonSerializer(ModelSerializer):

    # TODO: Implement a "copy_fields_from" function field, which is 'load_only' and returns with the fields from a different season.
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)

    copy_fields = fields.Boolean()
    copy_from_season_id = fields.Integer()

    class Meta:
        model = Season
        fields = SEASON_FIELDS + ('copy_fields', 'copy_from_season_id')
        dump_only = ('id',)
        load_instance = False

    @pre_load(pass_many=False)
    def validate_copy_from_season(self, data, **kwargs):
        if 'copy_fields' in data and data['copy_fields']:
            if 'copy_from_season_id' not in data:
                raise ValidationError('Source season ID is not defined.', 'copy_from_season_id')
        return data


@api.serializer(many=True)
class SeasonListSerializer(ModelSerializer):

    #url = m_fields.Url(relative=False)

    class Meta:
        model = Season
        fields = SEASON_FIELDS
        dump_only = ('id',)
