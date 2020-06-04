#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from .utils import ModelProxy

def import_model_service_mappings():
    from backend.permissions.services.user import UserService
    from backend.permissions.services.group import GroupService
    from backend.permissions.services.group_permission import (
        GroupPermissionService,
    )
    from backend.permissions.services.user_permission import (
        UserPermissionService,
    )
    from backend.permissions.services.user_resource_permission import (
        UserResourcePermissionService,
    )
    from backend.permissions.services.group_resource_permission import (
        GroupResourcePermissionService,
    )  # noqa
    from backend.permissions.services.resource import ResourceService
    #from .services.resource_tree import ResourceTreeService
    from backend.permissions.services.external_identity import (
        ExternalIdentityService,
    )

    return {
        "User": [UserService],
        "Group": [GroupService],
        "GroupPermission": [GroupPermissionService],
        "UserPermission": [UserPermissionService],
        "UserResourcePermission": [UserResourcePermissionService],
        "GroupResourcePermission": [GroupResourcePermissionService],
        "Resource": [ResourceService],
        "ExternalIdentity": [ExternalIdentityService],
    }

def make_passwordmanager(schemes=None):
    """
    schemes contains a list of replace this list with the hash(es) you wish
    to support.
    this example sets pbkdf2_sha256 as the default,
    with support for legacy bcrypt hashes.

    :param schemes:
    :return: CryptContext()
    """
    from passlib.context import CryptContext

    if not schemes:
        schemes = ["pbkdf2_sha256", "bcrypt"]
    pwd_context = CryptContext(schemes=schemes, deprecated="auto")
    return pwd_context


class Permissions(object):

    def __init__(self, init_fnc):
        self._init_func = init_fnc

    def _init_app(self, app):
        self.model_init(**self._init_func())

    def model_init(self,
        user=None,
        group=None,
        user_group=None,
        group_permission=None,
        user_permission=None,
        user_resource_permission=None,
        group_resource_permission=None,
        resource=None,
        external_identity=None,
        *args,
        **kwargs
    ):
        """
        This function handles attaching model to service if model has one specified
        as `_ziggurat_service`, Also attached a proxy object holding all model
        definitions that services might use

        :param args:
        :param kwargs:
        :param passwordmanager, the password manager to override default one
        :param passwordmanager_schemes, list of schemes for default
                passwordmanager to use
        :return:
        """
        self.models = ModelProxy()
        self.models.User = user
        self.models.Group = group
        self.models.UserGroup = user_group
        self.models.GroupPermission = group_permission
        self.models.UserPermission = user_permission
        self.models.UserResourcePermission = user_resource_permission
        self.models.GroupResourcePermission = group_resource_permission
        self.models.Resource = resource
        self.models.ExternalIdentity = external_identity

        model_service_mapping = import_model_service_mappings()

        if kwargs.get("passwordmanager"):
            user.passwordmanager = kwargs["passwordmanager"]
        else:
            user.passwordmanager = make_passwordmanager(
                kwargs.get("passwordmanager_schemes")
            )

        for name, cls in self.models.items():
            # if model has a manager attached attached the class also to manager
            services = model_service_mapping.get(name, [])
            for service in services:
                setattr(service, "model", cls)
                setattr(service, "models_proxy", self.models)
