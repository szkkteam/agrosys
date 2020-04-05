
class BaseConfig(object):
    # Declare role inheritances
    # Keys here correspond to roles a user explicitly has (as set in the database).
    # Values should be a list of "inherited" roles. There is also a special flag,
    # __CRUD__, which expands into the standard CREATE, VIEW, EDIT and DELETE roles.
    # Role inheritances are loaded recursively, so, for example given the following:
    # ROLE_HIERARCHY = {
    #     'ROLE_ADMIN': ['ROLE_USER'],
    #     'ROLE_USER': ['ROLE_POST'],
    #     'ROLE_POST': ['__CRUD__'],
    #     'ROLE_GUEST': ['ROLE_POST_VIEW']
    # }
    # Then ROLE_ADMIN users will also get ROLE_USER, ROLE_POST, ROLE_POST_CREATE,
    # ROLE_POST_VIEW, ROLE_POST_EDIT, and ROLE_POST_DELETE roles.
    # Likewise, ROLE_USER users will inherit the ROLE_POST, ROLE_POST_CREATE,
    # ROLE_POST_VIEW, ROLE_POST_EDIT, and ROLE_POST_DELETE roles.
    # However, ROLE_GUEST users will only inherit the ROLE_POST_VIEW role. (note
    # that if you want unauthenticated users to have the ROLE_GUEST role, you'll
    # need to implement and register a custom AnonymousUser class)
    ROLE_HIERARCHY = {
        'ROLE_ADMIN': ['ROLE_USER'],
    }

    SECURITY_CUSTOM_CONFIG = True
    
class ProdConfig(BaseConfig):
    pass
    
class DevConfig(BaseConfig):
    pass