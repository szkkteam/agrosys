# -*- coding: utf-8 -*-

"""
Flask Application Factory Pattern
http://flask.pocoo.org/docs/0.12/patterns/appfactories/
"""

# Common Python library imports
import os
import sys

# Pip package imports
from flask import Flask as BaseFlask, session, Blueprint, request, g, redirect, url_for, current_app
from flask.helpers import get_debug_flag
from flask_wtf.csrf import generate_csrf
from loguru import logger

# Internal package imports
from .config import (
    BaseConfig,
    DevConfig,
    ProdConfig,
    PROJECT_ROOT,
    TEMPLATE_FOLDER,
    STATIC_FOLDER,
    STATIC_URL_PATH,
    EXTENSIONS,
    DEFERRED_EXTENSIONS,
)

from .magic import (
    is_extension,
    is_blueprint,
    get_bundles,
    get_commands,
    get_extensions,
)

from backend.extensions.babel import babel
from backend.extensions.assets import assets as flask_assets

class Flask(BaseFlask):
    bundles = []
    models = {}
    serializers = {}

def create_app():
    """Creates a pre-configured Flask application.

    Defaults to using :class:`backend.config.ProdConfig`, unless the
    :envvar:`FLASK_DEBUG` environment variable is explicitly set to "true",
    in which case it uses :class:`backend.config.DevConfig`. Also configures
    paths for the templates folder and static files.
    """
    return _create_app(
        DevConfig if get_debug_flag() else ProdConfig,
        template_folder=TEMPLATE_FOLDER,
        static_folder=STATIC_FOLDER,
        static_url_path=STATIC_URL_PATH
    )

def _create_app(config_object: BaseConfig, **kwargs):
    """Creates a Flask application.

    :param object config_object: The config class to use.
    :param dict kwargs: Extra kwargs to pass to the Flask constructor.
    """
    # WARNING: HERE BE DRAGONS!!!
    # DO NOT FUCK WITH THE ORDER OF THESE CALLS or nightmares will ensue
    app = Flask(__name__, **kwargs)
    app.bundles = list(get_bundles())
    configure_app(app, config_object)

    extensions = dict(get_extensions(EXTENSIONS))
    register_extensions(app, extensions)

    register_blueprints(app)
    register_models(app)
    register_serializers(app)
    register_admins(app)
    register_filters(app)
    register_assets(app)
    register_converters(app)

    deferred_extensions = dict(get_extensions(DEFERRED_EXTENSIONS))
    extensions.update(deferred_extensions)
    register_extensions(app, deferred_extensions)

    register_cli_commands(app)
    register_shell_context(app, extensions)

    return app

def configure_app(app, config_object):
    """General application configuration:

    - register the app's config
    - register Jinja extensions
    - register functions to run on before/after request
    """
    # automatically configure a migrations folder for each bundle
    config_object.ALEMBIC['version_locations'] = [
        (bundle._name, os.path.join(PROJECT_ROOT,
                                    bundle.module_name.replace('.', os.sep),
                                    'migrations'))
        for bundle in app.bundles if bundle.has_models
    ]
    app.config.from_object(config_object)

    app.jinja_env.add_extension('jinja2.ext.do')
    app.jinja_env.add_extension('jinja2_time.TimeExtension')
    app.jinja_env.add_extension('jinja2.ext.i18n')

    @app.before_request
    def enable_session_timeout():
        session.permanent = True  # set session to use PERMANENT_SESSION_LIFETIME
        session.modified = True   # reset the session timer on every request

    @app.after_request
    def set_csrf_cookie(response):
        if response:
            response.set_cookie('csrf_token', generate_csrf())
        return response

    @babel.localeselector
    def get_locale():
        try:
            language = session.get('language')
            print('Getting lang from session: ', language, flush=True)
        except KeyError:
            language = None
        if language is None:
            language = request.accept_languages.best_match(current_app.config.get('LANGUAGES').keys())
            print('Getting lang from browser: ', language, flush=True)
        return language

    @app.context_processor
    def inject_conf_var():
        return dict(
            lurl_for=lambda ep, **kwargs: url_for('/' + session.get('language', current_app.config.get('BABEL_DEFAULT_LOCALE')) +ep, **kwargs  ),
            languages=current_app.config.get('LANGUAGES'),
            language=session.get('language',
                                         request.accept_languages.best_match(current_app.config['LANGUAGES'].keys())))

    # Configure the bundles
    for bundle in app.bundles:
        for config_name, config in bundle.configs:
            app.config.from_object(config)

def register_extensions(app, extensions):
    """Register and initialize extensions."""
    for extension in extensions.values():
            extension.init_app(app)

def register_filters(app):
    """Register bundle filters."""
    # register filters
    for bundle in app.bundles:
        # To prevent name collosion, the filter calling name is made like:
        # <bundle_name>.<filter_name>
        for name, filter in bundle.filters:
            app.jinja_env.filters[name] = filter

    # TODO: This is quick and ugly
    from backend.utils.template_helpers import ClassList
    app.jinja_env.globals['classlist'] = ClassList

def register_assets(app):
    """Register bundle assets."""
    for bundle in app.bundles:
        for asset_key, asset in bundle.assets:
            flask_assets.register(asset_key, asset)

def register_converters(app):
    """Register url converters."""
    from backend.utils.url_helpers import DateConverter
    app.url_map.converters['date'] = DateConverter

def register_blueprints(app):
    """Register bundle views."""
    # disable strict_slashes on all routes by default
    if not app.config.get('STRICT_SLASHES', False):
        app.url_map.strict_slashes = False

    # register blueprints
    for bundle in app.bundles:
        for blueprint in bundle.blueprints:
            # rstrip '/' off url_prefix because views should be declaring their
            # routes beginning with '/', and if url_prefix ends with '/', routes
            # will end up looking like '/prefix//endpoint', which is no good
            url_prefix = (blueprint.url_prefix or '').rstrip('/')
            if is_blueprint(blueprint):
                #app.register_blueprint(blueprint, url_prefix=url_prefix, static_folder='static', static_url_path='/static/' + blueprint.name)
                app.register_blueprint(blueprint, url_prefix=url_prefix)

def register_models(app):
    """Register bundle models."""
    models = {}
    for bundle in app.bundles:
        for model_name, model_class in bundle.models:
            models[model_name] = model_class
    app.models = models

def register_admins(app):
    """Register bundle admins."""
    try:
        from backend.extensions import db
        from backend.extensions.admin import admin
    except ImportError as err:
        logger.warning("Admin and database bundles are not present")
    else:
        for bundle in app.bundles:
            if bundle.admin_icon_class:
                admin.category_icon_classes[bundle.admin_category_name] = bundle.admin_icon_class

            for ModelAdmin in bundle.model_admins:
                model_admin = ModelAdmin(ModelAdmin.model,
                                         db.session,
                                         category=bundle.admin_category_name,
                                         name=ModelAdmin.model.__plural_label__)

                # workaround upstream bug where certain values set as
                # class attributes get overridden by the constructor
                model_admin.menu_icon_value = getattr(ModelAdmin, 'menu_icon_value', None)
                if model_admin.menu_icon_value:
                    model_admin.menu_icon_type = getattr(ModelAdmin, 'menu_icon_type', None)

                admin.add_view(model_admin)

            for FileAdmin in bundle.file_admins:
                file_admin = FileAdmin(base_path=FileAdmin.path,
                                       category=bundle.admin_category_name,
                                       name=FileAdmin.name)

                # workaround upstream bug where certain values set as
                # class attributes get overridden by the constructor
                file_admin.menu_icon_value = getattr(FileAdmin, 'menu_icon_value', None)
                if file_admin.menu_icon_value:
                    file_admin.menu_icon_type = getattr(FileAdmin, 'menu_icon_type', None)

                admin.add_view(file_admin)

def register_serializers(app):
    """Register bundle serializers."""
    serializers = {}
    for bundle in app.bundles:
        for name, serializer_class in bundle.serializers:
            serializers[name] = serializer_class
    app.serializers = serializers

def register_cli_commands(app):
    """Register all the Click commands declared in :file:`backend/commands` and
    each bundle's commands"""
    commands = list(get_commands())
    for bundle in app.bundles:
        commands += list(bundle.command_groups)
    for name, command in commands:
        if name in app.cli.commands:
            logger.error(f'Command name conflict: "{name}" is taken.')
            sys.exit(1)
        app.cli.add_command(command)

def register_shell_context(app, extensions):
    """Register variables to automatically import when running `python manage.py shell`."""
    def shell_context():
        ctx = {}
        ctx.update(extensions)
        ctx.update(app.models)
        ctx.update(app.serializers)
        return ctx
    app.shell_context_processor(shell_context)