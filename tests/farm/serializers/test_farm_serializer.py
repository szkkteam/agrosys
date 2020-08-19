#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import FarmSerializer, FarmListSerializer


VALID_INPUT_DATA = [
    ({'title': 'Farm 1', 'countryId': lambda c: c.id}),
    ({'title': 'Farm 12313', 'countryId': lambda c: c.id}),
    ({'title': 'Farm #$!"1', 'countryId': lambda c: c.id}),
]

INVALID_INPUT_DATA = [
    ({'title': 'Farm 11', 'countryId': None}, 'Field may not be null.', 'countryId'),
    ({'title': 'Farm 11', 'countryId': 999}, 'ID 999 does not exist.', 'countryId'),
    ({'title': None, 'countryId': lambda c: c.id}, 'Field may not be null.', 'title'),
]


VALID_INPUT_DATA_LIST = [
    [({'title': 'Farm 1', 'countryId': lambda c: c.id}),
    ({'title': 'Farm 12313', 'countryId': lambda c: c.id})],
    [({'title': 'Farm #$!"1', 'countryId': lambda c: c.id})],
]


INVALID_INPUT_DATA_LIST = [
    ([{'title': 'Farm 11', 'countryId': None}], 'Field may not be null.', 'countryId'),
    ([{'title': 'Farm 11', 'countryId': 999}], 'ID 999 does not exist.', 'countryId'),
    ([{'title': None, 'countryId': lambda c: c.id}], 'Field may not be null.', 'title'),
]


def get_input_data(input, country):
    data = input.copy()
    if isinstance(input, list):
        for i, v in enumerate(data):
            for key, value in v.items():
                v[key] = value(country) if callable(value) else value
            data[i] = v

    else:
        for key, value in data.items():
            data[key] = value(country) if callable(value) else value

    return data

class TestFarmSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input, country_hu):
        serializer = FarmSerializer()
        serializer.load(copy.deepcopy(get_input_data(input, country_hu)))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field, country_hu):
        serializer = FarmSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input, country_hu)))
        assert msg in v.value.args[0][field]


    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input, country_hu):
        serializer = FarmSerializer()
        result = serializer.load(copy.deepcopy(get_input_data(input, country_hu)))
        result = serializer.dump(result)
        assert result['title'] == input['title']



class TestFarmListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input, country_hu):
        serializer = FarmListSerializer()
        serializer.load(copy.deepcopy(get_input_data(input, country_hu)), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field, country_hu):
        serializer = FarmListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input, country_hu)), many=True)

    @pytest.mark.skip(reason="Updateting the ID of country is not working here.")
    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input, country_hu):
        serializer = FarmListSerializer()
        result = serializer.load(copy.deepcopy(get_input_data(input, country_hu)), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input):
            assert r['title'] == i['title']
