#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import os.path as op
import shutil

# Pip package imports
from flask import current_app
from werkzeug import cached_property

from flask_fs.backends import BaseBackend
from flask_fs.backends.local import LocalBackend

# Internal package imports

class ExtendedFsLocalStorage(LocalBackend):

    def get_base_path(self):
        return self.root

    def make_dir(self, path, directory):
        """
            Creates a directory `directory` under the `path`
        """
        os.mkdir(op.join(path, directory))

    def get_files(self, path, directory):
        """
            Gets a list of tuples representing the files in the `directory`
            under the `path`
            :param path:
                The path up to the directory
            :param directory:
                The directory that will have its files listed
            Each tuple represents a file and it should contain the file name,
            the relative path, a flag signifying if it is a directory, the file
            size in bytes and the time last modified in seconds since the epoch
        """
        items = []
        for f in os.listdir(directory):
            fp = op.join(directory, f)
            rel_path = op.join(path, f)
            is_dir = self.is_dir(fp)
            size = op.getsize(fp)
            last_modified = op.getmtime(fp)
            items.append((f, rel_path, is_dir, size, last_modified))
        return items

    def delete_tree(self, directory):
        """
            Deletes the directory `directory` and all its files and subdirectories
        """
        self.delete(directory)

    def delete_file(self, file_path):
        """
            Deletes the file located at `file_path`
        """
        self.delete(file_path)

    def path_exists(self, path):
        """
            Check if `path` exists
        """
        return op.exists(path)

    def rename_path(self, src, dst):
        """
            Renames `src` to `dst`
        """
        os.rename(src, dst)

    def is_dir(self, path):
        """
            Check if `path` is a directory
        """
        return op.isdir(path)

class UnifiedFileStorage(object):
    def __init__(self, fs_storage):
        """
            Constructor.
            :param fs_storage:
                Sub class of flask_fs - BaseBackend
        """
        assert isinstance(fs_storage, BaseBackend), "Must be a subclass of flask_fs BaseBackend"
        self.fs_storage = fs_storage

    @cached_property
    def fs(self):
        return self.fs_storage

    def get_base_path(self):
        """
            Return base path.
        """
        if hasattr(self, 'root'):
            return self.fs.root.
        return ''

    def make_dir(self, path, directory):
        """
            Creates a directory `directory` under the `path`
        """
        os.mkdir(op.join(path, directory))

    def get_files(self, path, directory):
        """
            Gets a list of tuples representing the files in the `directory`
            under the `path`
            :param path:
                The path up to the directory
            :param directory:
                The directory that will have its files listed
            Each tuple represents a file and it should contain the file name,
            the relative path, a flag signifying if it is a directory, the file
            size in bytes and the time last modified in seconds since the epoch
        """
        items = []
        for f in os.listdir(directory):
            fp = op.join(directory, f)
            rel_path = op.join(path, f)
            is_dir = self.is_dir(fp)
            size = op.getsize(fp)
            last_modified = op.getmtime(fp)
            items.append((f, rel_path, is_dir, size, last_modified))
        return items

    def delete_tree(self, directory):
        """
            Deletes the directory `directory` and all its files and subdirectories
        """
        shutil.rmtree(directory)

    def delete_file(self, file_path):
        """
            Deletes the file located at `file_path`
        """
        os.remove(file_path)

    def path_exists(self, path):
        """
            Check if `path` exists
        """
        return op.exists(path)

    def rename_path(self, src, dst):
        """
            Renames `src` to `dst`
        """
        os.rename(src, dst)

    def is_dir(self, path):
        """
            Check if `path` is a directory
        """
        return op.isdir(path)

    def send_file(self, file_path):
        """
            Sends the file located at `file_path` to the user
        """
        return send_file(file_path)

    def read_file(self, path):
        """
            Reads the content of the file located at `file_path`.
        """
        with open(path, 'rb') as f:
            return f.read()

    def write_file(self, path, content):
        """
            Writes `content` to the file located at `file_path`.
        """
        with open(path, 'w') as f:
            return f.write(content)

    def save_file(self, path, file_data):
        """
            Save uploaded file to the disk
            :param path:
                Path to save to
            :param file_data:
                Werkzeug `FileStorage` object
        """
        file_data.save(path)