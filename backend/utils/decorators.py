#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports

def was_decorated_without_parenthesis(args):
    return args and callable(args[0])
