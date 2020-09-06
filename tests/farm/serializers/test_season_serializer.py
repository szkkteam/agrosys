#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import SeasonSerializer, SeasonListSerializer


VALID_INPUT_DATA = [
    ({'title': 'Season 2019'}),
    ({'title': None}),
    ({'title': 'Season #$!"1'}),
]
"""
INVALID_INPUT_DATA = [
    ({'title': None, 'cropTemplateId': 1}, 'Field may not be null.', 'title'),
    ({'title': 'Production invalid', 'cropTemplateId': None }, 'Field may not be null.', 'cropTemplateId'),
    ({'title': 'Production invalid', 'cropTemplateId': 999 }, 'ID 999 does not exist.', 'cropTemplateId'),
    #({'title': 'test field 2', }, 'Field may not be null.', 'fields'),
]
"""

VALID_INPUT_DATA_LIST = [
    [({'title': 'Season 2019'}),
    ({'title': None}),],
    [({'title': 'Season 2019'}),
    ({'title': 'Season #$!"1'}),]
]
"""
INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'cropTemplateId': 1},
      {'title': None, 'cropTemplateId': 1},], 'Field may not be null.', 'title'),
    ([{'title': 'Production invalid', 'cropTemplateId': None },
      {'title': 'Production invalid', 'cropTemplateId': None },], 'Field may not be null.', 'cropTemplateId'),
]
"""


class TestSeasonSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = SeasonSerializer()
        serializer.load(copy.deepcopy(input))
    """
    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field, crop_template):
        serializer = PlanSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_production_data(input, crop_template)))
        assert msg in v.value.args[0][field]
    """

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = SeasonSerializer()
        result = serializer.load(input)
        result = serializer.dump(result)
        assert result['title'] == input['title']



class TestSeasonListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = SeasonListSerializer()
        serializer.load(input, many=True)

    """
    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field, crop_template):
        serializer = SeasonListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_production_data(input, crop_template)), many=True)
    """

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        serializer = SeasonListSerializer()
        result = serializer.load(input, many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input):
            assert r['title'] == i['title']
