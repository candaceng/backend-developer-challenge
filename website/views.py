from flask import Blueprint, render_template, request, flash, jsonify, redirect, url_for, Flask
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from .models import Note
from . import db
import json
import os
from PIL import Image
from glob import glob


app = Flask(__name__)

UPLOAD_FOLDER = 'static'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    files = []
    for ext in ('*.gif', '*.png', '*.jpg', '*.jpeg'):
        files.extend(glob(os.path.join(os.getcwd() + "/website/static/img", ext)))
    for i, file in enumerate(files):
        files[i] = file.split("/website")[1]
    if request.method == 'POST':
        if request.form.get("delete") == "" or not request.form.get("delete"):
            file = request.files['file']
            if file.filename == '':
                flash('No image selected for uploading', category='error')
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(os.getcwd() + "/website/static/img/", filename))
                flash('Image successfully uploaded! Please refresh the page to view your new image.', category='success')
            else:
                flash('Allowed image types are -> png, jpg, jpeg, gif', category="error")
        else:
            filename = request.form['delete']
            if os.path.exists(os.getcwd() + "/website" + filename):
                os.remove(os.getcwd() + "/website" + filename)
    return render_template("home.html", user=current_user, files=files)
