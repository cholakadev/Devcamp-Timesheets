# Hackaton-Team-3

Starting the Python backend after cloning the repository:
Change to back-end folder:
**cd back-end**

Check Python version:
**python –V**

Create a Python environment:
**python(3) -m venv env**

Activate the Python environment:
**source env/bin/activate**
*env/Scripts/activate* - for windows

Check Pip version:
**pip –V**

Install requirements:
**pip install -r requirements.txt**

Switch to project folder:
**cd devcamp**

Creates database models' migrations
**python manage.py makemigrations**

Migrates all the migrations
**python manage.py migrate**

Start server:
**python manage.py runserver (port number) - *port 8000 is the default***

Stop Server:
**ctrl + C -- > stops server**

To create super user run and fill-in the fields:
**python manage.py createsuperuser**

**python manage.py runserver (port number)**

------------------------------------------------------------------------------

Starting Angular front-end after cloning the repository:
Change to front-end folder:
**cd front-end**

Change to Angular project:
**cd devcamp-timesheets**

Install modules:
**npm install**

Run server:
**ng serve**

------------------------------------------------------------------------------

If there is a problem with the CORS, just use the work-around method:
**"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp**

------------------------------------------------------------------------------

Enjoy! 


