#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import pytest

@pytest.fixture()
def crop_template(model_factory):
    yield model_factory.create('CropTemplate', 'CROP_TEMPLATE_1')
