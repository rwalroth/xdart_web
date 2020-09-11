from .extensions import db, bcrypt

roles = db.Table(
    'roles',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('role.id'), primary_key=True)
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True)
    username = db.Column(db.String(128), unique=True)
    password = db.Column(db.Text)
    roles = db.relationship("Role", secondary=roles)
    schedules = db.relationship("Schedule", backref="User", lazy=True)

    @property
    def rolenames(self):
        try:
            return [role.name for role in self.roles]
        except:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def set_password(self, new_password):
        self.password = bcrypt.generate_password_hash(new_password)

    def __repr__(self):
        return f"<User {self.username}>"


class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(255))

    def __repr__(self):
        return f"<Role {self.name}>"


class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    beamline = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "start": str(self.start_date),
            "end": str(self.end_date),
            "beamline": self.beamline
        }
