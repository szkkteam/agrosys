#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import ProductionSerializer, ProductionListSerializer


TASK_GENERAL = {
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

VALID_INPUT_DATA = [
    ({'title': 'Template 1', }),
    ({'title': 'Template 2 with tasks', 'tasks': [TASK_GENERAL, TASK_GENERAL]}),
    ({'title': 'Template #$!"1', }),
]

INVALID_INPUT_DATA = [
    ({'title': None, }, 'Field may not be null.', 'title'),
    #({'title': 'Template invalid', }, 'Field may not be null.', 'cropTemplateId'),
    #({'title': 'Template invalid', }, 'ID 999 does not exist.', 'cropTemplateId'),
    #({'title': 'test field 2', }, 'Field may not be null.', 'fields'),
]

VALID_INPUT_DATA_LIST = [
    ([{'title': 'Template 1', },
      {'title': 'Template 2', },]),
    ([{'title': 'Template 1', },
      {'title': 'Template #$!"1', },]),
    ([{'title': 'Template 2 with tasks', 'tasks': [TASK_GENERAL, TASK_GENERAL] },
      {'title': 'Template #$!"1', },]),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, },
      {'title': None, },], 'Field may not be null.', 'title'),
]


def get_input_data(input):
    data = input.copy()
    return data

class TestProductionSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = ProductionSerializer()
        serializer.load(copy.deepcopy(get_input_data(input)))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = ProductionSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input)))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = ProductionSerializer()
        input_data = get_input_data(input)

        result = serializer.load(input_data)
        result = serializer.dump(result)
        assert 'title' in result
        assert 'tasks' in result
        assert result['title'] == input_data['title']

        if 'tasks' in input_data:
            assert len(result['tasks'])

class TestTemplateListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = ProductionListSerializer()
        serializer.load(copy.deepcopy(get_input_data(input)), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = ProductionListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input)), many=True)

    @pytest.mark.skip(reason="Updateting the ID of crop_template is not working here.")
    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = ProductionListSerializer()
        result = serializer.load(get_input_data(input), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert 'title' in r
            assert 'tasks' in r
            assert r['title'] == i['title']

            if 'tasks' in i:
                assert len(r['tasks'])
