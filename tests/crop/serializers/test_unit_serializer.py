#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.crop.serializers import UnitSerializer, UnitListSerializer

VALID_INPUT_DATA = [
    ({'title': 'kg'}),
    ({'title': 'l/h'}),
    ({'title': 'm/s^2'}),
]

VALID_INPUT_DATA_LIST = [
    ([{'title': 'kg'},
      {'title': 'l/h'}]),
    ([{'title': 'm/s^2'},
      {'title': 'kg'},]),
    ([{'title': 'l/h'},
      {'title': 'm/s^2'}]),
]

INVALID_INPUT_DATA = [
    ({'title': None}, 'Field may not be null.', 'title'),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None},
      {'title': None},], 'Field may not be null.', 'title'),
]

class TestUnitSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = UnitSerializer()
        serializer.load(copy.deepcopy(input))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = UnitSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = UnitSerializer()
        result = serializer.load(input)
        result = serializer.dump(result)
        assert result['title'] == input['title']


class TestUnitListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = UnitListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = UnitListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = UnitListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']