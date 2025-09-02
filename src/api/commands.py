import click
from api.models import db, User

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator.
Flask commands are useful to run cronjobs or tasks outside of the API but still in integration
with your database. For example: Import the price of bitcoin every night at 12am.
"""

def setup_commands(app):
    """
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """

    usuarios = [
        {
            "name": "Ana Rodríguez",
            "email": "ana.rodriguez@example.com",
            "password": "Ana1234!",
            "role": "admin"
        },
        {
            "name": "Carlos Méndez",
            "email": "carlos.mendez@example.com",
            "password": "CarlosSecure99",
            "role": "editor"
        },
        {
            "name": "Lucía Gómez",
            "email": "lucia.gomez@example.com",
            "password": "LuciaPass2023",
            "role": "viewer"
        },
        {
            "name": "Javier Torres",
            "email": "javier.torres@example.com",
            "password": "JaviTorres!56",
            "role": "editor"
        },
        {
            "name": "María Fernández",
            "email": "maria.fernandez@example.com",
            "password": "MariaF2024*",
            "role": "admin"
        }
    ]

    @app.cli.command("insert-test-users")
    @click.argument("count", type=int)
    def insert_test_users(count):
        print("Creating test users")

        for i, user_data in enumerate(usuarios):
            if i >= count:
                break

            user = User()
            user.name = user_data["name"]
            user.email = user_data["email"]
            user.password = "123456"  # Overwrites original password for testing
            user.role = user_data["role"]
            user.is_active = True

            db.session.add(user)
            db.session.commit()
            print("User:", user.email, "created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass
