#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import db
from .base import BaseService


__all__ = ["GroupResourcePermissionService"]


class GroupResourcePermissionService(BaseService):
    @classmethod
    def get(cls, group_id, resource_id, perm_name):
        """
        Fetch row using primary key -
        will use existing object in session if already present

        :param group_id:
        :param resource_id:
        :param perm_name:
        :param db_session:
        :return:
        """
        return db.session.query(cls.model).get([group_id, resource_id, perm_name])
