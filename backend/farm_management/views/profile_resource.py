#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app

# Internal package imports
from backend.api import ModelResource, CREATE, DELETE, GET, LIST, PATCH, PUT, param_converter
from backend.security.decorators import auth_required_same_user
from backend.security.models import User
from backend.extensions.api import api

from ..models import Profile
from .blueprint import farm_management


@api.model_resource(farm_management, Profile, '/profiles/<int:id>')
class ProfileResource(ModelResource):
    include_methods = [GET, PATCH, PUT]
    method_decorators = {
        GET: [auth_required_same_user],
        PATCH: [auth_required_same_user],
        PUT: [auth_required_same_user],
    }


    """
    PATCH, PUT: Only owner should be able to patch or put data for profile.
    GET: Everybody should get the profile, but the visible fields should depends on the viewer. 
        - Owner -> See everything including user data
        - Others -> should see only public informations. Maybe store what is public? bool = is_public_email ...etc
    Issue: Model instance fetched by the param_converter method, which cannot be configured.
        - Configurable param_converter. It should be like:
            - All methods -> param_converter -> list/put/get/patch/put/post loader. All of them should be given as decorators
    Call chain:
        - Request comes in: dispatch_request() is called -> Convert parameters -> Call corresponding method loader -> Call implemented method
         
    - Must have: compare current_user.id == resource.owner_id. If this is true, ignore permissions
        
    - CREATE: validate permission 'create' before post_loader is called. This is easy, can be used as a method decorator
    - GET: eg: /api/v1/seasons/<season_id>/fields/<field_id>.  
    
    
	What we have:
	- Get permissions for a given resource by user
	resource = Resource.get(id)
	permissions = ResourceService.perms_for_user(resource, User.get(currrent_user.id))

	- Get permissions for a given resource by user who belong to a group
	resource = Resource.get(id)
	permissions = ResourceService.group_perms_for_user(resource, User.get(currrent_user.id))	

	- Get permissions tuple for a given resource by user and groups and filter with specifc permission
	resource = Resource.get(id)
	permissions = ResourceService.users_for_perm(resource, "permission name", userids=[User.get(currrent_user.id)])	
	
	- Get the resource by ID
	resource = ResourceService.by_resource_id(id)
	
	- Update shared resource:
	resource = ResourceService.lock_resource_for_update(id)
	resource.value += 1
	resource.save()
	
	
	api/v1/farms/ POST, LIST
	api/v1/farms/<farm_id> PUT, PATCH, GET, DELETE
	
	api/v1/farms/<farm_id>/seasons POST, LIST
	api/v1/seasons/<season_id> PUT, PATCH, GET, DELETE
	
	api/v1/seasons/<season_id>/fields/ POST, LIST
	api/v1/seasons/<season_id>/fields/<field_id>/ PUT, PATCH, GET, DELETE
	
	api/v1/seasons/<season_id>/field/<field_id>/actions POST, LIST
	api/v1/actions/<action_id> PUT, PATCH, GET, DELETE
	
	api/v1/seasons/<season_id>/field/<field_id>/notes POST, LIST
	api/v1/notes/<note_id> PUT, PATCH, GET, DELETE
	
	api/v1/seasons/<season_id>/field/<field_id>/weather POST, LIST
	
	PUT, PATCH, GET, DELETE : {
		# Prepare required permissions
		permissions_required = ['view', 'edit', 'delete']
		# Get instance.
		resource = ResourceService.by_resource_id(id)
		# Get user instance
		user = User(current_user.id)
		# Faster query when the requester is the owner
		if resource.owner_user_id == user.id or (resource.owner_group_id == user.owner_group_id and user.owner_group_id):
			return resource
		else:
			# Check user and user groups permission for given resource
			user_permissions = ResourceService.perms_for_user(resource, user)
			allowed = True			
			# Loop trough each permission
			for permission in permissions_required:
				# Loop trough the result
				for result in user_permissions:
					# By default we will treat all required permission with 'and'
					if permission == result.perm_name and not result.owner and not result.allowed:
						allowed = False
			if not allowed:
				abort(401)				
	}
    """