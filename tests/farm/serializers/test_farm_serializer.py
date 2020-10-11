#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import FarmSerializer, FarmListSerializer
from .. import get_input_data


VALID_INPUT_DATA = [
    ({'title': 'Farm 1', 'regionId': lambda c: c.id}),
    ({'title': 'Farm 12313', 'regionId': lambda c: c.id}),
    ({'title': 'Farm #$!"1', 'regionId': lambda c: c.id}),
]

INVALID_INPUT_DATA = [
    ({'title': 'Farm 11', 'regionId': None}, 'Field may not be null.', 'regionId'),
    ({'title': 'Farm 11', 'regionId': 999}, 'ID 999 does not exist.', 'regionId'),
    ({'title': None, 'regionId': lambda c: c.id}, 'Field may not be null.', 'title'),
]


VALID_INPUT_DATA_LIST = [
    [({'title': 'Farm 1', 'regionId': lambda c: c.id}),
    ({'title': 'Farm 12313', 'regionId': lambda c: c.id})],
    [({'title': 'Farm #$!"1', 'regionId': lambda c: c.id})],
]


INVALID_INPUT_DATA_LIST = [
    ([{'title': 'Farm 11', 'regionId': None}], 'Field may not be null.', 'regionId'),
    ([{'title': 'Farm 11', 'regionId': 999}], 'ID 999 does not exist.', 'regionId'),
    ([{'title': None, 'regionId': lambda c: c.id}], 'Field may not be null.', 'title'),
]


class TestFarmSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input, region_1):
        serializer = FarmSerializer()
        serializer.load(copy.deepcopy(get_input_data(input, region_1)))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field, region_1):
        serializer = FarmSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input, region_1)))
        assert msg in v.value.args[0][field]


    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input, region_1):
        serializer = FarmSerializer()
        result = serializer.load(copy.deepcopy(get_input_data(input, region_1)))
        result = serializer.dump(result)
        assert result['title'] == input['title']



class TestFarmListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input, region_1):
        serializer = FarmListSerializer()
        serializer.load(copy.deepcopy(get_input_data(input, region_1)), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field, region_1):
        serializer = FarmListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input, region_1)), many=True)

    @pytest.mark.skip(reason="Updateting the ID of country is not working here.")
    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input, region_1):
        serializer = FarmListSerializer()
        result = serializer.load(copy.deepcopy(get_input_data(input, region_1)), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input):
            assert r['title'] == i['title']
