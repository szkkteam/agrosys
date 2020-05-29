#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports

def was_decorated_without_parenthesis(args):
    return args and callable(args[0])

class DecoratorGenerator(object):

    def __init__(self, _obj=None, *args, **kwargs):
        self._kwargs = kwargs
        self._args = args

        self._obj = _obj

    def __call__(self, *local_args, **local_kw):
        self._kwargs = { **self._kwargs, **local_kw }
        return self._obj(*(self._args + local_args), **self._kwargs)
