from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey, Table, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List


db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(120), nullable=False)
    role: Mapped[str] = mapped_column(
        String(15), nullable=False, default="traine")
    # favorites
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=True)

    # Revisar cascade https://docs.sqlalchemy.org/en/20/orm/cascades.html

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def save_user(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            return Exception("Something went wrong")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "role": self.role
            # do not serialize the password, its a security breach
        }


class Workout(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    section: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    machine: Mapped[str] = mapped_column(String(120),nullable=False)
    link: Mapped[str] = mapped_column(String(255), nullable=True)
    media: Mapped[str] = mapped_column(String(255), nullable=True)
    #rutinas_id: Mapped[int] = mapped_column(db.ForeignKey("routines.id"))
    #rutinas: Mapped["Routines"] = db.relationship(back_populates="workoute")
    routine: Mapped[List["Routines"]]=relationship(secondary="association_routines", back_populates="workouts")

    def __init__(self, name, section, machine, link, media):
        self.name=name
        self.section=section
        self.machine=machine
        self.link=link
        self.media=media

    def update_workout(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            return Exception("Something went wrong")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "section": self.section,
            "machine": self.machine,
            "link": self.link,
            "media": self.media
        }


association_routines = Table(
    "association_routines",
    db.metadata,
    Column("routines_id", ForeignKey("routines.id")),
    Column("workout_id", ForeignKey("workout.id"))
)

class Routines(db.Model):
    __tablename__ = "routines"
    id: Mapped[int]=mapped_column(primary_key=True)
    name: Mapped[str]=mapped_column(String(50))
    workouts: Mapped[List["Workout"]]=relationship(secondary="association_routines", back_populates="routine")
 



    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "workout": self.workoute
        }
        

   # workout_id=Mapped[int]=mapped_column(db.ForeignKey("workout.id"))
    #workouts_for_routines: Mapped["Workout"]=db.relationship(
     #   "Workout", backref="workoutRoutine")


class Favorites(db.Model):
    id: Mapped[int]=mapped_column(primary_key=True)

    usuario_id: Mapped[int]=mapped_column(db.ForeignKey("user.id"))
    usuario: Mapped["User"]=db.relationship("User", backref="favorites")

    exercise_id: Mapped[int]=mapped_column(db.ForeignKey("workout.id"))
    exercise: Mapped["Workout"]=db.relationship(
        "Workout", backref="favorited_by")
