#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports

# Internal package imports
from backend.database import db
from .base import BaseService
from ..permissions import (
    ANY_PERMISSION,
    ALL_PERMISSIONS,
    PermissionTuple
)


__all__ = ["GroupService"]


class GroupService(BaseService):
    @classmethod
    def get(cls, group_id):
        """
        Fetch row using primary key -
        will use existing object in session if already present

        :param group_id:
        :param db_session:
        :return:
        """
        return db.session.query(cls.model).get(group_id)

    @classmethod
    def by_group_name(cls, group_name):
        """
        fetch group by name

        :param group_name:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model).filter(cls.model.group_name == group_name)
        return query.first()


    @classmethod
    def resources_with_possible_perms(
        cls,
        instance,
        perm_names=None,
        resource_ids=None,
        resource_types=None
    ):
        """
        returns list of permissions and resources for this group,
            resource_ids restricts the search to specific resources

        :param instance:
        :param perm_names:
        :param resource_ids:
        :param resource_types:
        :param db_session:
        :return:
        """

        query = db.session.query(
            cls.models_proxy.GroupResourcePermission.perm_name,
            cls.models_proxy.Group,
            cls.models_proxy.Resource,
        )
        query = query.filter(
            cls.models_proxy.Resource.resource_id
            == cls.models_proxy.GroupResourcePermission.resource_id
        )
        query = query.filter(
            cls.models_proxy.Group.id
            == cls.models_proxy.GroupResourcePermission.group_id
        )
        if resource_ids:
            query = query.filter(
                cls.models_proxy.GroupResourcePermission.resource_id.in_(resource_ids)
            )

        if resource_types:
            query = query.filter(
                cls.models_proxy.Resource.resource_type.in_(resource_types)
            )

        if perm_names not in ([ANY_PERMISSION], ANY_PERMISSION) and perm_names:
            query = query.filter(
                cls.models_proxy.GroupResourcePermission.perm_name.in_(perm_names)
            )
        query = query.filter(
            cls.models_proxy.GroupResourcePermission.group_id == instance.id
        )

        perms = [
            PermissionTuple(
                None, row.perm_name, "group", instance, row.Resource, False, True
            )
            for row in query
        ]
        for resource in instance.resources:
            perms.append(
                PermissionTuple(
                    None, ALL_PERMISSIONS, "group", instance, resource, True, True
                )
            )
        return perms
