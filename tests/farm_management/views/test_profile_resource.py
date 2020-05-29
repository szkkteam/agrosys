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
    def test_create_get_profile(self, api_client, outbox, templates):
        from backend.security.models import User

        r = api_client.post(url_for('api.users_resource'), data=NEW_USER_DATA)
        assert r.status_code == 201
        assert current_user == User.get(r.json['user']['id'])

        user = User.get(r.json['user']['id'])
        r = api_client.get(url_for('api.profile_resource', id=user.id))
        assert r.status_code == 200
        assert 'displayName' in r.json
        assert NEW_USER_DATA['username'] == r.json['displayName']

    def test_login_get_profile(self, api_client, user):
        api_client.login_user()

        r = api_client.get(url_for('api.profile_resource', id=user.id))
        assert r.status_code == 200
        assert 'displayName' in r.json
        assert user.username == r.json['displayName']

    def test_anonymus_get_profile(self, api_client, user):
        r = api_client.get(url_for('api.profile_resource', id=user.id))
        assert r.status_code == 401

    def test_login_patch_profile(self, api_client, user):
        api_client.login_user()
        new_name = 'new name'

        r = api_client.patch(url_for('api.profile_resource', id=user.id), data=dict(displayName=new_name))
        assert r.status_code == 200
        assert 'displayName' in r.json
        assert new_name == r.json['displayName']

    def test_anonymus_patch_profile(self, api_client, user):
        new_name = 'new name'

        r = api_client.patch(url_for('api.profile_resource', id=user.id), data=dict(displayName=new_name))
        assert r.status_code == 401