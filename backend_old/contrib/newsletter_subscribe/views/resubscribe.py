#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from http import HTTPStatus

# Pip package imports
from flask import request, jsonify, render_template

# Internal package imports
from backend.utils import decode_token

from ..models import NewsletterSubscribe
from ..utils import generate_unsubscribe_link
from .blueprint import newsletter_subscribe


@newsletter_subscribe.route('/resubscribe/<token>', methods=['GET'])
def resubscribe(token):
    email_str = decode_token(token)
    if email_str is None:
        if not request.is_json:
            # Return redirect view
            #return redirect(get_url())
            return
        return jsonify({'errors': 'Invalid token given.'}), HTTPStatus.NOT_FOUND
    else:
        email = NewsletterSubscribe.get_by(email=email_str)
        # Commit only if the user is still active
        if not email.is_active:
            email.is_active = True
            email.save(commit=True)

    if not request.is_json:
        return render_template('newsletter_subscribe/email/confirm_resubscribe.html',
                                         unsubscribe_link=generate_unsubscribe_link(email.email))

    return jsonify({
        'email': email,
        'status': 'You are successfully subscribed to our mailing list.',
    })

