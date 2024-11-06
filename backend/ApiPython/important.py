from flask import request, jsonify
import spacy

def important():
  nlp = spacy.load('es_core_news_lg')

  if 'texto' not in request.json:
    return jsonify({'error': 'Llave "texto" no encontrada en el JSON.'}), 400

  text = request.json['texto']
  doc = nlp(text)
  
  palabras_importantes = []
  for token in doc:
    # Ignorar signos de puntuación y partículas irrelevantes
    if token.is_punct:
      continue
    # Filtrar solo los tipos de palabras relevantes
    if token.pos_ in ['VERB', 'NOUN', 'PROPN', 'ADJ', 'ADV', 'NUM']:
      # Incluir solo palabras relevantes en minúsculas
      palabras_importantes.append(token.lemma_.lower())

  # Convertimos el conjunto a una lista para devolverlo en formato JSON
  return jsonify(palabras_importantes), 200
