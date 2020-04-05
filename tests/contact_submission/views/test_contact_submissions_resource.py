#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for

# Internal package imports

TEST_DATA = {'name': 'foobar', 'email': 'foobar@example.com', 'message': 'Hello world'}

def test_create_contact_submission(api_client, outbox, templates):
    r = api_client.post(url_for('api.contact_submissions_resource'),
                        data=TEST_DATA)
    assert r.status_code == 201
    assert r.json['id']
    assert r.json['name'] == 'foobar'
    assert len(outbox) == len(templates) == 1
    assert templates[0].template.name == 'email/contact_submission.html'



def test_contact_submission_validation_all_wrong(api_client):
    r = api_client.post(url_for('api.contact_submissions_resource'),
                        data=dict(name=None, email=None, message=None))

    assert r.status_code == 400
    print(r.errors)
    assert 'name' in r.json['errors'], 'name should be required'
    assert 'email' in r.json['errors'], 'email should be required'
    assert 'message' in r.json['errors'], 'message should be required'

def test_contact_submission_validation_email_Wrong(api_client):
    test_data = TEST_DATA.copy()
    test_data['email'] = None
    r = api_client.post(url_for('api.contact_submissions_resource'),
                        data=test_data)

    assert r.status_code == 400
    print(r.errors)
    assert 'email' in r.json['errors'], 'email should be required'

def test_contact_submission_validation_message_Wrong(api_client):
    test_data = TEST_DATA.copy()
    test_data['message'] = None
    r = api_client.post(url_for('api.contact_submissions_resource'),
                        data=test_data)

    assert r.status_code == 400
    print(r.errors)
    assert 'message' in r.json['errors'], 'email should be required'