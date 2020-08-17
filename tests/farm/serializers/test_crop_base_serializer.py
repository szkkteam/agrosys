#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import CropBaseListSerializer


VALID_INPUT_DATA_LIST = [
    ([{'title': 'Corn', 'description': 'random text', 'baseYield': 1.0 },
      {'title': 'Wheat', 'description': '#"+!!R+""', 'baseYield': 923.5535}]),
    ([{'title': 'Wheat', 'description': '#"+!!R+""', 'baseYield': 923.5535},
      {'title': 'Not exists', 'description': '', 'baseYield': 0}]),
    ([{'title': 'Corn', 'description': 'random text', 'baseYield': 1.0 },
      {'title': 'Not exists', 'description': '', 'baseYield': 0}]),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'description': 'random text', 'baseYield': 1.0},
      {'title': None, 'description': '#"+!!R+""', 'baseYield': 923.5535},], 'Field may not be null.', 'title'),
    ([{'title': 'Corn', 'description': 'random text', 'baseYield': None },
      {'title': 'Not exists', 'description': '', 'baseYield': None},], 'Field may not be null.', 'baseYield'),
]

class TestCropBaseListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = CropBaseListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = CropBaseListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = CropBaseListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']
            assert r['description'] == i['description']
            assert r['base_yield'] == i['base_yield']