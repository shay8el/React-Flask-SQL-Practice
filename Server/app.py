def create_app():
    from flask import Flask, request
    from flask_cors import CORS
    import json

    from DAL.app_context_db import init_app_context_db
    from results import get_results
    from vote import get_candidates, send_vote

    app = Flask(__name__)
    init_app_context_db(app)
    CORS(app)

    @app.route('/')
    def index():
        return "nothing to do here"

    @app.route('/get_candidates')
    def get_candidates_request():
        return json.dumps(get_candidates())

    @app.route('/send_vote', methods=['POST'])
    def send_vote_request():
        vote = json.loads(request.data)
        is_inserted = send_vote(vote)
        if is_inserted:
            msg = "Your Vote Inserted"
            return msg, 200
        else:
            msg = "Unknown error - you may tried to vote twice"
            return msg, 400

    @app.route('/get_results')
    def get_results_request():
        res = get_results()
        return json.dumps(res)

    return app


main_app = create_app()

if __name__ == '__main__':
    main_app.run(host="127.0.0.1", port=5000)
