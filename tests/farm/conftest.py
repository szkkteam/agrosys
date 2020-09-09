#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import pytest


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


@pytest.fixture()
def specific_product(model_factory):
    yield model_factory.create('SpecificProduct', 'SPECIFIC_SPRING_WHEAT')


@pytest.fixture()
def AGRICULTURAL_PARCEL(soil, agri_type):
    return {
        'title': 'Agri parcel field 1',
        'notes': LONG_TEXT,
        'geometry': VALID_GEOJSON,
        'totalArea': 2.0,
        'referenceParcelType': 'AgriculturalParcel',
        'eligibleArea': 1.5,
        'agriculturalTypeId': agri_type.id,
        'soilTypeId': soil.id
    }

@pytest.fixture()
def CADASTRAL_PARCEL(soil, agri_type):
    return {
        'title': 'Cadastral parcel field 1',
        'notes': LONG_TEXT,
        'geometry': VALID_GEOJSON,
        'totalArea': 2.0,
        'referenceParcelType': 'CadastralParcel',
        'eligibleArea': 1.5,
        'agriculturalTypeId': agri_type.id,
        'soilTypeId': soil.id
    }

@pytest.fixture()
def FARMERS_BLOCK(soil, agri_type):
    return {
        'title': 'Farmers block field 1',
        'notes': LONG_TEXT,
        'geometry': VALID_GEOJSON,
        'totalArea': 2.0,
        'referenceParcelType': 'FarmersBlock',
        'eligibleArea': 1.5,
        'agriculturalTypeId': agri_type.id,
        'soilTypeId': soil.id
    }

@pytest.fixture()
def PHYSICAL_BLOCK(soil, agri_type):
    return {
        'title': 'Physical block field 1',
        'notes': LONG_TEXT,
        'geometry': VALID_GEOJSON,
        'totalArea': 2.0,
        'referenceParcelType': 'PhysicalBlock',
        'eligibleArea': 1.5,
        'agriculturalTypeId': agri_type.id,
        'soilTypeId': soil.id
    }
