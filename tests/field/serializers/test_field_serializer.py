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


VALID_INPUT_DATA = [
    ({'title': 'test field 1', 'fields': {'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON}}),
    ({'title': 'test field 2', 'fields': {'value': None, 'area': 15.0, 'shape': VALID_GEOJSON}}),
    ({'title': 'test field #$!"1', 'fields': {'value': 100.999, 'area': 15.0, 'shape': VALID_GEOJSON}}),
]

VALID_INPUT_DATA_LIST = [
    ([{'title': 'test field 11', 'fields': {'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON}},
      {'title': 'test field 12', 'fields': {'value': 0.0,'area': 15.0, 'shape': VALID_GEOJSON}}]),
    ([{'title': 'test field 21', 'fields': {'value': None, 'area': 15.0, 'shape': VALID_GEOJSON}},
      {'title': 'test field 22', 'fields': {'value': None, 'area': 15.0, 'shape': VALID_GEOJSON}},]),
    ([{'title': 'test field #$!"1-31', 'fields': {'value': 100.999, 'area': 15.0, 'shape': VALID_GEOJSON}},
      {'title': 'test field #$!"1-32', 'fields': {'value': 100.999, 'area': 15.0, 'shape': VALID_GEOJSON}}]),
]

INVALID_INPUT_DATA = [
    ({'title': None, 'fields': {'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON}}, 'Field may not be null.', 'title'),
    ({'title': 'test field 2', 'fields': None}, 'Field may not be null.', 'field'),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'fields': {'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON}},
      {'title': None, 'fields': {'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON}},], 'Field may not be null.', 'title'),
    ([{'title': 'test field 2', 'fields': None},
      {'title': 'test field 2', 'fields': None}], 'Field may not be null.', 'field'),
]

@pytest.mark.skip(reason="Field and field data handling must be reworked.")
class TestFieldSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = FieldSerializer()
        serializer.load(copy.deepcopy(input))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = FieldSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = FieldSerializer()
        result = serializer.load(input.copy())
        print("Load result: ", result)
        result = serializer.dump(result)
        print("Dump result: ", result)
        assert result['field']['value'] == input_data['field']['value']
        compare_geojson(input_data['field']['shape'], result['field']['shape'])


@pytest.mark.skip(reason="Field and field data handling must be reworked.")
class TestFieldListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = FieldListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = FieldListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)
        # TODO: Feature object validation is not working properly
        #error_values = { **list(v.value.args[0].values())[0], **list(v.value.args[0].values())[1]}
        #assert msg in error_values[field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = FieldListSerializer()
        result = serializer.load(input.copy(), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['field']['value'] == i['field']['value']
            compare_geojson(r['field']['shape'], i['field']['shape'])