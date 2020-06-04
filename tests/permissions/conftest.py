#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import pytest

# Pip package imports
# Internal package imports
from backend.permissions.models import (
    GroupMixin,
    GroupPermissionMixin,
    UserGroupMixin,
    GroupResourcePermissionMixin,
    ResourceMixin,
    UserPermissionMixin,
    UserResourcePermissionMixin,
    ExternalIdentityMixin,
    UserMixin
)
from backend.permissions.permissions import (
    ALL_PERMISSIONS,
    Allow
)
from backend.permissions.manager import model_init
from backend.database import PrimaryKeyMixin, Model
from backend.database import (
    Boolean,
    Column,
    DateTime,
    Model,
    String,
)

class Group(GroupMixin, Model):
    __possible_permissions__ = (
        "root_administration",
        "administration",
        "backend_admin_panel",
        "manage_apps",
    )


class GroupPermission(GroupPermissionMixin, Model):
    pass


class UserGroup(UserGroupMixin, Model):
    pass


class GroupResourcePermission(GroupResourcePermissionMixin, Model):
    pass


class Resource(ResourceMixin, Model):
    def __acl__(self):
        acls = []

        if self.owner_user_id:
            acls.extend([(Allow, self.owner_user_id, ALL_PERMISSIONS)])

        if self.owner_group_id:
            acls.extend([(Allow, "group:%s" % self.owner_group_id, ALL_PERMISSIONS)])
        return acls

class TestResource(Resource):
    __mapper_args__ = {"polymorphic_identity": "test_resource"}


class TestResourceB(Resource):
    __mapper_args__ = {"polymorphic_identity": "test_resource_b"}


class UserPermission(UserPermissionMixin, Model):
    pass


class UserResourcePermission(UserResourcePermissionMixin, Model):
    pass


class ExternalIdentity(ExternalIdentityMixin, Model):
    pass


class UserTest(UserMixin, Model):
    __possible_permissions__ = ["root", "alter_users", "custom1"]

    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)

model_init(
    UserTest,
    Group,
    UserGroup,
    GroupPermission,
    UserPermission,
    UserResourcePermission,
    GroupResourcePermission,
    Resource,
    ExternalIdentity,
)

def add_user(session,
             username="username",
             email="email",
             perms=["root", "alter_users"]):
    user = UserTest(username=username, email=email)
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
