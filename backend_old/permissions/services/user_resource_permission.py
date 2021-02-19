#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import db
from .base import BaseService


__all__ = ["UserResourcePermissionService"]


class UserResourcePermissionService(BaseService):
    @classmethod
    def get(cls, user_id, resource_id, perm_name):
        """
        Fetch row using primary key -
        will use existing object in session if already present

        :param user_id:
        :param resource_id:
        :param perm_name:
        :param db_session:
        :return:
        """
        return db.session.query(cls.model).get([user_id, resource_id, perm_name])

    @classmethod
    def by_resource_user_and_perm(
        cls, user_id, perm_name, resource_id):
        """
        return all instances by user name, perm name and resource id

        :param user_id:
        :param perm_name:
        :param resource_id:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model).filter(cls.model.user_id == user_id)
        query = query.filter(cls.model.resource_id == resource_id)
        query = query.filter(cls.model.perm_name == perm_name)
        return query.first()