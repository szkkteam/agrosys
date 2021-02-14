from flask_unchained import (controller, resource, func, include, prefix,
                             get, delete, post, patch, put, rule)
from flask_unchained.bundles.security import SecurityController, UserResource

from backend.views import ContactSubmissionResource, SiteController


routes = lambda: [
    include('flask_unchained.bundles.admin.routes'),
    controller('/auth', SecurityController, rules=[
        get('/confirm/<token>', SecurityController.confirm_email),
        get('/reset-password/<token>', SecurityController.reset_password),
    ]),
    controller(SiteController),
    prefix('/api/v1', [
        controller('/auth', SecurityController, rules=[
            get('/check-auth-token', SecurityController.check_auth_token, only_if=True),
            post('/login', SecurityController.login),
            get('/logout', SecurityController.logout),
            post('/send-confirmation-email', SecurityController.send_confirmation_email),
            post('/forgot-password', SecurityController.forgot_password),
            post('/reset-password/<token>', SecurityController.reset_password,
                 endpoint='security_controller.post_reset_password'),
            post('/change-password', SecurityController.change_password),
        ]),
        resource('/users', UserResource),
        resource('/contact-submissions', ContactSubmissionResource),
    ]),

    # frontend routes
    #get('/', endpoint='frontend.index'),
    get('/login/forgot-password', endpoint='frontend.forgot_password'),
    get('/login/reset-password/<token>', endpoint='frontend.reset_password'),
    get('/sign-up/resend-confirmation-email',
        endpoint='frontend.resend_confirmation_email'),
]
