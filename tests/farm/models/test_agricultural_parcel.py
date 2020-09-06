#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import AgriculturalParcel

DATA = {'title': 'test farm 1', 'geometry': 'SRID=900913;POLYGON((0 0,1 0,1 1,0 1,0 0))'}


@pytest.mark.usefixtures('db_session')
class TestAgriculturalParcelModels:
    def test_title_required(self):
        data = DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            AgriculturalParcel.create(**data, commit=True)

