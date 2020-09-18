#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.reference.serializers import AgriculturalTypeSerializer, AgriculturalTypeListSerializer

VALID_INPUT_DATA = [
    ({'title': 'Arable Land', 'description': 'some text'}),
    ({'title': 'Grassland - Meadow', 'description': 'some text'}),
    ({'title': 'Forest', 'description': 'some text'}),
]

VALID_INPUT_DATA_LIST = [
    [({'title': 'Arable Land', 'description': 'some text'}),
    ({'title': 'Grassland - Meadow', 'description': 'some text'}),
    ({'title': 'Forest', 'description': 'some text'}),],
    [({'title': 'Arable Land', 'description': 'some text'}),
    ({'title': 'Grassland - Meadow', 'description': 'some text'}),
    ({'title': 'Forest', 'description': 'some text'}),]
]
"""
INVALID_INPUT_DATA = [
    ({'title': None, 'code': 1, 'description': 'some text'}, 'Field may not be null.', 'title'),
    ({'title': 'Agriculture Parcel', 'code': None, 'description': 'some text'}, 'Field may not be null.', 'code'),
    ({'title': 'Agriculture Parcel', 'code': 991, 'description': 'some text'}, 'Invalid enum value 991', 'code'),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'code': 1, 'description': 'some text'},], 'Field may not be null.', 'title'),
    ([{'title': 'Agriculture Parcel', 'code': None, 'description': 'some text'},], 'Field may not be null.', 'code'),
    ([{'title': 'Agriculture Parcel', 'code': 991, 'description': 'some text'},], 'Invalid enum value 991', 'code'),
]
"""

class TestAgriculturalTypeSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = AgriculturalTypeSerializer()
        serializer.load(copy.deepcopy(input))

    """
    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = ReferenceParcelTypeSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input))
        assert msg in v.value.args[0][field]
    """

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = AgriculturalTypeSerializer()
        result = serializer.load(input)
        result = serializer.dump(result)
        assert result['title'] == input['title']


class TestAgriculturalTypeListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = AgriculturalTypeListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    """
    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = ReferenceParcelTypeListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)
    """

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = AgriculturalTypeListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']