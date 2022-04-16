#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import sys

# Pip package imports
import click
from flask.cli import with_appcontext

# Internal package imports

from ..group import newsletter_subscribe
from ...models import NewsletterSubscribe

#@click.option('--export', is_flag=True, default=False, expose_value=True,
#              help='Export the subscribers database to CSV file.')

@newsletter_subscribe.command()
@click.option('--out', expose_value=True,
              help='Destination file path.')
@click.option('--filter', '-f', default=dict(is_active=True),
              help='Filtering the NewsletterSubscribe database for exporting.')
@with_appcontext
def export(out, filter):
    data = NewsletterSubscribe.filter_by(**filter).all()
    print("Exporting \'%s\' to: %s" %(data, out))