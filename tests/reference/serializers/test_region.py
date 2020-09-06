#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.reference.serializers import RegionSerializer, RegionListSerializer

VALID_INPUT_DATA = [
    ({'title': 'Western Hungary', 'soCode': 'HU10'}),
    ({'title': 'Eastern Hungary', 'soCode': 'HU11'}),
]

VALID_INPUT_DATA_LIST = [
    [({'title': 'Western Hungary', 'soCode': 'HU10'}),
    ({'title': 'Eastern Hungary', 'soCode': 'HU11'}),],
    [({'title': 'Western Hungary', 'soCode': 'HU10'}),
    ({'title': 'Eastern Hungary', 'soCode': 'HU11'}),]
]

INVALID_INPUT_DATA = [
    (({'title': 'Western Hungary', 'soCode': None}), 'Field may not be null.', 'soCode'),
    (({'title': 'Western Hungary', 'soCode': 'HUNGARY123'}), 'Longer than maximum length 4.', 'soCode'),
]

INVALID_INPUT_DATA_LIST = [
    ([({'title': 'Western Hungary', 'soCode': None})], 'Field may not be null.', 'soCode'),
    ([({'title': 'Western Hungary', 'soCode': 'HUNGARY123'})], 'Longer than maximum length 4.', 'soCode'),
]

class TestRegionSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = RegionSerializer()
        serializer.load(copy.deepcopy(input))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = RegionSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = RegionSerializer()
        result = serializer.load(input)
        result = serializer.dump(result)
        assert 'id' in result
        assert result['title'] == input['title']
        assert result['soCode'] == input['soCode']


class TestCountryListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = RegionListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = RegionListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = RegionListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert 'id' in r
            assert r['title'] == i['title']
            assert r['soCode'] == i['soCode']
