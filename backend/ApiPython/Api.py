from flask import Flask
from flask_cors import CORS

from transcribe import transcribe
from important import important

app = Flask(__name__)

# Permitir CORS desde cualquier origen
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/transcribe', methods=['POST'])
def transcribe_controller():
  return transcribe()

@app.route('/important', methods=['POST'])
def important_controller():
  return important()

@app.route('/check', methods=['GET'])
def check():
  return '', 200

if __name__ == '__main__':
  app.run(debug=True)
