#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import Template

PRODUCTION_DATA = {'title': 'corn 2017', 'crop_template_id': 1}


@pytest.mark.usefixtures('db_session')
class TestPlanModels:
    def test_name_required(self):
        data = PRODUCTION_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            Template.create(**data, commit=True)

    def test_crop_template_id_required(self):
        data = PRODUCTION_DATA.copy()
        data['crop_template_id'] = None
        with pytest.raises(IntegrityError):
            Template.create(**data, commit=True)