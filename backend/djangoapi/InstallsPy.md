Tener la version 3.12 de python, no la 3.13 que no me sirve el spacy
python -m venv tesis
source tesis/Scripts/activate

pip install django django-cors-headers 
pip install spacy
python -m spacy download es_core_news_lg

sudo apt install python3-venv
python3 -m venv TesisUCundinamarca
source TesisUCundinamarca/bin/activate

migraciones:

python manage.py makemigrations && python manage.py migrate