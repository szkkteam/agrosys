#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import TaskHarvesting

TASK_DATA = {'title': 'Harvest Task', 'description': 'Some text'}


@pytest.mark.usefixtures('db_session')
class TestTaskHarvestingModels:
    def test_title_required(self):
        data = TASK_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            TaskHarvesting.create(**data, commit=True)
