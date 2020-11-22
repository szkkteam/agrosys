#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import TaskGeneral

TASK_DATA = {'title': 'General Task', 'description': 'Some text'}


@pytest.mark.usefixtures('db_session')
class TestTaskGeneralModels:
    def test_title_required(self):
        data = TASK_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            TaskGeneral.create(**data, commit=True)
