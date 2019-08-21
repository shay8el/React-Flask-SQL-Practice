from base64 import b64encode


from DAL.app_context_db import get_db_connector



def get_candidates():
    db_connector = get_db_connector()
    candidates = db_connector.get_candidates()
    return candidates


def encrypt_voter_id(voter_id):
    # todo: use real encryption
    return b64encode(voter_id)


def send_vote(vote):
    db_connector = get_db_connector()
    voter_id = vote['voterID']

    if db_connector.is_voter_allowed(voter_id):
        db_connector.insert_voter(voter_id)
        encrypt_id = encrypt_voter_id(voter_id)
        db_connector.insert_vote(encrypt_id, vote['candidateID'])
        return True
    return False
