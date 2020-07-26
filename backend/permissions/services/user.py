#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import hashlib
import six

# Pip package imports
import sqlalchemy as sa

# Internal package imports
from backend.database import db
from .base import BaseService
from ..permissions import (
    ALL_PERMISSIONS,
    ANY_PERMISSION,
    PermissionTuple,
    resource_permissions_for_users
)
from ..utils import generate_random_string


__all__ = ["UserService"]


class UserService(BaseService):
    @classmethod
    def get(cls, user_id, db_session=None):
        """
        Fetch row using primary key -
        will use existing object in session if already present

        :param user_id:
        :param db_session:
        :return:
        """
        return db.session.query(cls.model).get(user_id)

    @classmethod
    def permissions(cls, instance):
        """
        returns all non-resource permissions based on what groups user
            belongs and directly set ones for this user

        :param instance:
        :param db_session:
        :return:
        """
        query = db.session.query(
            cls.models_proxy.GroupPermission.group_id.label("owner_id"),
            cls.models_proxy.GroupPermission.perm_name.label("perm_name"),
            sa.literal("group").label("type"),
        )
        query = query.filter(
            cls.models_proxy.GroupPermission.group_id
            == cls.models_proxy.UserGroup.group_id
        )
        query = query.filter(
            cls.models_proxy.User.id == cls.models_proxy.UserGroup.user_id
        )
        query = query.filter(cls.models_proxy.User.id == instance.id)

        query2 = db.session.query(
            cls.models_proxy.UserPermission.user_id.label("owner_id"),
            cls.models_proxy.UserPermission.perm_name.label("perm_name"),
            sa.literal("user").label("type"),
        )
        query2 = query2.filter(cls.models_proxy.UserPermission.user_id == instance.id)
        query = query.union(query2)
        groups_dict = dict([(g.id, g) for g in instance.groups])
        return [
            PermissionTuple(
                instance,
                row.perm_name,
                row.type,
                groups_dict.get(row.owner_id) if row.type == "group" else None,
                None,
                False,
                True,
            )
            for row in query
        ]

    @classmethod
    def resources_with_perms(
        cls, instance, perms, resource_ids=None, resource_types=None, without_owners=False, query_class=None):
        """
        returns all resources that user has perms for
            (note that at least one perm needs to be met)

        :param instance:
        :param perms:
        :param resource_ids: restricts the search to specific resources
        :param resource_types:
        :param db_session:
        :return:
        """
        # owned entities have ALL permissions so we return those resources too
        # even without explict perms set
        # TODO: implement admin superrule perm - maybe return all apps
        if query_class:
            query = db.session.query(query_class).distinct()
        else:
            query = db.session.query(cls.models_proxy.Resource).distinct()
        group_ids = [gr.id for gr in instance.groups]
        # if user has some groups lets try to join based on their permissions
        if group_ids:
            join_conditions = (
                cls.models_proxy.GroupResourcePermission.group_id.in_(group_ids),
                cls.models_proxy.Resource.resource_id
                == cls.models_proxy.GroupResourcePermission.resource_id,
                cls.models_proxy.GroupResourcePermission.perm_name.in_(perms),
            )
            query = query.outerjoin(
                (cls.models_proxy.GroupResourcePermission, sa.and_(*join_conditions))
            )
            # ensure outerjoin permissions are correct -
            # dont add empty rows from join
            # conditions are - join ON possible group permissions
            # OR owning group/user
            filter_cond = [
                cls.models_proxy.Resource.owner_user_id == instance.id,
                cls.models_proxy.Resource.owner_group_id.in_(group_ids),
                cls.models_proxy.GroupResourcePermission.perm_name != None,
            ]
            if without_owners:
                filter_cond.extend([
                    cls.models_proxy.Resource.owner_user_id == None,
                    cls.models_proxy.Resource.owner_group_id == None,
                ])

            query = query.filter(
                sa.or_(
                    *filter_cond
                )  # noqa
            )
        else:
            # filter just by username
            if without_owners:
                query = query.filter(sa.or_(
                    cls.models_proxy.Resource.owner_user_id == instance.id,
                    cls.models_proxy.Resource.owner_user_id == None,
                ))
            else:
                query = query.filter(cls.models_proxy.Resource.owner_user_id == instance.id)
        # lets try by custom user permissions for resource
        if query_class:
            query2 = db.session.query(query_class).distinct()
        else:
            query2 = db.session.query(cls.models_proxy.Resource).distinct()

        query2 = query2.filter(
            cls.models_proxy.UserResourcePermission.user_id == instance.id
        )
        query2 = query2.filter(
            cls.models_proxy.Resource.resource_id
            == cls.models_proxy.UserResourcePermission.resource_id
        )
        query2 = query2.filter(
            cls.models_proxy.UserResourcePermission.perm_name.in_(perms)
        )
        if resource_ids:
            query = query.filter(
                cls.models_proxy.Resource.resource_id.in_(resource_ids)
            )
            query2 = query2.filter(
                cls.models_proxy.Resource.resource_id.in_(resource_ids)
            )

        if resource_types:
            query = query.filter(
                cls.models_proxy.Resource.resource_type.in_(resource_types)
            )
            query2 = query2.filter(
                cls.models_proxy.Resource.resource_type.in_(resource_types)
            )
        query = query.union(query2)
        query = query.order_by(cls.models_proxy.Resource.resource_name)
        return query

    @classmethod
    def groups_with_resources(cls, instance):
        """
        Returns a list of groups users belongs to with eager loaded
        resources owned by those groups

        :param instance:
        :return:
        """
        return instance.groups_dynamic.options(
            sa.orm.eagerload(cls.models_proxy.Group.resources)
        )

    @classmethod
    def resources_with_possible_perms(
        cls, instance, resource_ids=None, resource_types=None):
        """
        returns list of permissions and resources for this user

        :param instance:
        :param resource_ids: restricts the search to specific resources
        :param resource_types: restricts the search to specific resource types
        :param db_session:
        :return:
        """
        perms = resource_permissions_for_users(
            cls.models_proxy,
            ANY_PERMISSION,
            resource_ids=resource_ids,
            resource_types=resource_types,
            user_ids=[instance.id]
        )
        for resource in instance.resources:
            perms.append(
                PermissionTuple(
                    instance, ALL_PERMISSIONS, "user", None, resource, True, True
                )
            )
        for group in cls.groups_with_resources(instance):
            for resource in group.resources:
                perms.append(
                    PermissionTuple(
                        instance, ALL_PERMISSIONS, "group", group, resource, True, True
                    )
                )

        return perms

    @classmethod
    def gravatar_url(cls, instance, default="mm", **kwargs):
        """
        returns user gravatar url

        :param instance:
        :param default:
        :param kwargs:
        :return:
        """
        # construct the url
        hash = hashlib.md5(instance.email.encode("utf8").lower()).hexdigest()
        if "d" not in kwargs:
            kwargs["d"] = default
        params = "&".join(
            [
                six.moves.urllib.parse.urlencode({key: value})
                for key, value in kwargs.items()
            ]
        )
        return "https://secure.gravatar.com/avatar/{}?{}".format(hash, params)

    @classmethod
    def set_password(cls, instance, raw_password):
        """
        sets new password on a user using password manager

        :param instance:
        :param raw_password:
        :return:
        """
        # support API for both passlib 1.x and 2.x
        hash_callable = getattr(
            instance.passwordmanager, "hash", instance.passwordmanager.encrypt
        )
        password = hash_callable(raw_password)
        if six.PY2:
            instance.user_password = password.decode("utf8")
        else:
            instance.user_password = password
        cls.regenerate_security_code(instance)

    @classmethod
    def check_password(cls, instance, raw_password, enable_hash_migration=True):
        """
        checks string with users password hash using password manager

        :param instance:
        :param raw_password:
        :param enable_hash_migration: if legacy hashes should be migrated
        :return:
        """
        verified, replacement_hash = instance.passwordmanager.verify_and_update(
            raw_password, instance.user_password
        )
        if enable_hash_migration and replacement_hash:
            if six.PY2:
                instance.user_password = replacement_hash.decode("utf8")
            else:
                instance.user_password = replacement_hash
        return verified

    @classmethod
    def generate_random_pass(cls, chars=7):
        """
        generates random string of fixed length

        :param chars:
        :return:
        """
        return cls.generate_random_string(chars)

    @classmethod
    def regenerate_security_code(cls, instance):
        """
        generates new security code

        :param instance:
        :return:
        """
        instance.security_code = cls.generate_random_string(64)

    @staticmethod
    def generate_random_string(chars=7):
        """

        :param chars:
        :return:
        """
        return generate_random_string(chars)

    @classmethod
    def by_id(cls, user_id):
        """
        fetch user by user id

        :param user_id:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model)
        query = query.filter(cls.model.id == user_id)
        query = query.options(sa.orm.eagerload("groups"))
        return query.first()

    @classmethod
    def by_user_name(cls, username):
        """
        fetch user by user name

        :param user_name:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model)
        query = query.filter(
            sa.func.lower(cls.model.username) == (username or "").lower()
        )
        query = query.options(sa.orm.eagerload("groups"))
        return query.first()

    @classmethod
    def by_user_name_and_security_code(cls, username, security_code):
        """
        fetch user objects by user name and security code

        :param user_name:
        :param security_code:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model)
        query = query.filter(
            sa.func.lower(cls.model.username) == (username or "").lower()
        )
        query = query.filter(cls.model.security_code == security_code)
        return query.first()

    @classmethod
    def by_user_names(cls, usernames):
        """
        fetch user objects by user names

        :param user_names:
        :param db_session:
        :return:
        """
        usernames = [(name or "").lower() for name in usernames]
        query = db.session.query(cls.model)
        query = query.filter(sa.func.lower(cls.model.username).in_(usernames))
        # q = q.options(sa.orm.eagerload(cls.groups))
        return query

    @classmethod
    def user_names_like(cls, username):
        """
        fetch users with similar names using LIKE clause

        :param user_name:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model)
        query = query.filter(
            sa.func.lower(cls.model.username).like((username or "").lower())
        )
        query = query.order_by(cls.model.username)
        # q = q.options(sa.orm.eagerload('groups'))
        return query

    @classmethod
    def by_email(cls, email):
        """
        fetch user object by email

        :param email:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model).filter(
            sa.func.lower(cls.model.email) == (email or "").lower()
        )
        query = query.options(sa.orm.eagerload("groups"))
        return query.first()

    @classmethod
    def by_email_and_username(cls, email, username):
        """
        fetch user object by email and username

        :param email:
        :param user_name:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model).filter(cls.model.email == email)
        query = query.filter(
            sa.func.lower(cls.model.username) == (username or "").lower()
        )
        query = query.options(sa.orm.eagerload("groups"))
        return query.first()

    @classmethod
    def users_for_perms(cls, perm_names, db_session=None):
        """
        return users hat have one of given permissions

        :param perm_names:
        :param db_session:
        :return:
        """
        query = db.session.query(cls.model)
        query = query.filter(
            cls.models_proxy.User.id == cls.models_proxy.UserGroup.user_id
        )
        query = query.filter(
            cls.models_proxy.UserGroup.group_id
            == cls.models_proxy.GroupPermission.group_id
        )
        query = query.filter(cls.models_proxy.GroupPermission.perm_name.in_(perm_names))

        query2 = db_session.query(cls.model)
        query2 = query2.filter(
            cls.models_proxy.User.id == cls.models_proxy.UserPermission.user_id
        )
        query2 = query2.filter(
            cls.models_proxy.UserPermission.perm_name.in_(perm_names)
        )
        users = query.union(query2).order_by(cls.model.id)
        return users
