import json
import os
import sqlite3

from DAL.base_db_connector import BaseDBConnector


class SqlDBConnector(BaseDBConnector):

    def __init__(self, config_path):
        super(SqlDBConnector, self).__init__(config_path)
        self.db_path = os.path.join(self.config['base_dir'], self.config['DB_dir'], self.config['DB_name'])

        self.init_db_connection()

    def init_db_connection(self):
        if not os.path.isfile(self.db_path):
            self.create_tables()
            self.insert_mock_data()
        self.connection = self.__setup_connection()
        print

    def __setup_connection(self):
        return sqlite3.connect(self.db_path)

    def create_tables(self):
        path = os.path.join(self.config['base_dir'], self.config['schema_path'])
        qry = open(path, 'r').read()
        sqlite3.complete_statement(qry)
        conn = self.__setup_connection()
        cursor = conn.cursor()
        try:
            cursor.executescript(qry)
        except Exception as e:
            print e

    def insert_mock_data(self):
        path = os.path.join(self.config['base_dir'], self.config['mock_candidates_path'])
        qry = open(path, 'r').read()
        sqlite3.complete_statement(qry)
        conn = self.__setup_connection()
        cursor = conn.cursor()
        try:
            cursor.executescript(qry)
        except Exception as e:
            print e

    def is_voter_allowed(self, voter_id):
        qry = "SELECT EXISTS(SELECT 1 FROM voters WHERE id={0} AND is_voted=1)".format(voter_id)
        try:
            is_allowed = not self.__execute_bool_query(qry)
        except Exception as e:
            is_allowed = False
        return is_allowed

    def insert_vote(self, voter_id, candidate_id):
        qry = "INSERT INTO votes(voter, candidate) VALUES ('{0}',{1})".format(voter_id, candidate_id)
        self.__execute_insert_query(qry)

    def insert_voter(self, voter_id):
        qry = "INSERT INTO voters(id) VALUES ({0})".format(voter_id)
        self.__execute_insert_query(qry)

    def get_candidates(self):
        qry = "SELECT * FROM candidates"
        rows = self.__execute_select_query(qry, format_to_dict=True)
        return rows

    def get_results(self):
        qry = """
        SELECT candidates.name, votes.candidate, COUNT (votes.id) FROM votes 
        INNER JOIN candidates ON votes.candidate=candidates.id
        GROUP BY votes.candidate
        ORDER BY COUNT (votes.id) DESC
        """
        rows = self.__execute_select_query(qry)
        return map(lambda tup: {'candidateName': tup[0], 'candidateId': tup[1],'votes': tup[2]}, rows)

    def __execute_insert_query(self, qry):
        conn = self.connection
        cursor = conn.cursor()
        try:
            cursor.execute(qry)
            conn.commit()
        except Exception as e:
            raise e

    @staticmethod
    def parse_to_dict(keys, rows):
        return [{key: row[i] for i, key in enumerate(keys)} for row in rows]

    def __execute_select_query(self, qry, format_to_dict=False):
        conn = self.connection
        cursor = conn.cursor()

        try:
            cursor.execute(qry)
            keys = [key[0] for key in cursor.description]
            rows = cursor.fetchall()
        except Exception as e:
            print e
            raise e

        conn.commit()
        if format_to_dict:
            return self.parse_to_dict(keys, rows)
        return rows

    def __execute_bool_query(self, qry):
        rows = self.__execute_select_query(qry)
        return bool(rows[0][0])
