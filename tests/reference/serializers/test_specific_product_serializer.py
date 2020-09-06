#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.reference.serializers import SpecificProductSerializer, SpecificProductListSerializer

VALID_INPUT_DATA = [
    ({'title': 'Tavaszi tönkölybúza', 'baseYield': 1, 'properties': {'test': 'data1', 'test2': 'data2'}}),
    ({'title': 'Pattogatni való kukorica', 'baseYield': 1.23}),
    ({'title': 'Fehérvirágú édes csillagfürt (takarmány célra)', 'baseYield': 1.23, 'properties': {'test': 'data1', 'test2': 'data2'}}),
]

VALID_INPUT_DATA_LIST = [
    [({'title': 'Tavaszi tönkölybúza', 'baseYield': 1}),
    ({'title': 'Pattogatni való kukorica', 'baseYield': 1.23}),
    ({'title': 'Fehérvirágú édes csillagfürt (takarmány célra)', 'baseYield': 1.23, 'properties': {'test': 'data1', 'test2': 'data2'}}),],
    [({'title': 'Tavaszi tönkölybúza', 'baseYield': 1}),
    ({'title': 'Pattogatni való kukorica', 'baseYield': 1.23}),
    ({'title': 'Fehérvirágú édes csillagfürt (takarmány célra)', 'baseYield': 1.23, 'properties': {'test': 'data1', 'test2': 'data2'}}),]
]

INVALID_INPUT_DATA = [
    (({'title': 'Pattogatni való kukorica', 'baseYield': None}), 'Field may not be null.', 'baseYield'),
]

INVALID_INPUT_DATA_LIST = [
    ([({'title': 'Pattogatni való kukorica', 'baseYield': None})], 'Field may not be null.', 'baseYield'),
]

class TestSpecificProductSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = SpecificProductSerializer()
        serializer.load(copy.deepcopy(input))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = SpecificProductSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = SpecificProductSerializer()
        result = serializer.load(input)
        result = serializer.dump(result)
        assert 'id' in result
        assert result['title'] == input['title']
        assert result['baseYield'] == input['baseYield']
        assert 'properties' in result
        if len(result['properties'].keys()):
            assert 'test' in result['properties']
            assert 'test2' in result['properties']


class TestSpecificProductListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = SpecificProductListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = SpecificProductListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = SpecificProductListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert 'id' in r
            assert r['title'] == i['title']
            assert r['baseYield'] == i['baseYield']
            assert 'properties' in r
            if len(r['properties'].keys()):
                assert 'test' in r['properties']
                assert 'test2' in r['properties']