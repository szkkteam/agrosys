#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.crop.models import Unit

UNIT_DATA = {'title': 'Ton'}


@pytest.mark.usefixtures('db_session')
class TestCropBaseModels:
    def test_name_required(self):
        data = UNIT_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            Unit.create(**data, commit=True)

