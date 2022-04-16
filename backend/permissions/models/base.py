#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa

# Internal package imports
from backend.database import db

class BaseModel(object):
    """ Basic class that all other classes inherit from that supplies some
        basic methods useful for interaction with packages like:
        deform, colander or wtforms """

    @classmethod
    def _get_keys(cls):
        """ returns column names for this model """
        return sa.orm.class_mapper(cls).c.keys()

    @classmethod
    def get_primary_key(cls):
        return sa.orm.class_mapper(cls).primary_key

    def get_dict(self, exclude_keys=None, include_keys=None):
        """
        return dictionary of keys and values corresponding to this model's
        data - if include_keys is null the function will return all keys

        :param exclude_keys: (optional) is a list of columns from model that
        should not be returned by this function
        :param include_keys: (optional) is a list of columns from model that
        should be returned by this function
        :return:
        """
        d = {}
        exclude_keys_list = exclude_keys or []
        include_keys_list = include_keys or []
        for k in self._get_keys():
            if k not in exclude_keys_list and (
                    k in include_keys_list or not include_keys
            ):
                d[k] = getattr(self, k)
        return d

    def get_appstruct(self):
        """ return list of tuples keys and values corresponding to this model's
        data """
        result = []
        for k in self._get_keys():
            result.append((k, getattr(self, k)))
        return result

    def populate_obj(self, appstruct, exclude_keys=None, include_keys=None):
        """
        updates instance properties *for column names that exist*
        for this model and are keys present in passed dictionary

        :param appstruct: (dictionary)
        :param exclude_keys: (optional) is a list of columns from model that
        should not be updated by this function
        :param include_keys: (optional) is a list of columns from model that
        should be updated by this function
        :return:
        """
        exclude_keys_list = exclude_keys or []
        include_keys_list = include_keys or []
        for k in self._get_keys():
            if (
                    k in appstruct
                    and k not in exclude_keys_list
                    and (k in include_keys_list or not include_keys)
            ):
                setattr(self, k, appstruct[k])

    def populate_obj_from_obj(self, instance, exclude_keys=None, include_keys=None):
        """
        updates instance properties *for column names that exist*
        for this model and are properties present in passed dictionary

        :param instance:
        :param exclude_keys: (optional) is a list of columns from model that
        should not be updated by this function
        :param include_keys: (optional) is a list of columns from model that
        should be updated by this function
        :return:
        """
        exclude_keys_list = exclude_keys or []
        include_keys_list = include_keys or []
        for k in self._get_keys():
            if (
                    hasattr(instance, k)
                    and k not in exclude_keys_list
                    and (k in include_keys_list or not include_keys)
            ):
                setattr(self, k, getattr(instance, k))

    def persist(self, flush=False):
        """

        Adds object to session, if the object was freshly created this will
        persist the object in the storage on commit

        :param flush: boolean - if true then the session will be flushed
            instantly
        :param db_session:
        :return:
        """
        db.session.add(self)
        if flush:
            db.session.flush()
