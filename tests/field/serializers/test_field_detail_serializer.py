#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.field.serializers import FieldDetailSerializer, FieldDetailListSerializer

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

VALID_SOIL_TYPE = 1

VALID_INPUT_DATA = [
    ({'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}),
    ({'value': None, 'area': 999.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}),
    ({'value': 100.999, 'area': 0.1, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}),
]

VALID_INPUT_DATA_LIST = [
    ([{'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE},
      {'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]),
    ([{'value': None, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE},
      {'value': None, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE},]),
    ([{'value': 100.999, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE},
      {'value': 100.999, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}]),
]

INVALID_INPUT_DATA = [
    #({'name': None, 'value': 0.0, 'shape': VALID_GEOJSON}, 'Field may not be null.', 'name'),
    ({'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': None}, 'Field may not be null.', 'soilTypeId'),
    ({'value': 0.0, 'area': 15.0, 'shape': INVALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}, 'Expecting a Feature object', 'shape'),
    ({'value': 0.0, 'area': None, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}, 'Field may not be null.', 'area'),
]

INVALID_INPUT_DATA_LIST = [
    ([{'value': 0.0, 'area': 15.0, 'shape': INVALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE},
      {'value': 0.0, 'area': 15.0, 'shape': INVALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}], 'Expecting a Feature object', 'shape'),
    ([{'value': 0.0, 'area': None, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE},
      {'value': 0.0, 'area': None, 'shape': VALID_GEOJSON, 'soilTypeId': VALID_SOIL_TYPE}], 'Field may not be null.', 'area'),
    ([{'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': None},
      {'value': 0.0, 'area': 15.0, 'shape': VALID_GEOJSON, 'soilTypeId': None}], 'Field may not be null.', 'soilTypeId'),
]


@pytest.mark.usefixtures('soil')
class TestFieldDetailSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input, soil):
        input_data = copy.deepcopy(input)
        input_data['soilTypeId'] = soil.id

        serializer = FieldDetailSerializer()
        serializer.load(input_data)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field, soil):
        input_data = copy.deepcopy(input)
        if input_data['soilTypeId']:
            input_data['soilTypeId'] = soil.id

        serializer = FieldDetailSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input_data))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input, soil):
        input_data = copy.deepcopy(input)
        input_data['soilTypeId'] = soil.id

        serializer = FieldDetailSerializer()
        m_result = serializer.load(input_data.copy())
        result = serializer.dump(m_result)
        assert result['soil']['title'] == soil.title
        assert result['value'] == input_data['value']
        assert result['area'] == input_data['area']
        compare_geojson(input_data['shape'], result['shape'])

@pytest.mark.usefixtures('soil')
class TestFieldDetailListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input, soil):
        input_data = copy.deepcopy(input)
        for data in input_data:
            data['soilTypeId'] = soil.id

        serializer = FieldDetailListSerializer()
        serializer.load(copy.deepcopy(input_data), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field, soil):
        input_data = copy.deepcopy(input)
        for data in input_data:
            if data['soilTypeId']:
                data['soilTypeId'] = soil.id

        serializer = FieldDetailListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input_data), many=True)
        # TODO: Feature object validation is not working properly
        #error_values = { **list(v.value.args[0].values())[0], **list(v.value.args[0].values())[1]}
        #assert msg in error_values[field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input, soil):
        input_data = copy.deepcopy(input)
        for data in input_data:
            data['soilTypeId'] = soil.id

        serializer = FieldDetailListSerializer()
        result = serializer.load(input_data.copy(), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['value'] == i['value']
            assert r['area'] == i['area']
            compare_geojson(r['shape'], i['shape'])