from django.shortcuts import render

from .models import Video, Audio

from django.http import JsonResponse  # Importa JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import spacy

nlp = spacy.load('es_core_news_lg')

@csrf_exempt
def extraer_palabras_importantes(request):
  if request.method == 'POST':
    try:
      data = json.loads(request.body)
      texto = data.get('texto', '')
      if not texto:
        return JsonResponse({'error': 'No se proporcionó el campo "texto".', 'Entrega': False}, status=400)
      
      doc = nlp(texto)
      palabras_importantes = []
      palabras_originales = []

      for token in doc:
        if not token.is_punct and token.pos_ in ['VERB', 'NOUN', 'PROPN', 'ADJ', 'ADV', 'NUM']:
          palabras_importantes.append(token.lemma_.lower())
          palabras_originales.append(token.text.lower())

      return JsonResponse({
        'palabras_importantes': palabras_importantes,
        'palabras_originales': palabras_originales, 
        'Entrega': True
      }, status=200)
    except json.JSONDecodeError:
      return JsonResponse({'error': 'El cuerpo de la solicitud no es un JSON válido.'}, status=400)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)


@csrf_exempt
def subir_video(request):
  if request.method == 'POST':
    try:
      # Obtener el archivo de video desde la solicitud
      video_file = request.FILES.get('video_file')
      if not video_file:
        return JsonResponse({'error': 'No se proporcionó un archivo de video.', 'Entrega': False}, status=400)

      # Leer el contenido del archivo y guardarlo en la base de datos
      video_blob = video_file.read()
      video = Video(videoBlob=video_blob)
      video.save()

      return JsonResponse({'mensaje': 'Video subido correctamente.', 'idVideo': video.idVideo, 'Entrega': True}, status=201)
    except Exception as e:
      return JsonResponse({'error': str(e)}, status=500)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)

@csrf_exempt
def subir_audio(request):
  if request.method == 'POST':
    try:
      # Obtener el archivo de audio desde la solicitud
      audio_file = request.FILES.get('audio_file')
      if not audio_file:
        return JsonResponse({'error': 'No se proporcionó un archivo de audio.', 'Entrega': False}, status=400)

      # Leer el contenido del archivo y guardarlo en la base de datos
      audio_blob = audio_file.read()
      audio = Audio(audioBlob=audio_blob)
      audio.save()

      return JsonResponse({'mensaje': 'Audio subido correctamente.', 'idAudio': audio.idAudio, 'Entrega': True}, status=201)
    except Exception as e:
      return JsonResponse({'error': str(e)}, status=500)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)