#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import inspect
import os
import sys
from io import StringIO
import json

# Pip package imports
import click
from flask.cli import with_appcontext
from flask import current_app
import babel
from babel.messages.pofile import read_po, write_po
from babel.messages.catalog import Catalog

# Internal package imports

TRANSLATIONS_FOLDER = 'backend/translations'
BABEL_CFG = 'babel.cfg'
MESSAGES_POT = 'messages.pot'
APP_ENTRY = '.'

def local_extract():
    os.system('pybabel extract -F ' + BABEL_CFG+ ' -k lazy_gettext -o ' + MESSAGES_POT + ' ' + APP_ENTRY)

def local_init(lang):
    os.system('pybabel init -i ' + MESSAGES_POT + ' -d ' + TRANSLATIONS_FOLDER + ' -l ' + lang)

def local_update():
    os.system('pybabel update -i ' + MESSAGES_POT + ' -d ' + TRANSLATIONS_FOLDER)

def local_compile():
    os.system('pybabel compile -d ' + TRANSLATIONS_FOLDER)

@click.group()
def babel():
    """Perform translation tasks."""
    pass

@babel.command()
@click.option('--lang', '-l', default='en', expose_value=True,
              help='Initialise a the message pot for a specific language.')
def init(lang):
    # Extract the texts
    local_extract()
    local_init(lang)
    os.unlink(MESSAGES_POT)

@babel.command()
def update():
    local_extract()
    local_update()
    os.unlink(MESSAGES_POT)

@babel.command()
def compile():
    local_compile()

@babel.command()
@click.option('--source', '-s', default='en', expose_value=True,
              help='Source language.')
@click.option('--target', '-t', default=None, expose_value=True,
              help='Target language.')
@with_appcontext
def t_export(source, target):
    source_str = StringIO(open(TRANSLATIONS_FOLDER + '/' + source +
        '/LC_MESSAGES/messages.po' , 'r', encoding='utf-8').read())
    source_catalog = read_po(source_str)
    for_tron = { message.id: {source: message.string}
                 for message in source_catalog if message.id }

    if not target:
        for locale in current_app.config.get('LANGUAGES').keys():
            if locale != source:
                target_str = StringIO(open(TRANSLATIONS_FOLDER + '/' +
                locale + '/LC_MESSAGES/messages.po', 'r',
                encoding='utf-8').read())
                target_catalog = read_po(target_str)

                for message in target_catalog:
                    if message.id and message.id in for_tron.keys():
                        for_tron[message.id][locale]=message.string
    else:
        target_str = StringIO(open(TRANSLATIONS_FOLDER + '/' + target +
          '/LC_MESSAGES/messages.po', 'r', encoding='utf-8').read())
        target_catalog = read_po(target_str)

        for message in target_catalog:
            if message.id and message.id in for_tron.keys():
                for_tron[message.id][target] = message.string

    with open('localization.json', 'w',
     encoding='utf-8') as outfile:
        json.dump(for_tron, outfile, ensure_ascii=False)

@babel.command()
@click.option('--filename', '-f', default=None, expose_value=True,
              help='Input file name.')
@click.option('--source', '-s', default='en', expose_value=True,
              help='Source language.')
@click.option('--target', '-t', default=None, expose_value=True,
              help='Target language.')
@with_appcontext
def t_import(filename, source, target):
    if filename:
        from_tron = json.loads(open(filename, 'r', encoding='utf-8')
         .read())
    else:
        from_tron = json.loads(open(app_path +
        '/json_strings/strings.json', 'r', encoding='utf-8').read())

    template_str = StringIO(
     open('messages.pot', 'r', encoding='utf-8').read())

    if not target:
        for locale in current_app.config.get('LANGUAGES').keys():
            new_catalog = Catalog()
            for id in from_tron:
                if locale in from_tron[id].keys():
                    new_catalog.add(id, from_tron[id][locale])
            new_catalog.update(template)
            write_po(open(TRANSLATIONS_FOLDER + '/' + locale +
             '/LC_MESSAGES/messages.po', 'wb'), new_catalog)

    else:
        new_catalog = Catalog()
        for id in from_tron:
            if target in from_tron[id].keys():
                new_catalog.add(id, from_tron[id][target])
        new_catalog.update(template)
        write_po(open(TRANSLATIONS_FOLDER + '/' + target +
          '/LC_MESSAGES/messages.po', 'wb'), new_catalog)