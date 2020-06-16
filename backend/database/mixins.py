#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from sqlalchemy import func

# Internal package imports
from .column import Column
from .types import BigInteger, DateTime


class PrimaryKeyMixin(object):
    """
    Adds an :attr:`id` primary key column to a Model
    """
    id = Column(BigInteger, primary_key=True, autoincrement=True)


class TimestampMixin(object):
    """
    Adds automatically timestamped :attr:`created_at` and :attr:`updated_at`
    columns to a Model
    """
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

