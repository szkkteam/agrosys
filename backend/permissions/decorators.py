#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import inspect
from functools import wraps
from http import HTTPStatus

# Pip package imports
from flask import abort, request
from flask_login import current_user

# Internal package imports
from backend.security.models import User
from backend.utils import was_decorated_without_parenthesis
from backend.permissions.permissions import resource_permissions_for_users
from backend.permissions.services import UserService


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
        # By default only the owner should access
        required_permissions = ['All Permission']

    if 'resource' in kwargs:
        resource = kwargs['resource']
    else:
        raise RuntimeError('resource parameter has to be passed as keyword argument')

    include_resource = kwargs.get('include_resource', False)

    # TODO: check if it was decorated without parenthesis and ensure the resource is only callable
    if was_decorated_without_parenthesis(args):
        assert callable(resource), "resource parameter must be callable if it's used without parenthesis"

    def wrapper(fn):
        @wraps(fn)
        def decorated(*args, **kwargs):
            #print("Permission required - function call (request.view_args): ", request.view_args)
            #print("Permission required - function call (args): ", args)
            #print("Permission required - function call (kwargs): ", kwargs)
            if callable(resource):
                fnc = resource
                # Get the resource
                resource_instance = fnc(**request.view_args)
            elif resource in kwargs:
                # Get the direct instance from the keyword arguments
                resource_instance = kwargs[resource]
            else:
                sig = inspect.signature(fn)
                #print("Signatrue: ", sig)
                if resource in sig.parameters:
                    #print("Parameters: ", list(sig.parameters.keys()))
                    resource_instance = args[list(sig.parameters.keys()).index(resource)]
                    #print("resource: ", resource)
                    #print("args[list(sig.parameters.keys()).index(resource)]: ", args[list(sig.parameters.keys()).index(resource)])
                    #print("resource_instance extracted from signatere: ", resource_instance)
                    # TODO: Find a way how to validate if it's a model instance.
                    #if not (inspect.isclass(resource_instance) and issubclass(resource_instance, Model)):
                    #    resource_instance = None
                    # FIXME: Dirty way to check if param is dict.
                    if isinstance(resource_instance, dict):
                        resource_instance = None
                else:
                    resource_instance = None

            if not resource_instance:
                #print("Was not able to determine the role.")
                #print("Signature parameters: ", inspect.signature(fn).parameters)
                pass

            # Get current user
            if resource_instance:
                user = User.get(current_user.id)
                #print("Resource instance: ", resource_instance)
                # TODO: Change this to get the permissions instead of the resource
                res = UserService.resources_with_perms(user, required_permissions, resource_ids=[resource_instance.id]).first()
                #print("Resource: ", res)
                #print("User: ", user)
                if not res:
                    abort(HTTPStatus.FORBIDDEN)
                #print("***** Permission test success!!!! *****")
                if include_resource:
                    kwargs['resource'] = resource_instance
            return fn(*args, **kwargs)
        return decorated

    if was_decorated_without_parenthesis(args):
        return wrapper(args[0])
    return wrapper
