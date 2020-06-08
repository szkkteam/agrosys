#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa

# Internal package imports
from backend.database import db
from .base import BaseService
from ..permissions import (
    ANY_PERMISSION,
    ALL_PERMISSIONS,
    PermissionTuple,
    resource_permissions_for_users
)



__all__ = ["ResourceService"]


class ResourceService(BaseService):
    @classmethod
    def get(cls, resource_id):
        """
        Fetch row using primary key -
        will use existing object in session if already present

        :param resource_id:
        :param db_session:
        :return:
        """
        return db.session.query(cls.model).get(resource_id)

    @classmethod
    def perms_for_user(cls, instance, user, db_session=None):
        """
        returns all permissions that given user has for this resource
            from groups and directly set ones too

        :param instance:
        :param user:
        :param db_session:
        :return:
        """
        query = db.session.query(
            cls.models_proxy.GroupResourcePermission.group_id.label("owner_id"),
            cls.models_proxy.GroupResourcePermission.perm_name,
            sa.literal("group").label("type"),
        )
        query = query.filter(
            cls.models_proxy.GroupResourcePermission.group_id.in_(
                [gr.id for gr in user.groups]
            )
        )
        query = query.filter(
            cls.models_proxy.GroupResourcePermission.resource_id == instance.id
        )

        query2 = db.session.query(
            cls.models_proxy.UserResourcePermission.user_id.label("owner_id"),
            cls.models_proxy.UserResourcePermission.perm_name,
            sa.literal("user").label("type"),
        )
        query2 = query2.filter(
            cls.models_proxy.UserResourcePermission.user_id == user.id
        )
        query2 = query2.filter(
            cls.models_proxy.UserResourcePermission.resource_id == instance.id
        )
        query = query.union(query2)

        groups_dict = dict([(g.id, g) for g in user.groups])
        perms = [
            PermissionTuple(
                user,
                row.perm_name,
                row.type,
                groups_dict.get(row.owner_id) if row.type == "group" else None,
                instance,
                False,
                True,
            )
            for row in query
        ]

        # include all perms if user is the owner of this resource
        if instance.owner_user_id == user.id:
            perms.append(
                PermissionTuple(
                    user, ALL_PERMISSIONS, "user", None, instance, True, True
                )
            )
        groups_dict = dict([(g.id, g) for g in user.groups])
        if instance.owner_group_id in groups_dict:
            perms.append(
                PermissionTuple(
                    user,
                    ALL_PERMISSIONS,
                    "group",
                    groups_dict.get(instance.owner_group_id),
                    instance,
                    True,
                    True,
                )
            )

        return perms

    @classmethod
    def direct_perms_for_user(cls, instance, user):
        """
        returns permissions that given user has for this resource
            without ones inherited from groups that user belongs to

        :param instance:
        :param user:
        :param db_session:
        :return:
        """
        query = db.session.query(
            cls.models_proxy.UserResourcePermission.user_id,
            cls.models_proxy.UserResourcePermission.perm_name,
        )
        query = query.filter(cls.models_proxy.UserResourcePermission.user_id == user.id)
        query = query.filter(
            cls.models_proxy.UserResourcePermission.resource_id == instance.id
        )

        perms = [
            PermissionTuple(user, row.perm_name, "user", None, instance, False, True)
            for row in query
        ]

        # include all perms if user is the owner of this resource
        if instance.owner_user_id == user.id:
            perms.append(
                PermissionTuple(user, ALL_PERMISSIONS, "user", None, instance, True)
            )
        return perms

    @classmethod
    def group_perms_for_user(cls, instance, user):
        """
        returns permissions that given user has for this resource
            that are inherited from groups

        :param instance:
        :param user:
        :param db_session:
        :return:
        """
        perms = resource_permissions_for_users(
            cls.models_proxy,
            ANY_PERMISSION,
            resource_ids=[instance.id],
            user_ids=[user.id]
        )
        perms = [p for p in perms if p.type == "group"]
        # include all perms if user is the owner of this resource
        groups_dict = dict([(g.id, g) for g in user.groups])
        if instance.owner_group_id in groups_dict:
            perms.append(
                PermissionTuple(
                    user,
                    ALL_PERMISSIONS,
                    "group",
                    groups_dict.get(instance.owner_group_id),
                    instance,
                    True,
                    True,
                )
            )
        return perms

    @classmethod
    def users_for_perm(
        cls,
        instance,
        perm_name,
        user_ids=None,
        group_ids=None,
        limit_group_permissions=False,
        skip_group_perms=False
    ):
        """
        return PermissionTuples for users AND groups that have given
        permission for the resource, perm_name is __any_permission__ then
        users with any permission will be listed

        :param instance:
        :param perm_name:
        :param user_ids: limits the permissions to specific user ids
        :param group_ids: limits the permissions to specific group ids
        :param limit_group_permissions: should be used if we do not want to have
        user objects returned for group permissions, this might cause performance
        issues for big groups
        :param skip_group_perms: do not attach group permissions to the resultset
        :param db_session:
        :return:
        """  # noqa
        users_perms = resource_permissions_for_users(
            cls.models_proxy,
            [perm_name],
            [instance.id],
            user_ids=user_ids,
            group_ids=group_ids,
            limit_group_permissions=limit_group_permissions,
            skip_group_perms=skip_group_perms
        )
        if instance.owner_user_id:
            users_perms.append(
                PermissionTuple(
                    instance.owner, ALL_PERMISSIONS, "user", None, instance, True, True
                )
            )
        if instance.owner_group_id and not skip_group_perms:
            for user in instance.owner_group.users:
                users_perms.append(
                    PermissionTuple(
                        user,
                        ALL_PERMISSIONS,
                        "group",
                        instance.owner_group,
                        instance,
                        True,
                        True,
                    )
                )

        return users_perms

    @classmethod
    def by_resource_id(cls, resource_id):
        """
        fetch the resouce by id

        :param resource_id:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model).filter(
            cls.model.id == int(resource_id)
        )
        return query.first()

    @classmethod
    def perm_by_group_and_perm_name(
        cls, resource_id, group_id, perm_name):
        """
        fetch permissions by group and permission name

        :param resource_id:
        :param group_id:
        :param perm_name:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.models_proxy.GroupResourcePermission)
        query = query.filter(
            cls.models_proxy.GroupResourcePermission.group_id == group_id
        )
        query = query.filter(
            cls.models_proxy.GroupResourcePermission.perm_name == perm_name
        )
        query = query.filter(
            cls.models_proxy.GroupResourcePermission.resource_id == resource_id
        )
        return query.first()

    @classmethod
    def groups_for_perm(
        cls,
        instance,
        perm_name,
        group_ids=None,
        limit_group_permissions=False
    ):
        """
        return PermissionTuples for groups that have given
        permission for the resource, perm_name is __any_permission__ then
        users with any permission will be listed

        :param instance:
        :param perm_name:
        :param group_ids: limits the permissions to specific group ids
        :param limit_group_permissions: should be used if we do not want to have
        user objects returned for group permissions, this might cause performance
        issues for big groups
        :param db_session:
        :return:
        """  # noqa
        group_perms = resource_permissions_for_users(
            cls.models_proxy,
            [perm_name],
            [instance.id],
            group_ids=group_ids,
            limit_group_permissions=limit_group_permissions,
            skip_user_perms=True
        )
        if instance.owner_group_id:
            for user in instance.owner_group.users:
                group_perms.append(
                    PermissionTuple(
                        user,
                        ALL_PERMISSIONS,
                        "group",
                        instance.owner_group,
                        instance,
                        True,
                        True,
                    )
                )

        return group_perms

    @classmethod
    def lock_resource_for_update(cls, resource_id):
        """
        Selects resource for update - locking access for other transactions

        :param resource_id:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model)
        query = query.filter(cls.model.id == resource_id)
        query = query.with_for_update()
        return query.first()
