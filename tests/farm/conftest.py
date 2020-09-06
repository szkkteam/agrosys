#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import pytest

@pytest.fixture()
def specific_product(model_factory):
    yield model_factory.create('SpecificProduct', 'SPECIFIC_SPRING_WHEAT')
