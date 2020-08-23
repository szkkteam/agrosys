#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import CropTemplate

CROP_TEMPLATE_FIELDS = (
    'id',
    'title',
)


class CropTemplateSerializer(ModelSerializer):

    plans = fields.Nested('TemplateListSerializer', only=('id', 'title',), many=True)

    class Meta:
        model = CropTemplate
        fields = CROP_TEMPLATE_FIELDS + ('plans', )
        #dump_only = ('unit',)
        #load_instance = False


@api.serializer(many=True)
class CropTemplateListSerializer(ModelSerializer):

    class Meta:
        model = CropTemplate
        fields = CROP_TEMPLATE_FIELDS + ('plans', )
        #dump_only = ('unit', )
        #load_instance = False