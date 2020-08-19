#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import PlanSerializer, PlanListSerializer


VALID_INPUT_DATA = [
    ({'title': 'Production 1', 'useAsTemplate': True, 'cropTemplateId': 1}),
    ({'title': 'Production 2', 'useAsTemplate': False, 'cropTemplateId': 1 }),
    ({'title': 'Production #$!"1', 'cropTemplateId': 1 }),
]

INVALID_INPUT_DATA = [
    ({'title': None, 'cropTemplateId': 1}, 'Field may not be null.', 'title'),
    ({'title': 'Production invalid', 'cropTemplateId': None }, 'Field may not be null.', 'cropTemplateId'),
    ({'title': 'Production invalid', 'cropTemplateId': 999 }, 'ID 999 does not exist.', 'cropTemplateId'),
    #({'title': 'test field 2', }, 'Field may not be null.', 'fields'),
]

VALID_INPUT_DATA_LIST = [
    ([{'title': 'Production 1', 'useAsTemplate': True, 'cropTemplateId': 1},
      {'title': 'Production 2', 'useAsTemplate': False, 'cropTemplateId': 1 },]),
    ([{'title': 'Production 1', 'useAsTemplate': True, 'cropTemplateId': 1},
      {'title': 'Production #$!"1', 'cropTemplateId': 1 },]),
    ([{'title': 'Production 2', 'useAsTemplate': False, 'cropTemplateId': 1 },
      {'title': 'Production #$!"1', 'cropTemplateId': 1 },]),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'cropTemplateId': 1},
      {'title': None, 'cropTemplateId': 1},], 'Field may not be null.', 'title'),
    ([{'title': 'Production invalid', 'cropTemplateId': None },
      {'title': 'Production invalid', 'cropTemplateId': None },], 'Field may not be null.', 'cropTemplateId'),
]


def get_production_data(input, crop_template):

    def fix_crop_template(d):
        if not d['cropTemplateId']:
            return None
        elif d['cropTemplateId'] == 999:
            return 999
        else:
            return crop_template.id

    data = input.copy()

    if isinstance(input, list):
        for i, v in enumerate(input):
            v['cropTemplateId'] = fix_crop_template(v)
    else:
        data['cropTemplateId'] = fix_crop_template(data)

    return data

class TestPlanSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input, crop_template):
        serializer = PlanSerializer()
        serializer.load(copy.deepcopy(get_production_data(input, crop_template)))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field, crop_template):
        serializer = PlanSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_production_data(input, crop_template)))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input, crop_template):
        serializer = PlanSerializer()
        input_data = get_production_data(input, crop_template)

        result = serializer.load(input_data)
        result = serializer.dump(result)
        assert result['title'] == input_data['title']
        assert result['cropTemplateId'] == input_data['cropTemplateId']



class TestPlanListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input, crop_template):
        serializer = PlanListSerializer()
        serializer.load(copy.deepcopy(get_production_data(input, crop_template)), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field, crop_template):
        serializer = PlanListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_production_data(input, crop_template)), many=True)


    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input, crop_template):
        input_data = copy.deepcopy(input)

        serializer = PlanListSerializer()
        result = serializer.load(get_production_data(input, crop_template), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']
            assert r['cropTemplateId'] == i['cropTemplateId']
