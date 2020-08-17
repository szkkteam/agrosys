#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports
from backend.farm.models import CropCultivationType, CropVariant

@pytest.mark.parametrize("models",['CropBase(CROP_BASE_CORN), CropBase(CROP_BASE_WHEAT)'], indirect=True)
class TestCropBaseResource:

    def test_list(self, api_client, user, models):
        api_client.login_user()

        r = api_client.get(url_for('api.crop_bases_resource'))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'description' in e
            assert 'unit' in e

@pytest.mark.parametrize("models",['CropTemplate(CROP_TEMPLATE_1, CROP_TEMPLATE_2, CROP_TEMPLATE_3, CROP_TEMPLATE_4, CROP_TEMPLATE_5, CROP_TEMPLATE_6)'], indirect=True)
class TestCropBaseQueryResource:

    def test_list_query_cultivation_type(self, api_client, user, models):
        api_client.login_user()

        cult_type = CropCultivationType.all()[0]
        r = api_client.get(url_for('api.crop_bases_resource', cultivation_type=cult_type.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'description' in e
            assert 'unit' in e

    def test_list_query_variant(self, api_client, user, models):
        api_client.login_user()

        variant = CropVariant.all()[0]
        r = api_client.get(url_for('api.crop_bases_resource', variant=variant.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'description' in e
            assert 'unit' in e

    def test_list_query_cultivation_type_variant(self, api_client, user, models):
        api_client.login_user()

        cult_type = CropCultivationType.all()[0]
        variant = CropVariant.all()[0]
        r = api_client.get(url_for('api.crop_bases_resource', cultivation_type=cult_type.id, variant=variant.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'description' in e
            assert 'unit' in e