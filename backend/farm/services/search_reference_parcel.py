#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from flask import abort
from http import HTTPStatus
# Pip package imports
import requests
from geoalchemy2.shape import from_shape, to_shape
from shapely import geometry

# Internal package imports
from backend.reference.models import ReferenceParcelTypeEnum


class SearchReferenceParcel:


    class PhysicalBlockMeparHu:

        @classmethod
        def get_data(cls, block_name, data):
            result = []
            if data["message"] == "nincs találat" or not len(data['result'][0]['items']):
                abort(HTTPStatus.NOT_FOUND)
            for d in data['result']:
                for i in d['items']:
                    st = i['str'].replace('-', '').lower()
                    if st == block_name.lower():
                        result.append( {
                                'title': st,
                                'geometry': geometry.mapping(to_shape(i['box']))
                            }
                        )
            return result

        @classmethod
        def search_physical_block_mepar_hu(cls, block_name):
            r = requests.get('https://www.mepar.hu/mepar/ajax/search.php', params={'search': block_name})
            if r.status_code == requests.codes.ok:
                data = r.json()
                return cls.get_data(block_name, data)
            else:
                abort(HTTPStatus.SERVICE_UNAVAILABLE)

    @classmethod
    def search_parcel_hu(cls, parcel_type, name):
        if parcel_type == ReferenceParcelTypeEnum.PhysicalBlock:
            return cls.PhysicalBlockMeparHu.search_physical_block_mepar_hu(name)
        else:
            abort(HTTPStatus.NOT_IMPLEMENTED)
