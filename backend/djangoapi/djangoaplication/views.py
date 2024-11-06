from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import spacy

# Cargar el modelo de spaCy al iniciar el servidor para evitar recargas en cada solicitud
nlp = spacy.load('es_core_news_lg')

@csrf_exempt
def extraer_palabras_importantes(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            texto = data.get('texto', '')
            if not texto:
                return JsonResponse({'error': 'No se proporcionó el campo "texto".'}, status=400)
            
            doc = nlp(texto)
            palabras_importantes = [
                token.lemma_.lower()
                for token in doc
                if not token.is_punct and token.pos_ in ['VERB', 'NOUN', 'PROPN', 'ADJ', 'ADV', 'NUM']
            ]
            return JsonResponse({'palabras_importantes': palabras_importantes}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'El cuerpo de la solicitud no es un JSON válido.'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido. Use POST.'}, status=405)
