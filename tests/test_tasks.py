#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask_mail import Message

# Internal package imports
from backend.tasks import send_mail_async_task

class TestTasks:
    def test_send_mail_task(self, outbox):
        msg = Message(subject='hello world',
                      recipients=['szkkteam1@gmail.com'],
                      sender='noreply@example.com',
                      html='<h1>hi</h1>')

        send_mail_async_task.apply([msg])
        assert len(outbox) == 1
        assert outbox[0].subject == 'hello world'
        assert outbox[0].body == 'hi', 'expected plaintext message to be generated from html'