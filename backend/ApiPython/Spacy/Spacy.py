import spacy

nlp = spacy.load('es_core_news_sm')

with open('backend/ApiPython/pruebas.txt', 'r', encoding="utf-8") as f:
  text = f.read()

doc = nlp(text)

palabras_importantes = []
for token in doc:
  # print(token.pos_)
  if token.pos_ == 'VERB' or token.pos_ == 'NOUN' or token.pos_ == 'PROPN' or token.pos_ == 'ADJ' or token.pos_ == 'ADV':
    palabras_importantes.append(token.text)

print(palabras_importantes)