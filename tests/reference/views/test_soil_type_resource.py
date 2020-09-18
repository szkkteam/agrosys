#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for

# Internal package imports


class TestSoilTypeResource:

    def test_get(self, api_client, soil):

        r = api_client.get(url_for('api.soil_type_resource', id=soil.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert soil.id == r.json['id']
        assert soil.title == r.json['title']

    def test_list(self, api_client, soil):

        r = api_client.get(url_for('api.soil_types_resource'))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
