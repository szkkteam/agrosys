#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm_management .models import Profile

PROFILE_DATA = {'id': '1', 'display_name': 'test name'}



@pytest.mark.usefixtures('db_session')
class TestFarmModels:
    def test_user_id_required(self):
        data = PROFILE_DATA.copy()
        data['id'] = None
        with pytest.raises(IntegrityError):
            Profile.create(**data, commit=True)

