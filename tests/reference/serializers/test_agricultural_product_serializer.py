#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.reference.serializers import AgriculturalProductSerializer, AgriculturalProductListSerializer

VALID_INPUT_DATA = [
    ({'title': 'Common wheat and spelt', 'soId': 'B_1_1_1', 'soUnit': 'ECU_per_ha'}),
    ({'title': 'Permanent grassland and meadow - no used for production, eligible for subsidies', 'soId': 'F03', 'soUnit': 'ECU_per_ha'}),
]

VALID_INPUT_DATA_LIST = [
    [({'title': 'Common wheat and spelt', 'soId': 'B_1_1_1', 'soUnit': 'ECU_per_ha'}),
    ({'title': 'Permanent grassland and meadow - no used for production, eligible for subsidies', 'soId': 'F03', 'soUnit': 'ECU_per_ha'}),],
    [({'title': 'Common wheat and spelt', 'soId': 'B_1_1_1', 'soUnit': 'ECU_per_ha'}),
    ({'title': 'Permanent grassland and meadow - no used for production, eligible for subsidies', 'soId': 'F03', 'soUnit': 'ECU_per_ha'}),]
]

INVALID_INPUT_DATA = [
    (({'title': 'Common wheat and spelt', 'soId': None, 'soUnit': 'ECU_per_ha'}), 'Field may not be null.', 'soId'),
    (({'title': 'Common wheat and spelt', 'soId': 'B_1_1_1', 'soUnit': None}), 'Field may not be null.', 'soUnit'),
]

INVALID_INPUT_DATA_LIST = [
    ([({'title': 'Common wheat and spelt', 'soId': None, 'soUnit': 'ECU_per_ha'})], 'Field may not be null.', 'soId'),
    ([({'title': 'Common wheat and spelt', 'soId': 'B_1_1_1', 'soUnit': None})], 'Field may not be null.', 'soUnit'),
]

class TestAgriculturalProductSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = AgriculturalProductSerializer()
        serializer.load(copy.deepcopy(input))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = AgriculturalProductSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = AgriculturalProductSerializer()
        result = serializer.load(input)
        result = serializer.dump(result)
        assert 'id' in result
        assert result['title'] == input['title']
        assert result['soId'] == input['soId']
        assert result['soUnit'] == input['soUnit']


class TestAgriculturalProductListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = AgriculturalProductListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = AgriculturalProductListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = AgriculturalProductListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert 'id' in r
            assert r['title'] == i['title']
            assert r['soId'] == i['soId']
            assert r['soUnit'] == i['soUnit']
