#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for

# Internal package imports


class TestReferenceParcelTypeResource:

    def test_get(self, api_client, agri_parcel):

        r = api_client.get(url_for('api.reference_parcel_type_resource', id=agri_parcel.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'code' in r.json
        assert agri_parcel.id == r.json['id']
        assert agri_parcel.title == r.json['title']

    def test_list(self, api_client, agri_parcel):

        r = api_client.get(url_for('api.reference_parcel_types_resource'))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
