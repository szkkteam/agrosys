#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.crop.models import CropVariant

CROP_DATA = {'title': 'Corn Cultivation Type 1', 'latin': 'Latin text', 'description': 'Some text', 'yield_modifier': 1.0}


@pytest.mark.usefixtures('db_session')
class TestCropBaseModels:
    def test_name_required(self):
        data = CROP_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            CropVariant.create(**data, commit=True)

    def test_latin_required(self):
        data = CROP_DATA.copy()
        data['latin'] = None
        with pytest.raises(IntegrityError):
            CropVariant.create(**data, commit=True)

    def test_yield_modifier_required(self):
        data = CROP_DATA.copy()
        data['yield_modifier'] = None
        with pytest.raises(IntegrityError):
            CropVariant.create(**data, commit=True)