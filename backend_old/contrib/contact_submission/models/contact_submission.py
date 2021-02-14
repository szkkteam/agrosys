#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
)

class ContactSubmission(Model):
    name = Column(String(64))
    email = Column(String(50), index=True)
    message = Column(String(500))

    __repr_props__ = ('email', 'name')
