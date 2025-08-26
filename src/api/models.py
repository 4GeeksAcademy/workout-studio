from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    role:Mapped[str] = mapped_column(String(15), nullable=False, default="traine")
    #is_trainer: Mapped[bool] = mapped_column(Boolean(), nullable=False)
 
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Workout(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)   
    name: Mapped[str] = mapped_column(String(50))
    section: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    machine: Mapped[str] = mapped_column(nullable=False)
    link: Mapped[str] = mapped_column(String(255), nullable=True)
    media: Mapped[str] = mapped_column(String(255), nullable=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "section": self.section,
        }    


class Favorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    usuario_id: Mapped[int] = mapped_column(db.ForeignKey("user.id"))
    usuario: Mapped["User"] = db.relationship("User", backref="favorites")

    exercise_id: Mapped[int] = mapped_column(db.ForeignKey("workout.id"))
    exercise: Mapped["Workout"] = db.relationship("Workout", backref="favorited_by")
