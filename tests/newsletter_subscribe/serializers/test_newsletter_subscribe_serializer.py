#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.contrib.newsletter_subscribe.serializers import NewsletterSubscribeSerializer

VALID_INPUT_DATA = [
    ({'email': 'foobar@example.com', 'isActive': True}),
    ({'email': 'foobar@example.com', 'isActive': False}),
    ({'email': 'foobar@example.com', 'isActive': None}),
]

INVALID_INPUT_DATA = [
    ({'email': 'foobarexample.com', 'isActive': True}, 'Not a valid email address.', 'email'),
    ({'email': 'foobar@examplecom', 'isActive': True}, 'Not a valid email address.', 'email'),
    ({'email': 'foobarexamplecom', 'isActive': False}, 'Not a valid email address.', 'email'),
    ({'email': 'foobar@example.com', 'isActive': 'foobar'}, 'Not a valid boolean.', 'isActive'),
    ({'email': 'foobar@example.com', 'isActive': 13}, 'Not a valid boolean.', 'isActive'),
    ({'email': None, 'isActive': True}, 'Field may not be null.', 'email'),
]

@pytest.mark.parametrize("input", VALID_INPUT_DATA)
def test_valid_inputs(input):
    serializer = NewsletterSubscribeSerializer()
    serializer.load(input)

@pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
def test_invalid_inputs(input, msg, field):
    serializer = NewsletterSubscribeSerializer()
    with pytest.raises(ValidationError) as v:
        serializer.load(input)
    assert msg in v.value.args[0][field]


