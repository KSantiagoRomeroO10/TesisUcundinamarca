from flask import Flask

from transcribe import transcribe
from important import important

app = Flask(__name__)

@app.route('/transcribe', methods=['POST'])
def transcribe_controller():
  return transcribe()

@app.route('/important', methods=['POST'])
def important_controller():
  return important()

if __name__ == '__main__':
  app.run(debug=True)
