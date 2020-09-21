#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports
from backend.farm.models import ReferenceParcel, Season, ReferenceParcelRelation, Farm


VALID_GEOJSON = {"type": "Feature",
                 "properties": {},
                 "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[17.71719217300415,47.12809671910988],[17.721483707427975,47.1230306334327],[17.725925445556637, 47.12485564784686
                        ],[17.723522186279297,47.12732296778955],[17.721827030181885,47.12662220216394],[17.71946668624878,47.12919163099024],
                        [17.71719217300415,47.12809671910988]]]
                  }
    }

LONG_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "


AGRICULTURAL_PARCEL = {
    'title': 'Agri parcel field 1',
    'notes': LONG_TEXT,
    'geometry': VALID_GEOJSON,
    'totalArea': 2.0,
    'referenceParcelType': 'AgriculturalParcel',
    'eligibleArea': 1.5,
    'agriculturalTypeId': lambda v,t: t.id,
    'soilTypeId': lambda v,t: v.id
}

CADASTRAL_PARCEL = {
    'title': 'Cadastral parcel field 1',
    'notes': LONG_TEXT,
    'geometry': VALID_GEOJSON,
    'totalArea': 2.0,
    'referenceParcelType': 'CadastralParcel',
    'eligibleArea': 1.5,
    'agriculturalTypeId': lambda v,t: t.id,
    'soilTypeId': lambda v,t: v.id
}

FARMERS_BLOCK = {
    'title': 'Farmers block field 1',
    'notes': LONG_TEXT,
    'geometry': VALID_GEOJSON,
    'totalArea': 2.0,
    'referenceParcelType': 'FarmersBlock',
    'eligibleArea': 1.5,
    'agriculturalTypeId': lambda v,t: t.id,
    'soilTypeId': lambda v,t: v.id
}

PHYSICAL_BLOCK = {
    'title': 'Physical block field 1',
    'notes': LONG_TEXT,
    'geometry': VALID_GEOJSON,
    'totalArea': 2.0,
    'referenceParcelType': 'PhysicalBlock',
    'eligibleArea': 1.5,
    'agriculturalTypeId': lambda v,t: t.id,
    'soilTypeId': lambda v,t: v.id
}




def get_input_data(input, soil, agri_type):
    data = input.copy()
    if isinstance(input, list):
        for i, v in enumerate(data):
            for key, value in v.items():
                v[key] = value(soil, agri_type) if callable(value) else value
            data[i] = v

    else:
        for key, value in data.items():
            data[key] = value(soil, agri_type) if callable(value) else value

    return data


class TestReferenceParcelResource:
    
    @pytest.mark.parametrize("input", [AGRICULTURAL_PARCEL, CADASTRAL_PARCEL, FARMERS_BLOCK, PHYSICAL_BLOCK])
    def test_create(self, api_client, farm_owner, soil, agri_type, input):
        api_client.login_as(farm_owner)

        data = get_input_data(input, soil, agri_type)

        season = Season.all()[0]
        r = api_client.post(url_for('api.reference_parcels_resource', season_id=season.id), data=data)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'notes' in r.json
        assert 'totalArea' in r.json
        assert 'eligibleArea' in r.json
        assert 'geometry' in r.json
        assert 'referenceParcelType' in r.json
        assert 'agriculturalType' in r.json
        assert 'soilType' in r.json
        assert 'season' in r.json

    @pytest.mark.parametrize("input", [AGRICULTURAL_PARCEL, CADASTRAL_PARCEL, FARMERS_BLOCK, PHYSICAL_BLOCK])
    def test_create_sub_parcels(self, api_client, farm_owner, soil, agri_type, input):
        api_client.login_as(farm_owner)

        data = get_input_data(input, soil, agri_type)
        data['parcels'] = [get_input_data(AGRICULTURAL_PARCEL.copy(), soil, agri_type)]

        season = Season.all()[0]
        r = api_client.post(url_for('api.reference_parcels_resource', season_id=season.id), data=data)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'notes' in r.json
        assert 'totalArea' in r.json
        assert 'eligibleArea' in r.json
        assert 'geometry' in r.json
        assert 'season' in r.json
        assert 'referenceParcelType' in r.json
        assert 'agriculturalType' in r.json
        assert 'soilType' in r.json
        assert 'parcels' in r.json
        for p in r.json['parcels']:
            assert 'id' in p
            # TODO: Simply cannot exclude season from child parcels
            assert 'season' not in p

    @pytest.mark.parametrize("input", [AGRICULTURAL_PARCEL, CADASTRAL_PARCEL, FARMERS_BLOCK, PHYSICAL_BLOCK])
    def test_create_missing_geometry(self, api_client, farm_owner, soil, agri_type, input):
        api_client.login_as(farm_owner)

        data = get_input_data(input, soil, agri_type)
        data['geometry'] = None
        season = Season.all()[0]
        r = api_client.post(url_for('api.reference_parcels_resource', season_id=season.id), data=data)
        assert r.status_code == 400
        assert 'geometry' in r.errors

    @pytest.mark.parametrize("input", [AGRICULTURAL_PARCEL, CADASTRAL_PARCEL, FARMERS_BLOCK, PHYSICAL_BLOCK])
    def test_create_missing_totalarea(self, api_client, farm_owner, soil, agri_type, input):
        api_client.login_as(farm_owner)

        data = get_input_data(input, soil, agri_type)
        data['totalArea'] = None
        season = Season.all()[0]
        r = api_client.post(url_for('api.reference_parcels_resource', season_id=season.id), data=data)
        assert r.status_code == 400
        assert 'totalArea' in r.errors

    def test_list(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        season = Season.all()[0]
        r = api_client.get(url_for('api.reference_parcels_resource', season_id=season.id))
        assert r.status_code == 200
        assert len(r.json)
        for r in r.json:
            assert 'id' in r
            assert 'title' in r
            assert 'notes' in r
            assert 'totalArea' in r
            assert 'eligibleArea' in r
            assert 'geometry' in r
            assert 'referenceParcelType' in r
            assert 'agriculturalType' in r
            assert 'soilType' in r

            # TODO: Simply cannot exclude season from season list
            #assert 'season' not in r


    @pytest.mark.parametrize("models", ['AgriculturalParcel(AGRICULTURAL_PARCEL_GROUPED_1)'], indirect=True)
    def test_get(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        season = Season.all()[0]
        group = season.reference_parcels[0]
        group.parcels_add.append(models.AGRICULTURAL_PARCEL_GROUPED_1)
        r = api_client.get(url_for('api.reference_parcel_resource', parcel_id=group.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'notes' in r.json
        assert 'totalArea' in r.json
        assert 'eligibleArea' in r.json
        assert 'geometry' in r.json
        assert 'referenceParcelType' in r.json
        assert 'agriculturalType' in r.json
        assert 'soilType' in r.json
        assert 'parcels' in r.json
        assert 'season' in r.json
        for parcel in r.json['parcels']:
            assert 'id' in parcel
            assert 'title' in parcel
            assert 'notes' in parcel
            assert 'totalArea' in parcel
            assert 'eligibleArea' in parcel
            assert 'geometry' in parcel
            assert 'agriculturalType' in parcel
            assert 'referenceParcelType' in parcel
            assert 'soilType' in parcel
            assert 'season' not in parcel            
            assert 'parcels' not in parcel

    def test_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        new_name = "New Field Name"

        parcel = ReferenceParcel.all()[0]        
        r = api_client.patch(url_for('api.reference_parcel_resource', parcel_id=parcel.id), data=dict(title=new_name))
        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    @pytest.mark.parametrize("input", [AGRICULTURAL_PARCEL, CADASTRAL_PARCEL, FARMERS_BLOCK, PHYSICAL_BLOCK])
    def test_put(self, api_client, farm_owner, soil, agri_type, input):
        api_client.login_as(farm_owner)
        new_name = "New Field Name"

        data = get_input_data(input, soil, agri_type)
        data['title'] = new_name
        data.pop('referenceParcelType')

        parcel = ReferenceParcel.all()[0]    
        r = api_client.put(url_for('api.reference_parcel_resource', parcel_id=parcel.id), data=data)

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json
        assert 'season' in r.json

    @pytest.mark.skip(reason="Database cascades not be reworked, because related objects are not deleted.")
    def test_delete(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        parcel = ReferenceParcel.all()[0] 
        r = api_client.delete(url_for('api.reference_parcel_resource', parcel_id=parcel.id))

        assert r.status_code == 204
        assert not ReferenceParcel.get(parcel.id)

    @pytest.mark.skip(reason="See ReferenceParcelSerializer: How to validate area based on other value which is stored in db.")
    def test_invalid_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        parcel = ReferenceParcel.all()[0]        
        r = api_client.patch(url_for('api.reference_parcel_resource', parcel_id=parcel.id), data=dict(totalArea=0.1))
        assert r.status_code == 400
        assert 'totalArea' in r.errors


class TestGroupReferenceParcelResource:

    @pytest.mark.parametrize("input", [AGRICULTURAL_PARCEL, CADASTRAL_PARCEL, FARMERS_BLOCK, PHYSICAL_BLOCK])
    def test_create(self, api_client, farm_owner, soil, agri_type, input):
        api_client.login_as(farm_owner)

        data = get_input_data(input, soil, agri_type)

        parcel = ReferenceParcel.all()[0]
        r = api_client.post(url_for('api.group_reference_parcels_resource', group_id=parcel.id), data=data)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'notes' in r.json
        assert 'totalArea' in r.json
        assert 'eligibleArea' in r.json
        assert 'geometry' in r.json
        assert 'referenceParcelType' in r.json
        assert 'agriculturalType' in r.json
        assert 'soilType' in r.json

    @pytest.mark.parametrize("models", ['AgriculturalParcel(AGRICULTURAL_PARCEL_GROUPED_1, AGRICULTURAL_PARCEL_GROUPED_2)'], indirect=True)
    def test_list(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        season = Season.all()[0]
        group = season.reference_parcels[0]
        group.parcels_add.append(models.AGRICULTURAL_PARCEL_GROUPED_1)
        group.parcels_add.append(models.AGRICULTURAL_PARCEL_GROUPED_2)

        r = api_client.get(url_for('api.group_reference_parcels_resource', group_id=group.id))
        assert r.status_code == 200
        assert len(r.json) == 4
        for r in r.json:
            assert 'id' in r
            assert 'title' in r
            assert 'notes' in r
            assert 'totalArea' in r
            assert 'eligibleArea' in r
            assert 'geometry' in r
            assert 'referenceParcelType' in r
            assert 'agriculturalType' in r
            assert 'soilType' in r

    @pytest.mark.parametrize("models", ['AgriculturalParcel(AGRICULTURAL_PARCEL_GROUPED_1)'], indirect=True)
    def test_put(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        season = Season.all()[0]
        group = season.reference_parcels[0]
        parcel = models.AGRICULTURAL_PARCEL_GROUPED_1

        len_relations = len(ReferenceParcelRelation.all())
        r = api_client.put(url_for('api.group_reference_parcel_resource', group_id=group.id, parcel_id=parcel.id))
        assert r.status_code == 200
        assert 'title' in r.json
        assert 'id' in r.json
        print("Result: ", r.json)
        assert (len_relations + 1) == len(ReferenceParcelRelation.all())

    @pytest.mark.skip(reason="Database cascades not be reworked, because related objects are not deleted.")
    @pytest.mark.parametrize("models", ['AgriculturalParcel(AGRICULTURAL_PARCEL_GROUPED_1)'], indirect=True)
    def test_delete(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        season = Season.all()[0]
        group = season.reference_parcels[0]
        group.parcels_add.append(models.AGRICULTURAL_PARCEL_GROUPED_1)

        len_relations = len(ReferenceParcelRelation.all())
        r = api_client.delete(url_for('api.group_reference_parcel_resource', group_id=group.id, parcel_id=models.AGRICULTURAL_PARCEL_GROUPED_1.id))

        assert r.status_code == 204
        assert (len_relations - 1) == len(ReferenceParcelRelation.all())

@pytest.mark.skip(reason="Search functionality need to be reworked.")
class TestSearchParcels:

    def test_valid(self, api_client, farm_owner, country_hu, physical_block):
        api_client.login_as(farm_owner)

        farm = Farm.all()[0]
        name = "xnkcfd18"
        r = api_client.get(url_for('api.search_reference_parcels', name=name, farm_id=farm.id, parcel_type_id=physical_block.id))
        assert r.status_code == 200
        for d in r.json:
            assert 'title' in d
            assert 'eligibleArea' in d
            assert 'totalArea' in d
            assert 'geometry' in d
            assert name in d['title']

    def test_invalid_farm(self, api_client, farm_owner, physical_block):
        api_client.login_as(farm_owner)

        name = "xnkcfd18"
        r = api_client.get(url_for('api.search_reference_parcels', name=name, farm_id=99, parcel_type_id=physical_block.id))
        assert r.status_code == 404

    def test_invalid_parcel_type(self, api_client, farm_owner, country_hu):
        api_client.login_as(farm_owner)

        farm = Farm.all()[0]
        name = "xnkcfd18"
        r = api_client.get(url_for('api.search_reference_parcels', name=name, farm_id=farm.id, parcel_type_id=99))
        assert r.status_code == 404

    def test_not_found(self, api_client, farm_owner, country_hu, physical_block):
        api_client.login_as(farm_owner)

        farm = Farm.all()[0]
        name = "xnkcfd76"
        r = api_client.get(url_for('api.search_reference_parcels', name=name, farm_id=farm.id, parcel_type_id=physical_block.id))
        assert r.status_code == 200
        assert not len(r.json)

@pytest.mark.skip(reason="Protected resource is not implemented yet.")
class TestFieldResourceProtected:

    def test_create(self, api_client, farm_user1, farm_user2):
        # User 1
        api_client.login_as(farm_user1)
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        # Get the new filed data
        data = get_field_data(soil)

        r = api_client.post(url_for('api.fields_resource', farm_id=farm.id), data=data)
        assert r.status_code == 201
        api_client.logout()

        # User 2
        api_client.login_as(farm_user2)

        # Try to create object in other user's protected resource
        r = api_client.post(url_for('api.fields_resource', farm_id=farm.id), data=data)
        assert r.status_code == 403

    def test_list(self, api_client, farm_user1, farm_user2):
        # User 1
        api_client.login_as(farm_user1)
        farm1, _, _ = get_user_farm_field_soil(farm_user1)

        user1_resp = api_client.get(url_for('api.fields_resource', farm_id=farm1.id))
        assert user1_resp.status_code == 200
        assert len(user1_resp.json)

        api_client.logout()
        # User 2
        api_client.login_as(farm_user2)
        # Get neccesry data from User 2
        farm2, _, _ = get_user_farm_field_soil(farm_user2)

        user2_resp = api_client.get(url_for('api.fields_resource', farm_id=farm2.id))
        assert user2_resp.status_code == 200
        assert len(user2_resp.json)

        # Make sure they don't see each other's farm
        for data1 in user1_resp.json:
            for data2 in user2_resp.json:
                # Compareing ID is enough, because of laziness probably the other fields are similar
                assert data1['id'] != data2['id']

    def test_get(self, api_client, farm_user1, farm_user2):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        r = api_client.get(url_for('api.field_resource', field_id=field.id))
        assert r.status_code == 403


    def test_patch(self, api_client, farm_user1, farm_user2):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        new_name = "New Field Name"
        r = api_client.patch(url_for('api.field_resource', field_id=field.id), data=dict(title=new_name))
        assert r.status_code == 403

    def test_put(self, api_client, farm_user1, farm_user2):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        new_name = "New Field Name"
        r = api_client.put(url_for('api.field_resource', field_id=field.id), data=dict(title=new_name))
        assert r.status_code == 403

    def test_delete(self, api_client, farm_user1, farm_user2):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        r = api_client.delete(url_for('api.field_resource', field_id=field.id))
        assert r.status_code == 403