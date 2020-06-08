#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Model

)
from backend.permissions.models import ResourceMixin

class Resource(ResourceMixin, Model):

    __possible_permissions__ = ('edit_permission', 'view_permission', 'delete_permission', 'create_permission')

    # TODO: Implement later
    # example implementation of ACLS for pyramid application
    @property
    def __acl__(self):
        acls = []

        if self.owner_user_id:
            acls.extend([(Allow, self.owner_user_id, ALL_PERMISSIONS,), ])

        if self.owner_group_id:
            acls.extend([(Allow, "group:%s" % self.owner_group_id,
                          ALL_PERMISSIONS,), ])
        return acls