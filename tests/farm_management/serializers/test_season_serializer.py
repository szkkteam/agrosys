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
"""
VALID_INPUT_DATA_LIST = [
    ([{'value': 0.0, 'shape': VALID_GEOJSON},
      {'value': 0.0, 'shape': VALID_GEOJSON}]),
    ([{'value': None, 'shape': VALID_GEOJSON},
      {'value': None, 'shape': VALID_GEOJSON},]),
    ([{'value': 100.999, 'shape': VALID_GEOJSON},
      {'value': 100.999, 'shape': VALID_GEOJSON}]),
]

INVALID_INPUT_DATA = [
    #({'name': None, 'value': 0.0, 'shape': VALID_GEOJSON}, 'Field may not be null.', 'name'),
    ({'value': 0.0, 'shape': INVALID_GEOJSON}, 'Expecting a Feature object', 'shape'),
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

