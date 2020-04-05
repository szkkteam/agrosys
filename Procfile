web: gunicorn wsgi:app
worker: python manage.py --env "prod" celery worker