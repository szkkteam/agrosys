#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema, ValidationError
import datetime as dt

# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer
from backend.api import fields

from ..models import Season

DATA_FIELDS = (
    'id',
    'title',
    'start_date',
    'end_date',
    'reference_parcels',
)

class SeasonSerializer(ModelSerializer):

    reference_parcels = fields.Nested('ReferenceParcelSerializer', many=True, required=False, exclude=('season', ))

    start_date = fields.AwareDateTime(default_timezone=dt.timezone.utc)
    end_date = fields.AwareDateTime(default_timezone=dt.timezone.utc)

    class Meta:
        model = Season
        fields = DATA_FIELDS
        dump_only = ('id', )


    @validates_schema
    def validate_dates(self, data, **kwargs):
        partial = kwargs.get('partial', False)
        errors = {}
        if not partial:
            if data['start_date'] > data['end_date']:
                errors["startDate"] = ["Field may be not bigger than endDate."]
            if errors:
                raise ValidationError(errors)

    def unwrap_date_field(self, data, **kwargs):
        if 'dates' in data:
            if not isinstance(data['dates'], dict):
                raise ValidationError('Dates field must be dict', 'dates')
            dates = data.pop('dates', None)
            data['startDate'] = dates['startDate']
            data['endDate'] = dates['endDate']
        elif not kwargs.get('partial', False):
            raise ValidationError('Field may not be null.', 'dates')
        return data

    def warp_date_field(self, data):
        start_date = data.pop('startDate')
        end_date = data.pop('endDate')
        data['dates'] = {
            'startDate': start_date,
            'endDate': end_date,
        }
        return data

    @pre_load(pass_many=True)
    def unwrap_date(self, data, many, **kwargs):
        print("unwrap_date: ", data)
        if isinstance(data, (list, tuple)):
            return [self.unwrap_date_field(d, **kwargs) for d in data]
        else:
            return self.unwrap_date_field(data, **kwargs)

    @post_dump(pass_many=True)
    def wrap_date(self, data, many, **kwargs):
        print("wrap_date: ", data)
        print("wrap_date many: ", many)
        print("wrap_date kwargs: ", kwargs)
        if isinstance(data, (list, tuple)):
            return [self.warp_date_field(d) for d in data]
        else:
            return self.warp_date_field(data)


@api.serializer(many=True)
class SeasonListSerializer(SeasonSerializer):

    class Meta:
        model = Season
        fields = DATA_FIELDS
        dump_only = ('id', )

