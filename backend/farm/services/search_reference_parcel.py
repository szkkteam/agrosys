#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import re
# Pip package imports
import requests
from lxml import html
from geoalchemy2.shape import from_shape, to_shape
import shapely

# Internal package imports
from backend.reference.models import ReferenceParcelTypeEnum

PARSE_NUMBERS = re.compile(r"\-?\d+\.\d+")

class SearchReferenceParcel:


    class PhysicalBlockMeparHu:

        @classmethod
        def parse_area(cls, html_str):
            tree = html.fromstring(html_str)
            eligible_area = None,
            total_area = None
            table_rows = tree.xpath('//table/tr')
            for row in table_rows:
                head, data = row.xpath('./td')
                if head.text == "támogatható terület":
                    eligible_area = float(PARSE_NUMBERS.findall(data.text)[0]) * 10000 # Convert it to m2
                if head.text == "összes terület":
                    total_area = float(PARSE_NUMBERS.findall(data.text)[0]) * 10000 # Convert it to m2
            return eligible_area, total_area


        @classmethod
        def get_data(cls, block_name, data):
            result = []
            if data["message"] == "nincs találat" or not len(data['result'][0]['items']):
                return result
            for d in data['result']:
                for i in d['items']:
                    st = i['str'].replace('-', '').lower()
                    if st == block_name.lower():
                        # Get the geomtry
                        g1 = shapely.wkt.loads(i['box'])
                        g2 = shapely.geometry.mapping(g1)
                        # Parse the area
                        e_a, t_a = cls.parse_area(i['html'])
                        result.append( {
                                'title': st,
                                'eligibleArea': e_a,
                                'totalArea': t_a,
                                'geometry': {
                                    'type': 'Feature',
                                    # TODO: This is currently empty.
                                    'properties': {},
                                    'geometry': g2,
                                },
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
                return []

    @classmethod
    def search_parcel_hu(cls, parcel_type, name):
        if parcel_type == ReferenceParcelTypeEnum.PhysicalBlock:
            return cls.PhysicalBlockMeparHu.search_physical_block_mepar_hu(name)
        else:
            return []
