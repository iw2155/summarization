from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS, cross_origin

# run venv\Scripts\activate
# cd into src
# then python app.py
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def application(environ, start_response):
  if environ['REQUEST_METHOD'] == 'OPTIONS':
    start_response(
      '200 OK',
      [
        ('Content-Type', 'application/json'),
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Headers', 'Authorization, Content-Type'),
        ('Access-Control-Allow-Methods', 'POST'),
      ]
    )
    return ''

# summarizer = pipeline('summarization')

@app.route('/api/summarize', methods=['GET', 'POST', 'OPTIONS'])
def summarize():
    print("WORKING")
    return jsonify({ "summary": "SUMMARY"})

if __name__ == '__main__':
    print("Backend Running")
    app.run(debug=True)