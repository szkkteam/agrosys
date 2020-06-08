#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from functools import wraps
from http import HTTPStatus

# Pip package imports
from flask import abort, request
from flask_login import current_user
from flask_principal import Permission, RoleNeed, UserNeed
from flask_security.decorators import auth_required as flask_security_auth_required

# Internal package imports
from backend.utils import was_decorated_without_parenthesis


def permission_required(*args, **kwargs):
    """Decorator for requiring an authenticated user, optionally with roles
    Roles are passed as keyword arguments, like so:
    @auth_required(role='REQUIRE_THIS_ONE_ROLE')
    @auth_required(roles=['REQUIRE', 'ALL', 'OF', 'THESE', 'ROLES'])
    @auth_required(one_of=['EITHER_THIS_ROLE', 'OR_THIS_ONE'])
    One of role or roles kwargs can also be combined with one_of:
    @auth_required(role='REQUIRED', one_of=['THIS', 'OR_THIS'])
    # equivalent, but more clearly describing the resultant behavior:
    @auth_required(role='REQUIRED', and_one_of=['THIS', 'OR_THIS'])
    Aborts with HTTP 401: Unauthorized if no user is logged in, or
    HTTP 403: Forbidden if any of the specified role checks fail
    """
    if 'permission' in kwargs and 'permissions' in kwargs:
        raise RuntimeError('can only pass one of `permission` or `permissions` kwargs to permission_required')
    elif 'permission' in kwargs:
        required_permissions = [kwargs['permission']]
    elif 'permissions' in kwargs:
        required_permissions = kwargs['permissions']
    else:
        # By default include all permissions
        required_permissions = ['view', 'edit', 'delete', 'create']

    if 'model' in kwargs:
        model = kwargs['model']
    else:
        raise RuntimeError('model parameter has to be passed as keyword argument')

    print("Before required_permissions: ", required_permissions)
    permission_fields = []
    for permission in required_permissions:
        try:
            field = getattr(UserFarm, 'can_' + permission + '_' + model.__table__.name)
            xfield = 'can_' + permission + '_' + model.__table__.name
            print("Field: ", field)
            permission_fields.append(field)
        except AttributeError:
            pass
    print("After required_permissions: ", permission_fields)

    if not hasattr(model, 'get_permission'):
        raise RuntimeError('model has to implement `get_permission` method')



    def wrapper(fn):
        @wraps(fn)
        def decorated(*args, **kwargs):
            print("Permission required - function call (request.view_args): ", request.view_args)
            print("Permission required - function call (args): ", args)
            print("Permission required - function call (kwargs): ", kwargs)
            result = model.get_permission(UserFarm.can_view_farm)
            #print("Result: ", result)


            return fn(*args, **kwargs)
        return decorated

    if was_decorated_without_parenthesis(args):
        return wrapper(args[0])
    return wrapper
