Tener la version 3.12 de python, no la 3.13 que no me sirve el spacy
python -m venv tesis
source tesis/Scripts/activate
cd backend/ && source tesis/Scripts/activate && npm start

pip install django django-cors-headers && pip install spacy && python -m spacy download es_core_news_lg && pip install mysqlclient

sudo apt install python3-venv
python3 -m venv TesisUCundinamarca
source TesisUCundinamarca/bin/activate

migraciones:

cd djangoapi/ && python manage.py makemigrations && python manage.py migrate && cd ../