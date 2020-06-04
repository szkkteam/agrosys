#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import pytest

# Pip package imports
# Internal package imports
from backend.security.models import (
    User,
    Resource,
    UserPermission,
    Group,
    GroupPermission,
    UserResourcePermission,
    GroupResourcePermission
)
from backend.permissions.permissions import (
    ALL_PERMISSIONS,
    Allow
)

class TestResource(Resource):
    __mapper_args__ = {"polymorphic_identity": "test_resource"}


class TestResourceB(Resource):
    __mapper_args__ = {"polymorphic_identity": "test_resource_b"}


def add_user(session,
             username="username",
             email="email",
             perms=["root", "alter_users"]):
    user = User(username=username, email=email)
    for perm in perms:
        u_perm = UserPermission(perm_name=perm)
        user.user_permissions.append(u_perm)
    session.add(user)
    session.flush()
    return user


def add_group(session, group_name="group", description="desc"):
    group = Group(group_name=group_name, description=description)
    test_perm = GroupPermission(perm_name="manage_apps")
    group.permissions.append(test_perm)
    session.add(group)
    session.flush()
    return group


def add_resource(session,
                resource_id,
                resource_name="test_resource",
                parent_id=None,
                ordering=None):
    Resource.__possible_permissions__ = [
        "test_perm",
        "test_perm1",
        "test_perm2",
        "foo_perm",
        "group_perm",
        "group_perm2",
    ]
    resource = TestResource(
        resource_id=resource_id,
        resource_name=resource_name,
        parent_id=parent_id,
        ordering=ordering,
    )
    session.add(resource)
    session.flush()
    return resource


def add_resource_b(session, resource_id, resource_name="test_resource"):
    Resource.__possible_permissions__ = [
        "test_perm",
        "test_perm1",
        "test_perm2",
        "foo_perm",
        "group_perm",
        "group_perm2",
    ]
    resource = TestResourceB(resource_id=resource_id, resource_name=resource_name)
    session.add(resource)
    session.flush()
    return resource

class BaseTestCase(object):

    def set_up_user_group_and_perms(self, session):
        """
        perm map:

        username:
            first_user : root, alter_users
            res_perms: r1:g1:foo_perm, r1:g1:test_perm2

        foouser:
            user_perms : custom
            res_perms: r2:foo_perm

        baruser:
            user_perms : root, alter_users
            res_perms: r2:test_perm

        bazuser:
            user_perms : root, alter_users
            res_perms: r1:g2:group_perm

        """
        created_user = add_user(session, username="first_user")
        created_user2 = add_user(
            session, username="foouser", email="new_email", perms=["custom"]
        )
        created_user3 = add_user(session, username="baruser", email="new_email2")
        created_user4 = add_user(session, username="bazuser", email="new_email3")
        resource = add_resource(session, 1, "test_resource")
        resource2 = add_resource_b(session, 2, "other_resource")
        group = add_group(session)
        group2 = add_group(session, group_name="group2")
        group.users.append(created_user)
        group2.users.append(created_user4)
        group_permission = GroupResourcePermission(
            perm_name="group_perm", group_id=group.id
        )
        group_permission2 = GroupResourcePermission(
            perm_name="group_perm", group_id=group2.id
        )
        user_permission = UserResourcePermission(
            perm_name="test_perm2", user_id=created_user.id
        )
        user_permission2 = UserResourcePermission(
            perm_name="foo_perm", user_id=created_user.id
        )
        user2_permission = UserResourcePermission(
            perm_name="foo_perm", user_id=created_user2.id
        )
        user3_permission = UserResourcePermission(
            perm_name="test_perm", user_id=created_user3.id
        )
        resource.group_permissions.append(group_permission)
        resource.group_permissions.append(group_permission2)
        resource.user_permissions.append(user_permission)
        resource.user_permissions.append(user_permission2)
        resource2.user_permissions.append(user2_permission)
        resource2.user_permissions.append(user3_permission)
        session.flush()
        self.resource = resource
        self.resource2 = resource2
        self.user = created_user
        self.user2 = created_user2
        self.user3 = created_user3
        self.user4 = created_user4
        self.group = group
        self.group2 = group2
