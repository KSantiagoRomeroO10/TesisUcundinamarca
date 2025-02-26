from django.shortcuts import render
from .models import Video, Audio
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import spacy
import hashlib

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


ALLOWED_VIDEO_MIME_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska']
ALLOWED_AUDIO_MIME_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/x-wav']

@csrf_exempt
def subir_video(request):
  if request.method == 'POST':
    try:
      video_file = request.FILES.get('video_file')
      if not video_file:
        return JsonResponse({'error': 'No se proporcionó un archivo de video.', 'Entrega': False}, status=400)

      if video_file.content_type not in ALLOWED_VIDEO_MIME_TYPES:
        return JsonResponse({'error': 'El archivo no es un video válido.', 'Entrega': False}, status=400)

      video_blob = video_file.read()
      file_hash = hashlib.sha256(video_blob).hexdigest()

      if Video.objects.filter(fileHash=file_hash).exists():
        return JsonResponse({'error': 'El video ya existe en la base de datos.', 'Entrega': False}, status=400)

      video = Video(videoBlob=video_blob, fileHash=file_hash)
      video.save()

      return JsonResponse({'mensaje': 'Video subido correctamente.', 'idVideo': video.idVideo, 'Entrega': True}, status=201)
    except Exception as e:
      return JsonResponse({'error': str(e), 'Entrega': False}, status=500)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)


@csrf_exempt
def subir_audio(request):
  if request.method == 'POST':
    try:
      audio_file = request.FILES.get('audio_file')
      if not audio_file:
        return JsonResponse({'error': 'No se proporcionó un archivo de audio.', 'Entrega': False}, status=400)

      if audio_file.content_type not in ALLOWED_AUDIO_MIME_TYPES:
        return JsonResponse({'error': 'El archivo no es un audio válido.', 'Entrega': False}, status=400)

      audio_blob = audio_file.read()
      file_hash = hashlib.sha256(audio_blob).hexdigest()

      if Audio.objects.filter(fileHash=file_hash).exists():
        return JsonResponse({'error': 'El audio ya existe en la base de datos.', 'Entrega': False}, status=400)

      audio = Audio(audioBlob=audio_blob, fileHash=file_hash)
      audio.save()

      return JsonResponse({'mensaje': 'Audio subido correctamente.', 'idAudio': audio.idAudio, 'Entrega': True}, status=201)
    except Exception as e:
      return JsonResponse({'error': str(e), 'Entrega': False}, status=500)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)


@csrf_exempt
def actualizar_video(request, idVideo):
  if request.method == 'POST':  # <-- Antes era 'PUT'
    try:
      video = Video.objects.get(idVideo=idVideo)

      video_file = request.FILES.get('video_file')
      if not video_file:
        return JsonResponse({'error': 'No se proporcionó un nuevo archivo de video.', 'Entrega': False}, status=400)

      if video_file.content_type not in ALLOWED_VIDEO_MIME_TYPES:
        return JsonResponse({'error': 'El archivo no es un video válido.', 'Entrega': False}, status=400)

      video_blob = video_file.read()
      file_hash = hashlib.sha256(video_blob).hexdigest()

      if Video.objects.filter(fileHash=file_hash).exclude(idVideo=idVideo).exists():
        return JsonResponse({'error': 'Ya existe otro video con el mismo contenido.', 'Entrega': False}, status=400)

      video.videoBlob = video_blob
      video.fileHash = file_hash
      video.save()

      return JsonResponse({'mensaje': 'Video actualizado correctamente.', 'idVideo': video.idVideo, 'Entrega': True}, status=200)
    except Video.DoesNotExist:
      return JsonResponse({'error': 'No se encontró el video con ese idVideo.', 'Entrega': False}, status=404)
    except Exception as e:
      return JsonResponse({'error': str(e), 'Entrega': False}, status=500)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)


@csrf_exempt
def actualizar_audio(request, idAudio):
  if request.method == 'POST':  # <-- Antes era 'PUT'
    try:
      audio = Audio.objects.get(idAudio=idAudio)

      audio_file = request.FILES.get('audio_file')
      if not audio_file:
        return JsonResponse({'error': 'No se proporcionó un nuevo archivo de audio.', 'Entrega': False}, status=400)

      if audio_file.content_type not in ALLOWED_AUDIO_MIME_TYPES:
        return JsonResponse({'error': 'El archivo no es un audio válido.', 'Entrega': False}, status=400)

      audio_blob = audio_file.read()
      file_hash = hashlib.sha256(audio_blob).hexdigest()

      if Audio.objects.filter(fileHash=file_hash).exclude(idAudio=idAudio).exists():
        return JsonResponse({'error': 'Ya existe otro audio con el mismo contenido.', 'Entrega': False}, status=400)

      audio.audioBlob = audio_blob
      audio.fileHash = file_hash
      audio.save()

      return JsonResponse({'mensaje': 'Audio actualizado correctamente.', 'idAudio': audio.idAudio, 'Entrega': True}, status=200)
    except Audio.DoesNotExist:
      return JsonResponse({'error': 'No se encontró el audio con ese idAudio.', 'Entrega': False}, status=404)
    except Exception as e:
      return JsonResponse({'error': str(e), 'Entrega': False}, status=500)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)