#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.permissions.services import UserService
from .conftest import BaseTestCase, UserTest, add_group, add_resource, add_user, add_resource_b


class DummyUserObj(object):
    def __init__(self):
        self.username = "new_name"
        self.email = "change@email.com"


class TestModel(BaseTestCase):
    def test_get_keys(self, db_session):
        keys = UserTest._get_keys()
        assert len(keys) == 9

    def test_get_dict(self, db_session):
        created_user = add_user(db_session)
        dict_ = created_user.get_dict()
        assert len(dict_) == 9

    def test_get_dict_excluded(self, db_session):
        created_user = add_user(db_session)
        dict_ = created_user.get_dict(exclude_keys=["username"])
        assert "username" not in dict_

    def test_get_dict_included(self, db_session):
        created_user = add_user(db_session)
        dict_ = created_user.get_dict(include_keys=["username"])
        assert ["username"] == list(dict_.keys())

    def test_get_dict_included_excluded(self, db_session):
        created_user = add_user(db_session)
        dict_ = created_user.get_dict(
            include_keys=["username", "id", "email"], exclude_keys=["email"]
        )
        assert sorted(["username", "id"]) == sorted(dict_.keys())

    def test_appstruct(self, db_session):
        created_user = add_user(db_session)
        appstruct = created_user.get_appstruct()
        assert len(appstruct) == 9

    def test_populate_obj_appstruct(self, db_session):
        created_user = add_user(db_session)
        # reset password
        app_struct = {
            "username": "new_name",
            "email": "change@email.com",
        }
        created_user.populate_obj(app_struct)
        assert created_user.username == app_struct["username"]
        assert created_user.email == app_struct["email"]

    def test_populate_obj_appstruct_exclude(self, db_session):
        created_user = add_user(db_session)
        # reset password
        app_struct = {
            "username": "new_name",
            "email": "change@email.com",
        }
        created_user.populate_obj(app_struct)
        assert created_user.username == app_struct["username"]
        assert created_user.email == app_struct["email"]

    def test_populate_obj_appstruct_include(self, db_session):
        created_user = add_user(db_session)
        # reset password
        app_struct = {
            "username": "new_name",
            "email": "change@email.com",
        }
        created_user.populate_obj(app_struct)
        assert created_user.username != app_struct["username"]
        assert created_user.email != app_struct["email"]

    def test_populate_obj_obj(self, db_session):
        created_user = add_user(db_session)
        # reset password
        test_obj = DummyUserObj()
        created_user.populate_obj_from_obj(test_obj)
        assert created_user.user_name == test_obj.username
        assert created_user.email == test_obj.email

    def test_populate_obj_obj_exclude(self, db_session):
        created_user = add_user(db_session)
        # reset password
        test_obj = DummyUserObj()
        created_user.populate_obj_from_obj(test_obj)
        assert created_user.user_name == test_obj.username
        assert created_user.email == test_obj.email

    def test_populate_obj_obj_include(self, db_session):
        created_user = add_user(db_session)
        # reset password
        test_obj = DummyUserObj()
        created_user.populate_obj_from_obj(test_obj)
        assert created_user.username != test_obj.username
        assert created_user.email != test_obj.email

    def test_add_object_without_flush(self, db_session):
        user = UserTest(username="some_new_user", email="foo")
        assert user.id is None
        user.persist()
        assert user.id is None

    def test_add_object_with_flush(self, db_session):
        user = UserTest(username="some_new_user", email="foo")
        assert user.id is None
        user.persist(flush=True)
        assert user.id is not None

    def test_delete_object_with_flush(self, db_session):
        user = UserTest(username="some_new_user", email="foo")
        assert user.id is None
        user.persist(flush=True)
        assert user.id is not None
        uid = user.id
        UserService.by_id(uid) is not None
        user.delete()
        assert UserService.by_id(uid) is None
