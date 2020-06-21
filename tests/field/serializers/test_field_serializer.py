#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.field.serializers import FieldSerializer, FieldListSerializer
from .test_field_detail_serializer import VALID_GEOJSON, INVALID_GEOJSON, compare_geojson

VALID_SOIL_TYPE = 1

VALID_INPUT_DATA = [
    ({'title': 'test field 1', 'fields': [{'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]}),
    ({'title': 'test field 2', 'fields': [{'value': None, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]}),
    ({'title': 'test field #$!"1', 'fields': [{'value': 100.999, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]}),
]

VALID_INPUT_DATA_LIST = [
    ([{'title': 'test field 11', 'fields': [{'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]},
      {'title': 'test field 12', 'fields': [{'value': 0.0,'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]}]),
    ([{'title': 'test field 21', 'fields': [{'value': None, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]},
      {'title': 'test field 22', 'fields': [{'value': None, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]},]),
    ([{'title': 'test field #$!"1-31', 'fields': [{'value': 100.999, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]},
      {'title': 'test field #$!"1-32', 'fields': [{'value': 100.999, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]}]),
]

INVALID_INPUT_DATA = [
    ({'title': None, 'fields': [{'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]}, 'Field may not be null.', 'title'),
    ({'title': 'test field 2', 'fields': None}, 'Field may not be null.', 'fields'),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'fields': [{'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]},
      {'title': None, 'fields': [{'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]},], 'Field may not be null.', 'title'),
    ([{'title': 'test field 2', 'fields': None},
      {'title': 'test field 2', 'fields': None}], 'Field may not be null.', 'fields'),
]

def get_field_data(input, soil):

    def fix_soil(data):
        if not data['fields']:
            return None
        field_details_data = data['fields'][0].copy()
        field_details_data['soilTypeId'] = soil.id
        return [field_details_data]

    data = input.copy()

    if isinstance(input, list):
        for i, v in enumerate(input):
            if v['fields']:
                data[i]['fields'] = fix_soil(v)
    else:
        data['fields'] = fix_soil(data)

    return data

class TestFieldSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input, soil):
        serializer = FieldSerializer()
        serializer.load(copy.deepcopy(get_field_data(input, soil)))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field, soil):
        serializer = FieldSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_field_data(input, soil)))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input, soil):
        serializer = FieldSerializer()
        result = serializer.load(get_field_data(input, soil))
        result = serializer.dump(result)
        assert result['title'] == input['title']


class TestFieldListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input, soil):
        serializer = FieldListSerializer()
        serializer.load(copy.deepcopy(get_field_data(input, soil)), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field, soil):
        serializer = FieldListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_field_data(input, soil)), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input, soil):
        input_data = copy.deepcopy(input)

        serializer = FieldListSerializer()
        result = serializer.load(get_field_data(input, soil), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']