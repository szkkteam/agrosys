#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports
from backend.farm.models import CropCultivationType, CropBase

@pytest.mark.parametrize("models",['CropVariant(CROP_VARIANT_1), CropVariant(CROP_VARIANT_2)'], indirect=True)
class TestCropVariantResource:

    def test_list(self, api_client, user, models):
        api_client.login_user()

        r = api_client.get(url_for('api.crop_variants_resource'))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'latin' in e
            assert 'description' in e


@pytest.mark.parametrize("models",['CropTemplate(CROP_TEMPLATE_1, CROP_TEMPLATE_2, CROP_TEMPLATE_3, CROP_TEMPLATE_4, CROP_TEMPLATE_5, CROP_TEMPLATE_6)'], indirect=True)
class TestCropVariantQueryResource:

    def test_list_query_crop_base(self, api_client, user, models):
        api_client.login_user()

        crop_base = CropBase.all()[0]
        r = api_client.get(url_for('api.crop_variants_resource', base=crop_base.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'latin' in e
            assert 'description' in e

    def test_list_query_cultivation_type(self, api_client, user, models):
        api_client.login_user()

        cult_type = CropCultivationType.all()[0]
        r = api_client.get(url_for('api.crop_variants_resource', cultivation_type=cult_type.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'latin' in e
            assert 'description' in e

    def test_list_query_crop_base_cultivation_type(self, api_client, user, models):
        api_client.login_user()

        crop_base = CropBase.all()[0]
        cult_type = CropCultivationType.all()[0]
        r = api_client.get(url_for('api.crop_variants_resource', base=crop_base.id, cultivation_type=cult_type.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'latin' in e
            assert 'description' in e
