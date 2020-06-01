#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm_management.serializers import FieldSerializer, FieldListSerializer

def compare_geojson(a, b):
    assert a["type"] == b["type"]
    #assert a["properties"] == b["properties"] properties are not restored yet.
    assert a["geometry"]["type"] == b["geometry"]["type"]
    for a_cord, b_cord in zip(a["geometry"]["coordinates"], b["geometry"]["coordinates"]):
        assert a_cord[0] == pytest.approx(b_cord[0])
        assert a_cord[1] == pytest.approx(b_cord[1])



VALID_GEOJSON = {"type": "Feature",
                 "properties": {},
                 "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[17.71719217300415,47.12809671910988],[17.721483707427975,47.1230306334327],[17.725925445556637, 47.12485564784686
                        ],[17.723522186279297,47.12732296778955],[17.721827030181885,47.12662220216394],[17.71946668624878,47.12919163099024],
                        [17.71719217300415,47.12809671910988]]]
                  }
    }

INVALID_GEOJSON = {"type": None,
                 "properties": {},
                 "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[17.71719217300415,47.12809671910988],[17.721483707427975,47.1230306334327],[17.725925445556637, 47.12485564784686
                        ],[17.723522186279297,47.12732296778955],[17.721827030181885,47.12662220216394],[17.71946668624878,47.12919163099024],
                        [17.71719217300415,47.12809671910988]]]
                  }
    }

VALID_INPUT_DATA = [
    ({'name': 'test field 1', 'value': 0.0, 'shape': VALID_GEOJSON}),
    ({'name': 'test field 2', 'value': None, 'shape': VALID_GEOJSON}),
    ({'name': 'test field #$!"1', 'value': 100.999, 'shape': VALID_GEOJSON}),
]

VALID_INPUT_DATA_LIST = [
    ([{'name': 'test field 11', 'value': 0.0, 'shape': VALID_GEOJSON},
      {'name': 'test field 12', 'value': 0.0, 'shape': VALID_GEOJSON}]),
    ([{'name': 'test field 21', 'value': None, 'shape': VALID_GEOJSON},
      {'name': 'test field 22', 'value': None, 'shape': VALID_GEOJSON},]),
    ([{'name': 'test field #$!"1-31', 'value': 100.999, 'shape': VALID_GEOJSON},
      {'name': 'test field #$!"1-32', 'value': 100.999, 'shape': VALID_GEOJSON}]),
]

INVALID_INPUT_DATA = [
    ({'name': None, 'value': 0.0, 'shape': VALID_GEOJSON}, 'Field may not be null.', 'name'),
    ({'name': 'test field 2', 'value': 0.0, 'shape': INVALID_GEOJSON}, 'Expecting a Feature object', 'shape'),
]

INVALID_INPUT_DATA_LIST = [
    ([{'name': None, 'value': 0.0, 'shape': VALID_GEOJSON},
      {'name': None, 'value': 0.0, 'shape': VALID_GEOJSON},], 'Field may not be null.', 'name'),
    ([{'name': 'test field 2', 'value': 0.0, 'shape': INVALID_GEOJSON},
      {'name': 'test field 2', 'value': 0.0, 'shape': INVALID_GEOJSON}], 'Expecting a Feature object', 'shape'),
]


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
        result = serializer.dump(result)
        assert result['name'] == input_data['name']
        assert result['value'] == input_data['value']
        compare_geojson(input_data['shape'], result['shape'])


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
            assert e['name'] == i['name']
            assert e['value'] == i['value']
            compare_geojson(e['shape'], i['shape'])