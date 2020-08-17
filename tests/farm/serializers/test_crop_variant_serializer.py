#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import CropVariantListSerializer


VALID_INPUT_DATA_LIST = [
    ([{'title': 'Variant 1', 'latin': 'Latin text', 'description': 'random text', 'yieldModifier': 1.0 },
      {'title': 'Variant 2', 'latin': 'Latin text', 'description': '#"+!!R+""', 'yieldModifier': 923.5535}]),
    ([{'title': 'Variant 3', 'latin': 'Latin text', 'description': '#"+!!R+""', 'yieldModifier': 923.5535},
      {'title': 'Not exists', 'latin': 'Latin text', 'description': '', 'yieldModifier': 0}]),
    ([{'title': 'Variant 1', 'latin': 'Latin text', 'description': 'random text', 'yieldModifier': 1.0 },
      {'title': 'Variant 3', 'latin': 'Latin text', 'description': '', 'yieldModifier': 0}]),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'latin': 'Latin text', 'description': 'random text', 'yieldModifier': 1.0},
      {'title': None,'latin': 'Latin text', 'description': '#"+!!R+""', 'yieldModifier': 923.5535},], 'Field may not be null.', 'title'),
    ([{'title': 'Corn', 'latin': 'Latin text', 'description': 'random text', 'yieldModifier': None },
      {'title': 'Not exists', 'latin': 'Latin text', 'description': '', 'yieldModifier': None},], 'Field may not be null.', 'yieldModifier'),
    ([{'title': 'Corn', 'latin': None, 'description': 'random text', 'yieldModifier': 1.0},
      {'title': 'Not exists', 'latin': None, 'description': '', 'yieldModifier': 923.5535}, ],
     'Field may not be null.', 'latin'),
]

class TestCropVariantListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = CropVariantListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = CropVariantListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = CropVariantListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']
            assert r['latin'] == i['latin']
            assert r['description'] == i['description']
            assert r['yield_modifier'] == i['yield_modifier']
