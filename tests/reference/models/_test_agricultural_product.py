#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
#from backend.reference.models import AgriculturalProduct

DATA = {'title': 'Some Region', 'so_id': 'P_1_1_99', 'so_unit': 'EUR_per_ha'}

"""
@pytest.mark.usefixtures('db_session')
class TestAgriculturalProductModels:
    def test_so_id_required(self):
        data = DATA.copy()
        data['so_id'] = None
        with pytest.raises(IntegrityError):
            AgriculturalProduct.create(**data, commit=True)

    def test_so_unit_required(self):
        data = DATA.copy()
        data['so_unit'] = None
        with pytest.raises(IntegrityError):
            AgriculturalProduct.create(**data, commit=True)
"""