#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Model,
)
from backend.permissions.models import ResourceMixin

class Resource(ResourceMixin, Model):
    # TODO: Implement later
    pass