from flask_unchained.bundles.sqlalchemy import ModelManager

from ..models import ContactSubmission


class ContactSubmissionManager(ModelManager):
    class Meta:
        model = ContactSubmission
