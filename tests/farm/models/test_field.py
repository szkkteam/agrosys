#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import Field

FIELD_DATA = {'title': 'test farm 1'}


@pytest.mark.usefixtures('db_session')
class TestFieldModels:
    def test_name_required(self):
        data = FIELD_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            Field.create(**data, commit=True)

