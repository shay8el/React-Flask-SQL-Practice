from DAL.app_context_db import get_db_connector


def get_results():
    db_connector = get_db_connector()
    results = db_connector.get_results()
    return results