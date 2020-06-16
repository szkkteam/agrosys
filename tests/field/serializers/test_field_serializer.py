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
    ({'title': 'test field 1', 'field': {'value': 0.0, 'shape': VALID_GEOJSON}}),
    ({'title': 'test field 2', 'field': {'value': None, 'shape': VALID_GEOJSON}}),
    ({'title': 'test field #$!"1', 'field': {'value': 100.999, 'shape': VALID_GEOJSON}}),
]

VALID_INPUT_DATA_LIST = [
    ([{'title': 'test field 11', 'field': {'value': 0.0, 'shape': VALID_GEOJSON}},
      {'title': 'test field 12', 'field': {'value': 0.0, 'shape': VALID_GEOJSON}}]),
    ([{'title': 'test field 21', 'field': {'value': None, 'shape': VALID_GEOJSON}},
      {'title': 'test field 22', 'field': {'value': None, 'shape': VALID_GEOJSON}},]),
    ([{'title': 'test field #$!"1-31', 'field': {'value': 100.999, 'shape': VALID_GEOJSON}},
      {'title': 'test field #$!"1-32', 'field': {'value': 100.999, 'shape': VALID_GEOJSON}}]),
]

INVALID_INPUT_DATA = [
    ({'title': None, 'field': {'value': 0.0, 'shape': VALID_GEOJSON}}, 'Field may not be null.', 'title'),
    ({'title': 'test field 2', 'field': None}, 'Field may not be null.', 'field'),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'field': {'value': 0.0, 'shape': VALID_GEOJSON}},
      {'title': None, 'field': {'value': 0.0, 'shape': VALID_GEOJSON}},], 'Field may not be null.', 'title'),
    ([{'title': 'test field 2', 'field': None},
      {'title': 'test field 2', 'field': None}], 'Field may not be null.', 'field'),
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