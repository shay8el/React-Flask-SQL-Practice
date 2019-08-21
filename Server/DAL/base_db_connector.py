import json
from abc import abstractmethod


class BaseDBConnector(object):
    def __init__(self, config_path):
        self.config = self.load_config_file(config_path)

    @staticmethod
    def load_config_file(config_path):
        with open(config_path) as json_file:
            data = json.load(json_file)
            return data

    @abstractmethod
    def __setup_connection(self):
        raise NotImplemented

    @abstractmethod
    def create_tables(self):
        raise NotImplemented

    @abstractmethod
    def insert_mock_data(self):
        raise NotImplemented

    @abstractmethod
    def is_user_exist(self, user_id):
        pass

    @abstractmethod
    def send_vote(self, candidate_id):
        pass

    @abstractmethod
    def get_candidates(self):
        pass

    @abstractmethod
    def get_results(self):
        pass
