## Movie Review Website

This is a web application that allows users to browse a list of movies, view details and ratings, and read or submit reviews. The frontend is built using React.js, and the backend is developed using Django.

# Requirements

- Python 3.x
- Node.js
- npm
- pip

# Setting Up the Backend (Django)

Check Python3 version:
```sh
python3 --version
```
Check Pip3 version:
```sh
pip3 --version
```
Create a virtual environment:
```sh
python3 -m venv .venv
```
Activate the virtual environment:
```sh
source .venv/bin/activate
```
Install Django and necessary dependencies:
```sh
python3 -m pip install django
pip3 install django-cors-headers
```
Start the Django development server:
```sh
python3 manage.py runserver
```

# Setting Up the Frontend (React)

Install the required dependencies:
```sh
npm install
```
Start the React development server:
```sh
npm start
```
Running the Website

Make sure both the Django server and React server are running.
Open your web browser and navigate to http://localhost:3000 to view the website.
# Notes
Ensure you have both the backend and frontend servers running concurrently to fully utilize the website's functionalities.

If you encounter any issues, please check the console output for more details and make sure all required dependencies are installed.