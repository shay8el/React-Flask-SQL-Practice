import os

from flask import g, current_app

from DAL.sql_db_connector import SqlDBConnector


def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def create_db_connector_object():
    db_config = os.path.join('DAL', 'config.json')
    return SqlDBConnector(db_config)


def init_app_context_db(app):
    with app.app_context():
        db_connector = create_db_connector_object()
        g._db_connector = db_connector


def get_db_connector():
    db_connector = create_db_connector_object()
    return db_connector


def get_db_connector1():
    with current_app.app_context():
        print
        db_connector = getattr(g, '_db_connector', None)
        if db_connector is None:
            db_connector = create_db_connector_object()
        return db_connector
