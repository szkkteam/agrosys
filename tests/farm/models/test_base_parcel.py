#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import BaseParcel

FIELD_DATA_DATA = {'area': 5.0,
              'geometry': 'SRID=900913;POLYGON((0 0,1 0,1 1,0 1,0 0))'}


@pytest.mark.usefixtures('db_session')
class TestBaseParcelModels:

    def test_geometry_required(self):
        data = FIELD_DATA_DATA.copy()
        data['geometry'] = None
        with pytest.raises(IntegrityError):
            BaseParcel.create(**data, commit=True)