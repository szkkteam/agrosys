#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import click
import subprocess

# Pip package imports
# Internal package imports

@click.group()
def celery():
    """Start the celery worker and/or beat."""
    pass


@celery.command()
@click.option('--loglevel', '-l', default='debug', expose_value=True,
              help='Specify celery log level')
def worker(loglevel):
    """Start the celery worker."""
    subprocess.run('celery worker -A wsgi.celery -l %s --concurrency 1' % loglevel, shell=True)


@celery.command()
@click.option('--loglevel', '-l', default='debug', expose_value=True,
              help='Specify celery log level')
def beat(loglevel):
    """Start the celery beat."""
    subprocess.run('celery beat -A wsgi.celery -l %s --concurrency 1' % loglevel, shell=True)
