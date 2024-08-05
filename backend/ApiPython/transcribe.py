from flask import request, jsonify
from faster_whisper import WhisperModel
import requests

def transcribe():
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

    # Enviar la transcripción a la API 'important'
    response = requests.post('http://localhost:5000/important', json={'texto': text})
    
    if response.status_code == 200:
      return jsonify({'PalabrasImportantes': response.json()}), 200
    else:
      return jsonify({'error': 'Error al procesar las palabras importantes.'}), 500
  else:
    return jsonify({'error': 'El archivo no es .wav'}), 400
