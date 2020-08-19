#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.reference.models import ReferenceParcelType, ReferenceParcelTypeEnum

DATA = {'title': 'Ton', 'code': ReferenceParcelTypeEnum.AgriculturalParcel, 'description': 'some text'}


@pytest.mark.usefixtures('db_session')
class TestReferenceParcelTypeModels:
    def test_title_required(self):
        data = DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            ReferenceParcelType.create(**data, commit=True)
