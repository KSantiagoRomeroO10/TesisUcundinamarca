from flask import Flask, request, jsonify
from faster_whisper import WhisperModel

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_audio():
  if 'Audio' not in request.files:
    return jsonify({'error': 'Llave no encontrada.'}), 400

  file = request.files['Audio']

  if file and file.filename.endswith('.wav'):
    model_size = request.args.get('model_size', 'tiny')
    model = WhisperModel(model_size, device="cpu", compute_type="float32")

    segments, info = model.transcribe(file, beam_size=5)
    text = ''
    for segment in segments:
      text += segment.text + ' '
    text = text.strip()
    
    return jsonify({'Transcripción': text}), 200
  else:
    return jsonify({'error': 'El archivo no es .wav'}), 400


if __name__ == '__main__':
  app.run(debug=True)
