#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import CropBase

CROP_DATA = {'title': 'Corn', 'description': 'Some text', 'base_yield': 1.0, 'unit_id': 1}


@pytest.mark.usefixtures('db_session')
class TestCropBaseModels:
    def test_name_required(self):
        data = CROP_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            CropBase.create(**data, commit=True)

    def test_base_yield_required(self):
        data = CROP_DATA.copy()
        data['base_yield'] = None
        with pytest.raises(IntegrityError):
            CropBase.create(**data, commit=True)

    def test_unit_id_required(self):
        data = CROP_DATA.copy()
        data['unit_id'] = None
        with pytest.raises(IntegrityError):
            CropBase.create(**data, commit=True)