from django.urls import path
from . import views

urlpatterns = [
    path('extraer_palabras/', views.extraer_palabras_importantes, name='extraer_palabras'),
]
