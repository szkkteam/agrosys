#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import FieldDetail

FIELD_DATA_DATA = {'value': 5.0,
              'shape': 'SRID=900913;POLYGON((0 0,1 0,1 1,0 1,0 0))'}


@pytest.mark.usefixtures('db_session')
class TestFieldDataModels:

    def test_shape_required(self):
        data = FIELD_DATA_DATA.copy()
        data['shape'] = None
        with pytest.raises(IntegrityError):
            FieldDetail.create(**data, commit=True)