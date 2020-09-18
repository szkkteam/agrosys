#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import TaskSerializer, TaskListSerializer

TASK_GENERAL_1 = {
    'title': 'task general',
    'taskType': 'TaskGeneral',
    'description': 'some text',
    'dates': {
        'startDate': '2020-07-21T20:00:00',
        'endDate': '2020-07-22T20:00:00',
    },
    'predictedCost': 1,
    'status': 'Pending',
    'actualCost': 2,
}


TASK_GENERAL_NO_COST = {
    'title': 'task general',
    'taskType': 'TaskGeneral',
    'description': 'some text',
    'dates': {
        'startDate': '2020-07-21T20:00:00',
        'endDate': '2020-07-22T20:00:00',
    },
    'status': 'Pending',
}



TASK_GENERAL_COST_NULL = {
    'title': 'task general',
    'taskType': 'TaskGeneral',
    'description': 'some text',
    'dates': {
        'startDate': '2020-07-21T20:00:00',
        'endDate': '2020-07-22T20:00:00',
    },
    'status': 'Pending',
    'actualCost': None,
    'predictedCost': None,
}


TASK_PRUNING_1 = {
    'title': 'task general',
    'taskType': 'TaskPruning',
    'description': 'some text',
    'dates': {
        'startDate': '2020-07-21T20:00:00',
        'endDate': '2020-07-22T20:00:00',
    },
    'predictedCost': 1,
    'status': 'Pending',
    'actualCost': 2,
}

TASK_INVALID_TASK_TYPE = {
    'title': 'task general',
    'taskType': 'TaskRandom',
    'description': 'some text',
    'dates': {
        'startDate': '2020-07-21T20:00:00',
        'endDate': '2020-07-22T20:00:00',
    },
    'predictedCost': 1,
    'status': 'Pending',
    'actualCost': 2,
}


TASK_INVALID_DATETIME = {
    'title': 'task general',
    'taskType': 'TaskPruning',
    'description': 'some text',
    'dates': {
        'startDate': 'cicamica',
        'endDate': '2020-07-22T20:00:00',
    },
    'predictedCost': 1,
    'status': 'Pending',
    'actualCost': 2,
}

VALID_INPUT_DATA = [
    TASK_GENERAL_1, TASK_PRUNING_1, TASK_GENERAL_NO_COST, TASK_GENERAL_COST_NULL
]

INVALID_INPUT_DATA = [
    (TASK_INVALID_TASK_TYPE, 'Unsupported value: TaskRandom', 'taskType'),
    (TASK_INVALID_DATETIME, 'Not a valid datetime.', 'startDate'),
]

VALID_INPUT_DATA_LIST = [
    ([TASK_GENERAL_1,
      TASK_PRUNING_1,])
]

INVALID_INPUT_DATA_LIST = [
    ([TASK_INVALID_TASK_TYPE, TASK_INVALID_DATETIME], 'Field may not be null.', 'title'),
]

class TestTaskSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = TaskSerializer()
        res = serializer.load(copy.deepcopy(input.copy()))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = TaskSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input.copy()))
        assert msg in v.value.args[0][field]


    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = TaskSerializer()
        input_data = input.copy()

        result = serializer.load(input)
        result = serializer.dump(result)
        assert result['title'] == input_data['title']
        assert result['taskType'] == input_data['taskType']
        assert result['description'] == input_data['description']
        assert 'dates' in result
        assert input_data['dates']['startDate'] in result['dates']['startDate']
        assert input_data['dates']['endDate'] in result['dates']['endDate']
        if 'predictedCost' and 'actualCost' in input_data:
            if result['predictedCost']:
                assert result['predictedCost'] == str(input_data['predictedCost'])
            if result['actualCost']:
                assert result['actualCost'] == str(input_data['actualCost'])


class TestTaskListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = TaskListSerializer()
        serializer.load(copy.deepcopy(input), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = TaskListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = TaskListSerializer()
        result = serializer.load(input, many=True)
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
            if r['predictedCost']:
                assert r['predictedCost'] == str(i['predictedCost'])
            if r['actualCost']:
                assert r['actualCost'] == str(i['actualCost'])




