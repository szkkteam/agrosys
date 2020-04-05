#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import re

# Pip package imports
from flask import current_app
from bs4 import BeautifulSoup
from loguru import logger

# Internal package imports
from backend.extensions.celery import celery
from backend.extensions.mail import mail


@celery.task(serializer='pickle')
def send_mail_async_task(msg):
    if not msg.body:
        plain_text = '\n'.join(map(
            str.strip,
            BeautifulSoup(msg.html, 'lxml').text.splitlines()
        ))
        msg.body = re.sub(r'\n\n+', '\n\n', plain_text).strip()

    mail.send(msg)
