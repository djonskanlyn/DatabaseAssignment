import os

# For production: use secret key:
# To generate:
# python -c "import secrets;print(secrets.token_hex())"
SECRET_KEY = os.getenv('SECRET_KEY', 'replace with generated key here')

SQLALCHEMY_DATABASE_URI = "postgresql://databaseassignment_user:cvK9Y3Zda1wFYlV6CGAyQvOLSt3PxMia@dpg-cqovpsij1k6c73d9utg0-a.frankfurt-postgres.render.com/databaseassignment"

"""
#WAY2:
SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI', "sqlite:///project.db")

## BETTER:
## Get from ENV variable or revert to connection string as default
"""