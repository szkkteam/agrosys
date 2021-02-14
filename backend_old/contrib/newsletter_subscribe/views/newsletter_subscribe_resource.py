#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app

# Internal package imports
from backend.api import ModelResource, CREATE, PATCH
from backend.extensions.api import api
from backend.utils.mail import send_mail

from .blueprint import newsletter_subscribe
from ..models import NewsletterSubscribe
from ..utils import generate_unsubscribe_link

@api.model_resource(newsletter_subscribe, NewsletterSubscribe, '/subscribe', '/subscribe/<int:id>')
class NewsletterSubscribeResource(ModelResource):
    include_methods = [CREATE, PATCH]

    # TODO: Create patch and get methods, where check for logged in users.
    # or don't let the user to be able to post the isActive parameter, and dont let users to use patch for changing it. Only through the subsribe and unsubsrcibe views.

    # TODO: Send a confirmation email with "You are successfully subscribed to our newsletter"

    def create(self, newsletter_subscribe, errors):
        print("Create called")
        if errors:
            return self.errors(errors)

        send_mail(subject='Successfully subscribed',
                  recipients=list(newsletter_subscribe.email),
                  template='newsletter_subscribe/email/welcome_subscribed.html',
                  unsubscribe_link=generate_unsubscribe_link(newsletter_subscribe.email))

        return self.created(newsletter_subscribe)
