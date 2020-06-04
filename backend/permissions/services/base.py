#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import db

class BaseService(object):
    model = None
    models_proxy = None

    @classmethod
    def all(cls, klass):
        """
        returns all objects of specific type - will work correctly with
        sqlalchemy inheritance models, you should normally use models
        base_query()  instead of this function its for bw. compat purposes

        :param klass:
        :param db_session:
        :return:
        """
        return db.session.query(klass)

    @classmethod
    def base_query(cls):
        """
        returns base query for specific service

        :param db_session:
        :return: query
        """
        return db.session.query(cls.model)
