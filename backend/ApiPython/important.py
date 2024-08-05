from flask import request, jsonify
import spacy

def important():
  nlp = spacy.load('es_core_news_sm')

  if 'texto' not in request.json:
    return jsonify({'error': 'Llave "texto" no encontrada en el JSON.'}), 400

  text = request.json['texto']

  doc = nlp(text)

  palabras_importantes = []
  for token in doc:
    if token.pos_ in ['VERB', 'NOUN', 'PROPN', 'ADJ', 'ADV', 'NUM']:
      palabras_importantes.append(token.text)

  return jsonify(palabras_importantes), 200