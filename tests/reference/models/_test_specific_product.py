#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.reference.models import SpecificProduct

DATA = {'title': 'Some specific wheat', 'description': 'Some text', 'base_yield': 1.0}


@pytest.mark.usefixtures('db_session')
class TestSpecificProductModels:
    def test_base_yield_required(self):
        data = DATA.copy()
        data['base_yield'] = None
        with pytest.raises(IntegrityError):
            SpecificProduct.create(**data, commit=True)
