#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import TaskSerializer, TaskListSerializer

TASK_HARVEST_1 = {
    'title': 'task harvest',
    'taskType': 'TaskHarvesting',
    'description': 'some text',
    'dates': {
        'startDate': '2020-07-21T20:00:00',
        'endDate': '2020-07-22T20:00:00',
    },
    'predictedCost': 1,
    'status': 'Pending',
    'actualCost': 2,
    'specificProductId': lambda s: s.id
}


TASK_HARVEST_NO_PRODUCT = {
    'title': 'task harvest',
    'taskType': 'TaskHarvesting',
    'description': 'some text',
    'dates': {
        'startDate': '2020-07-21T20:00:00',
        'endDate': '2020-07-22T20:00:00',
    },
    'predictedCost': 1,
    'status': 'Pending',
    'actualCost': 2,
    'specificProductId': None
}

VALID_INPUT_DATA = [
    TASK_HARVEST_1
]

INVALID_INPUT_DATA = [
    (TASK_HARVEST_NO_PRODUCT, 'Field may not be null.', 'specificProductId'),
]

VALID_INPUT_DATA_LIST = [
    ([TASK_HARVEST_1,
      TASK_HARVEST_1,])
]

INVALID_INPUT_DATA_LIST = [
    ([TASK_HARVEST_NO_PRODUCT, TASK_HARVEST_NO_PRODUCT], 'Field may not be null.', 'specificProductId'),
]


def get_input_data(input, spec_product):
    data = input.copy()
    if isinstance(input, list):
        for i, v in enumerate(data):
            for key, value in v.items():
                v[key] = value(spec_product) if callable(value) else value
            data[i] = v

    else:
        for key, value in data.items():
            data[key] = value(spec_product) if callable(value) else value

    return data

class TestTaskHarvestingSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input, specific_product):
        serializer = TaskSerializer()
        res = serializer.load(get_input_data(input, specific_product))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field, specific_product):
        serializer = TaskSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(get_input_data(input, specific_product))
        assert msg in v.value.args[0][field]


    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input, specific_product):
        serializer = TaskSerializer()
        input_data = get_input_data(input, specific_product)

        result = serializer.load(input_data)
        result = serializer.dump(result)
        assert result['title'] == input_data['title']
        assert result['taskType'] == input_data['taskType']
        assert result['description'] == input_data['description']
        assert 'dates' in result
        assert input_data['dates']['startDate'] in result['dates']['startDate']
        assert input_data['dates']['endDate'] in result['dates']['endDate']
        if 'predictedCost' and 'actualCost' in input_data:
            assert result['predictedCost'] == str(input_data['predictedCost'])
            assert result['actualCost'] == str(input_data['actualCost'])


class TestTaskHarvestingListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input, specific_product):
        serializer = TaskListSerializer()
        serializer.load(get_input_data(input, specific_product), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field, specific_product):
        serializer = TaskListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(get_input_data(input, specific_product), many=True)

    @pytest.mark.skip(reason="Updateting the ID of soil and parcel type is not working here.")
    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input, specific_product):
        input_data = get_input_data(input, specific_product)

        serializer = TaskListSerializer()
        result = serializer.load(input_data, many=True)
        print("Load: ", result)
        result = serializer.dump(result, many=True)
        print("dump: ", result)

        for r, i in zip(result, input_data):
            assert r['title'] == i['title']
            assert r['taskType'] == i['taskType']
            assert r['description'] == i['description']
            assert 'dates' in r
            assert i['dates']['startDate'] in r['dates']['startDate']
            assert i['dates']['endDate'] in r['dates']['endDate']
            assert r['predictedCost'] == str(i['predictedCost'])
            assert r['actualCost'] == str(i['actualCost'])




