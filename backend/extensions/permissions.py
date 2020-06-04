#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.permissions.extension import Permissions

# Flask-Restful must be initialized _AFTER_ the SQLAlchemy extension has
# been initialized, AND after all views, models, and serializers have
# been imported. This is because the @api decorators create deferred
# registrations that depend upon said dependencies having all been
# completed before Api('api').init_app() gets called
def register_classes():
    from backend.security.models import (
        Group,
        GroupPermission,
        UserGroup,
        GroupResourcePermission,
        Resource,
        UserPermission,
        UserResourcePermission,
        User,
        ExternalIdentity
    )
    return dict(
        user=User,
        group=Group,
        user_group=UserGroup,
        group_permission=GroupPermission,
        user_permission=UserPermission,
        user_resource_permission=UserResourcePermission,
        group_resource_permission=GroupResourcePermission,
        resource=Resource,
        external_identity=ExternalIdentity,
    )

permissions = Permissions(register_classes)
