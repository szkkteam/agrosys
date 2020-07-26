#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports
from backend.crop.models import CropCultivationType, CropVariant, CropBase
from backend.production.models import Production


def set_productions_ownership(user, filter):
    from backend.production.models import Production

    prods = Production.all()
    for prod in prods:
        if prod.title == filter:
            user.resources.append(prod)


@pytest.mark.parametrize("models",['Production(PRODUCTION_TMP_1, PRODUCTION_TMP_2)'], indirect=True)
class TestCropTemplateResource:

    def test_list(self, api_client, farm_owner, farm_user2, models):
        api_client.login_as(farm_owner)

        set_productions_ownership(farm_owner, 'owner')
        set_productions_ownership(farm_user2, 'anonymus')

        r = api_client.get(url_for('api.crop_templates_resource'))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            print(r.json)
            assert False

    def test_list_query_cultivation_type(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        cult_type = CropCultivationType.all()[0]
        r = api_client.get(url_for('api.crop_templates_resource', cultivation_type=cult_type.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e

    def test_list_query_variant(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        variant = CropVariant.all()[0]
        r = api_client.get(url_for('api.crop_templates_resource', variant=variant.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e

    def test_list_query_all_variant(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        cult_type = CropCultivationType.all()[0]
        variant = CropVariant.all()[0]
        base = CropBase.all()[0]
        r = api_client.get(url_for('api.crop_templates_resource', base=base.id, cultivation_type=cult_type.id, variant=variant.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e

