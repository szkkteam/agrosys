#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import current_app, render_template
from flask_mail import Message

# Internal package imports
from backend.tasks import send_mail_async_task

def send_mail(subject, recipients, template, sender=None, **ctx):
    msg = prepare_send_mail(subject, recipients, template, sender, **ctx)

    if current_app and current_app.config.get('TESTING'):
        return send_mail_async_task.apply([msg])

    return send_mail_async_task.delay(msg)

def prepare_send_mail(subject, recipients, template, sender=None, **ctx):
    if not isinstance(recipients, (tuple, list)):
        recipients = [recipients]

    if sender is None:
        sender = current_app.config['MAIL_DEFAULT_SENDER']
    msg = Message(subject=subject, recipients=recipients, sender=sender)
    msg.html = render_template(template, **ctx)

    return msg

def get_mail_static_content():
    from .url_helpers import safe_url_for_external
    return dict(
        facebook_icon=safe_url_for_external('static', 'site/img/icons/icon_facebook_35x35.png', _external=True),
        instagram_icon=safe_url_for_external('static', 'site/img/icons/icon_instagram_35x35.png', _external=True),
        twitter_icon=safe_url_for_external('static', 'site/img/icons/icon_twitter_35x35.png', _external=True),
        facebook_link=safe_url_for_external('static', 'site/img/icons/icon_twitter_35x35.png', _external=True),
        instagram_link=safe_url_for_external('static', 'site/img/icons/icon_twitter_35x35.png', _external=True),
        twitter_link=safe_url_for_external('static', 'site/img/icons/icon_twitter_35x35.png', _external=True),
        site_index=safe_url_for_external('site.index', _external=True),
        service_1=safe_url_for_external('site.services', _external=True) + '#service-service1',
        service_2=safe_url_for_external('site.services', _external=True) + '#service-service2',
        service_3=safe_url_for_external('site.services', _external=True) + '#service-service3',
    )