#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import SeasonSerializer, SeasonListSerializer

VALID_GEOJSON = {"type": "Feature",
                 "properties": {},
                 "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[17.71719217300415,47.12809671910988],[17.721483707427975,47.1230306334327],[17.725925445556637, 47.12485564784686
                        ],[17.723522186279297,47.12732296778955],[17.721827030181885,47.12662220216394],[17.71946668624878,47.12919163099024],
                        [17.71719217300415,47.12809671910988]]]
                  }
    }

LONG_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "


VALID_AGRICULTURAL_PARCEL_DATA = {
    'title': 'test field 1', 'referenceParcelType': 'AgriculturalParcel', 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0}

VALID_PHYSICAL_BLOCK_DATA_NESTED = {
    'title': 'test field 1', 'referenceParcelType': 'PhysicalBlock', 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 1.5, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id, 'parcels': [VALID_AGRICULTURAL_PARCEL_DATA]
}

VALID_PHYSICAL_BLOCK_DATA = {
    'title': 'test field 1', 'referenceParcelType': 'PhysicalBlock', 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 1.5, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id
}

VALID_INPUT_DATA = [
    ({'title': 'Season 2019', 'parcels': [VALID_PHYSICAL_BLOCK_DATA], 'dates': { 'startDate': '2020-01-21T20:00:00', 'endDate': '2020-12-22T20:00:00', },}),
    ({'title': None, 'parcels': [VALID_PHYSICAL_BLOCK_DATA_NESTED], 'dates': { 'startDate': '2020-01-21T20:00:00', 'endDate': '2020-12-22T20:00:00', }}),
    ({'title': 'Season #$!"1', 'parcels': [VALID_PHYSICAL_BLOCK_DATA_NESTED], 'dates': { 'startDate': '2020-01-21T20:00:00', 'endDate': '2020-12-22T20:00:00', }}),
]

INVALID_INPUT_DATA = [
    ({'title': None, 'dates': None}, 'Dates field must be dict', 'dates'),
    ({'title': 'Season with wrong dates', 'dates': { 'startDate': '2020-12-22T20:00:00', 'endDate': '2020-01-21T20:00:00'} }, 'Field may be not bigger than endDate.', 'startDate'),
    ({'title': 'Production invalid', 'dates': { 'startDate': '2020-12-22T20:00:00', 'endDate': None} }, 'Field may not be null.', 'endDate'),
    #({'title': 'test field 2', }, 'Field may not be null.', 'fields'),
]

VALID_INPUT_DATA_LIST = [
    [({'title': 'Season 2019', 'dates': { 'startDate': '2020-01-21T20:00:00', 'endDate': '2020-12-22T20:00:00', }}),
    ({'title': None, 'dates': { 'startDate': '2020-01-21T20:00:00', 'endDate': '2020-12-22T20:00:00', }}),],
    [({'title': 'Season 2019', 'dates': { 'startDate': '2020-01-21T20:00:00', 'endDate': '2020-12-22T20:00:00', }}),
    ({'title': 'Season #$!"1', 'dates': { 'startDate': '2020-01-21T20:00:00', 'endDate': '2020-12-22T20:00:00', }}),]
]
"""
INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'cropTemplateId': 1},
      {'title': None, 'cropTemplateId': 1},], 'Field may not be null.', 'title'),
    ([{'title': 'Production invalid', 'cropTemplateId': None },
      {'title': 'Production invalid', 'cropTemplateId': None },], 'Field may not be null.', 'cropTemplateId'),
]
"""

def get_input_data(input, soil, agri_type):
    data = input.copy()
    if isinstance(input, list):
        for i, v in enumerate(data):
            for key, value in v.items():
                v[key] = value(soil, agri_type) if callable(value) else value
                if key == 'parcels':
                    v[key] = get_input_data(value, soil, agri_type)
            data[i] = v

    else:
        for key, value in data.items():
            data[key] = value(soil, agri_type) if callable(value) else value
            if key == 'parcels':
                data[key] = get_input_data(value, soil, agri_type)

    return data



class TestSeasonSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input, soil, agri_type):
        serializer = SeasonSerializer()
        data = copy.deepcopy(input)
        if 'parcels' in data:
            data['parcels'] = get_input_data(data['parcels'], soil, agri_type)
        serializer.load(data)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = SeasonSerializer()
        data = copy.deepcopy(input)
        with pytest.raises(ValidationError) as v:
            serializer.load(data)
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input, soil, agri_type):
        serializer = SeasonSerializer()
        data = copy.deepcopy(input)
        if 'parcels' in data:
            data['parcels'] = get_input_data(data['parcels'], soil, agri_type)
        result = serializer.load(data)
        result = serializer.dump(result)
        assert result['title'] == data['title']
        assert 'dates' in result
        assert 'startDate' in result['dates']
        assert 'endDate' in result['dates']


class TestSeasonListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        data = copy.deepcopy(input)
        serializer = SeasonListSerializer()
        serializer.load(data, many=True)

    """
    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field, crop_template):
        serializer = SeasonListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_production_data(input, crop_template)), many=True)
    """

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        serializer = SeasonListSerializer()
        data = copy.deepcopy(input)
        result = serializer.load(data, many=True)
        print("Serialization result: ", result)
        result = serializer.dump(result, many=True)
        for r, i in zip(result, data):
            assert r['title'] == i['title']
            assert 'dates' in r
            assert 'startDate' in r['dates']
            assert 'endDate' in r['dates']
