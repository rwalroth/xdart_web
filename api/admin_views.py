from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from wtforms import PasswordField
from .extensions import db
from .models import User, Role, Schedule


class UserView(ModelView):
    form_excluded_columns = ('password',)
    form_extra_fields = {
        'password2': PasswordField('Password')
    }
    form_columns = (
        'username',
        'email',
        'roles',
        'schedules',
        'password2'
    )

    column_hide_backrefs = False
    column_list = ('email', 'username', 'roles', 'schedules')

    def on_model_change(self, form, model, is_created):
        if form.password2.data is not None and form.password2.data != ' ':
            model.set_password(form.password2.data)


admin = Admin(name="xdart_api", template_mode="bootstrap3")
admin.add_view(UserView(User, db.session))
admin.add_view(ModelView(Role, db.session))
admin.add_view(ModelView(Schedule, db.session))
