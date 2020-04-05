#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from http import HTTPStatus

# Pip package imports
from flask import render_template, request, jsonify

# Internal package imports
from backend.utils import decode_token

from ..models import NewsletterSubscribe
from ..utils import generate_resubscribe_link
from .blueprint import newsletter_subscribe


@newsletter_subscribe.route('/unsubscribe/<token>', methods=['GET'])
def unsubscribe(token):
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
        if email.is_active:
            email.is_active = False
            email.save(commit=True)

    if not request.is_json:
        return render_template('newsletter_subscribe/email/confirm_unsubscribe.html',
                                         resubscribe_link=generate_resubscribe_link(email.email))

    return jsonify({
        'email': email,
        'status': 'You are successfully unsubscribed from our mailing list.',
    })
