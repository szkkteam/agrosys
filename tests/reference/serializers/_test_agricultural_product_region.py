#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.reference.serializers import AgriculturalProductRegionSerializer, AgriculturalProductRegionListSerializer

VALID_INPUT_DATA = [
    ({'value': 123}),
    ({'value': 12313}),
]

VALID_INPUT_DATA_LIST = [
    [({'value': 123}),
    ({'value': 12313}),],
    [    ({'value': 123}),
    ({'value': 12313}),]
]

INVALID_INPUT_DATA = [
    (({'value': 123}), 'Field may not be null.', 'value'),
]

INVALID_INPUT_DATA_LIST = [
    ([({'value': 123})], 'Field may not be null.', 'value'),
]

class TestAgriculturalProductRegionSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = AgriculturalProductRegionSerializer()
        serializer.load(copy.deepcopy(input))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = AgriculturalProductRegionSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = AgriculturalProductRegionSerializer()
        result = serializer.load(input)
        result = serializer.dump(result)
        assert result['value'] == input['value']


class TestAgriculturalProductRegionListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = AgriculturalProductRegionListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = AgriculturalProductRegionListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = AgriculturalProductRegionListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['value'] == i['value']
