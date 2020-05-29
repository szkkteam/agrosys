#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports

NEW_USER_DATA = dict(
    username='newUser',
    email='new@example.com',
    firstName='new',
    lastName='user',
    password='password',
)


@pytest.mark.usefixtures('user')
class TestProfileResource:

    @pytest.mark.options(SECURITY_CONFIRMABLE=False)
    def test_get_profile(self, api_client, outbox, templates):
        from backend.security.models import User

        r = api_client.post(url_for('api.users_resource'), data=NEW_USER_DATA)
        assert r.status_code == 201
        assert current_user == User.get(r.json['user']['id'])

        user = User.get(r.json['user']['id'])
        print("Profile: ", user.profile)
        r = api_client.get(url_for('api.profile_resource', id=user.id))
        assert r.status_code == 200
