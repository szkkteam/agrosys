#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import url_for

# Internal package imports

def test_check_auth_token(api_client, user):
    r = api_client.get(url_for('api.check_auth_token'),
                       headers={'Authentication-Token': user.get_auth_token()})
    assert r.status_code == 200
    assert 'user' in r.json
    assert r.json['user']['id'] == user.id
