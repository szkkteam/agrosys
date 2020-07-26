#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.crop.serializers import CropCultivationTypeListSerializer


VALID_INPUT_DATA_LIST = [
    ([{'title': 'Cultivation 1', 'description': 'random text', 'yieldModifier': 1.0 },
      {'title': 'Cultivation 2', 'description': '#"+!!R+""', 'yieldModifier': 923.5535}]),
    ([{'title': 'Cultivation 3', 'description': '#"+!!R+""', 'yieldModifier': 923.5535},
      {'title': 'Not exists', 'description': '', 'yieldModifier': 0}]),
    ([{'title': 'Cultivation 1', 'description': 'random text', 'yieldModifier': 1.0 },
      {'title': 'Cultivation 3', 'description': '', 'yieldModifier': 0}]),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'description': 'random text', 'yieldModifier': 1.0},
      {'title': None, 'description': '#"+!!R+""', 'yieldModifier': 923.5535},], 'Field may not be null.', 'title'),
    ([{'title': 'Corn', 'description': 'random text', 'yieldModifier': None },
      {'title': 'Not exists', 'description': '', 'yieldModifier': None},], 'Field may not be null.', 'yieldModifier'),
]

class TestCropCultivationTypeListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = CropCultivationTypeListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = CropCultivationTypeListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = CropCultivationTypeListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']
            assert r['description'] == i['description']
            assert r['yield_modifier'] == i['yield_modifier']