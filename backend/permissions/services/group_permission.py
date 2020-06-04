#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import db
from .base import BaseService


__all__ = ["GroupPermissionService"]


class GroupPermissionService(BaseService):
    @classmethod
    def get(cls, group_id, perm_name):
        """
        Fetch row using primary key -
        will use existing object in session if already present

        :param group_id:
        :param perm_name:
        :param db_session:
        :return:
        """
        return db.session.query(cls.model).get([group_id, perm_name])

    @classmethod
    def by_group_and_perm(cls, group_id, perm_name):
        """
        return by by_user_and_perm and permission name

        :param group_id:
        :param perm_name:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model).filter(cls.model.group_id == group_id)
        query = query.filter(cls.model.perm_name == perm_name)
        return query.first()
