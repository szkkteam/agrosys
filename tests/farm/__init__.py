#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
# Internal package imports


def get_input_data(input, *args):
    data = input.copy()
    if isinstance(input, list):
        for i, v in enumerate(data):
            for key, value in v.items():
                v[key] = value(*args) if callable(value) else value
            data[i] = v

    else:
        for key, value in data.items():
            data[key] = value(*args) if callable(value) else value

    return data