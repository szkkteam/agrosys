#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.reference.models import Country

DATA = {'title': 'Hungary', 'iso2': 'HU', 'iso3': 'HUN'}


@pytest.mark.usefixtures('db_session')
class TestCountryModels:
    def test_iso2_required(self):
        data = DATA.copy()
        data['iso2'] = None
        with pytest.raises(IntegrityError):
            Country.create(**data, commit=True)

    def test_iso3_required(self):
        data = DATA.copy()
        data['iso3'] = None
        with pytest.raises(IntegrityError):
            Country.create(**data, commit=True)
