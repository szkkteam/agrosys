#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.reference.serializers import CountrySerializer, CountryListSerializer

VALID_INPUT_DATA = [
    ({'title': 'Hungary', 'iso2': 'HU', 'iso3': 'HUN'}),
    ({'title': 'Germany', 'iso2': 'DE', 'iso3': 'DEU'}),
]

VALID_INPUT_DATA_LIST = [
    [({'title': 'Hungary', 'iso2': 'HU', 'iso3': 'HUN'}),
    ({'title': 'Germany', 'iso2': 'DE', 'iso3': 'DEU'}),],
    [({'title': 'Hungary', 'iso2': 'HU', 'iso3': 'HUN'}),
    ({'title': 'Germany', 'iso2': 'DE', 'iso3': 'DEU'}),]
]

INVALID_INPUT_DATA = [    
    (({'title': 'Hungary', 'iso2': None, 'iso3': 'HUN'}), 'Field may not be null.', 'iso2'),
    (({'title': 'Hungary', 'iso2': 'HU', 'iso3': None}), 'Field may not be null.', 'iso3'),
    (({'title': 'Hungary', 'iso2': 'HUNGARY', 'iso3': 'HUN'}), 'Longer than maximum length 2.', 'iso2'),
    (({'title': 'Hungary', 'iso2': 'HU', 'iso3': 'HUNGARY'}), 'Longer than maximum length 3.', 'iso3'),
]

INVALID_INPUT_DATA_LIST = [
    ([({'title': 'Hungary', 'iso2': None, 'iso3': 'HUN'})], 'Field may not be null.', 'iso2'),
    ([({'title': 'Hungary', 'iso2': 'HU', 'iso3': None})], 'Field may not be null.', 'iso3'),
    ([({'title': 'Hungary', 'iso2': 'HUNGARY', 'iso3': 'HUN'})], 'Longer than maximum length 2.', 'iso2'),
    ([({'title': 'Hungary', 'iso2': 'HU', 'iso3': 'HUNGARY'})], 'Longer than maximum length 3.', 'iso3'),
]

class TestCountrySerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = CountrySerializer()
        serializer.load(copy.deepcopy(input))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = CountrySerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = CountrySerializer()
        result = serializer.load(input)
        result = serializer.dump(result)
        assert result['title'] == input['title']
        assert result['iso2'] == input['iso2']
        assert result['iso3'] == input['iso3']


class TestCountryListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = CountryListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = CountryListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = CountryListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']
            assert r['iso2'] == i['iso2']
            assert r['iso3'] == i['iso3']