#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy
# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm_management.serializers import SeasonSerializer, SeasonListSerializer

VALID_INPUT_DATA = [
    ({'title': "Season 2020", 'startDate': "2019-1-01", 'endDate': "2019-12-31", 'copyFields': True, 'copyFromSeasonId': 1}),
    ({'title': "Season 2000", 'startDate': "2000-01-1", 'endDate': "2000-11-09"}),
    ({'title': "Season 2220", 'startDate': "2209-05-03", 'endDate': "2020-3-3"}),
]

INVALID_INPUT_DATA = [
    ({'title': None, 'startDate': "2019-1-01", 'endDate': "2019-12-31"}, 'Field cannot be null.', 'title'),
    ({'title': "Season 2220", 'startDate': None, 'endDate': "2019-12-31"}, 'Field cannot be null.', 'startDate'),
    ({'title': "Season 2220", 'startDate': "2019-1-01", 'endDate': None}, 'Field cannot be null.', 'startDate'),
    ({'title': "Season 2020", 'startDate': "2019-1-01", 'endDate': "2019-12-31", 'copyFields': True}, 'Field cannot be null.', 'copyFields'),
    #({'title': "Season 2020", 'startDate': "2019-1-01", 'endDate': "2019-12-31", 'copyFields': False, 'copyFromSeasonId': 1}, 'Field cannot be null.', 'copyFields'),
    ({'title': "Season 2020", 'startDate': "2019-1-01", 'endDate': "2019-12-31", 'copyFields': True, 'copyFromSeasonId': None}, 'Field cannot be null.', 'copyFields'),
]

"""
VALID_INPUT_DATA_LIST = [
    ([{'value': 0.0, 'shape': VALID_GEOJSON},
      {'value': 0.0, 'shape': VALID_GEOJSON}]),
    ([{'value': None, 'shape': VALID_GEOJSON},
      {'value': None, 'shape': VALID_GEOJSON},]),
    ([{'value': 100.999, 'shape': VALID_GEOJSON},
      {'value': 100.999, 'shape': VALID_GEOJSON}]),
]

INVALID_INPUT_DATA_LIST = [
    ([{'value': 0.0, 'shape': INVALID_GEOJSON},
      {'value': 0.0, 'shape': INVALID_GEOJSON}], 'Expecting a Feature object', 'shape'),
    ([{'value': 0.0, 'shape': INVALID_GEOJSON},
      {'value': 0.0, 'shape': INVALID_GEOJSON}], 'Expecting a Feature object', 'shape'),
]
"""

class TestSeasonSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = SeasonSerializer()
        r = serializer.load(copy.deepcopy(input))
        assert 'title' in r
        assert 'start_date' in r
        assert 'end_date' in r
        if 'copy_fields' in r and r.get('copy_fields'):
            assert 'copy_from_season_id' in r


    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = SeasonSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input))
        assert msg in v.value.args[0][field]
