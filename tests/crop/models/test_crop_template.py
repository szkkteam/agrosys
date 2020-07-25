#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.crop.models import CropTemplate

CROP_DATA = {'crop_base_id': 1, 'crop_cultivation_type_id': 1, 'crop_variant_id': 1}


@pytest.mark.usefixtures('db_session')
class TestCropBaseModels:
    def test_crop_base_id_required(self):
        data = CROP_DATA.copy()
        data['crop_base_id'] = None
        with pytest.raises(IntegrityError):
            CropTemplate.create(**data, commit=True)

    def test_crop_cultivation_type_required(self):
        data = CROP_DATA.copy()
        data['crop_cultivation_type_id'] = None
        with pytest.raises(IntegrityError):
            CropTemplate.create(**data, commit=True)

    def test_crop_variant_required(self):
        data = CROP_DATA.copy()
        data['crop_variant_id'] = None
        with pytest.raises(IntegrityError):
            CropTemplate.create(**data, commit=True)