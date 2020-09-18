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

class ProxiedDictMixin(object):
    """Adds obj[key] access to a mapped class.

    This class basically proxies dictionary access to an attribute
    called ``_proxied``.  The class which inherits this class
    should have an attribute called ``_proxied`` which points to a dictionary.

    """

    def __len__(self):
        return len(self._proxied)

    def __iter__(self):
        return iter(self._proxied)

    def __getitem__(self, key):
        return self._proxied[key]

    def __contains__(self, key):
        return key in self._proxied

    def __setitem__(self, key, value):
        self._proxied[key] = value

    def __delitem__(self, key):
        del self._proxied[key]
