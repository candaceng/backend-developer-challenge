from flask import Blueprint, render_template, request, flash, jsonify, redirect, url_for, Flask
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from .models import Note
from . import db
import json
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'static'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':

        file = request.files['file']
        print(file)
        if file.filename == '':
            flash('No image selected for uploading', category='error')
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(os.getcwd() + "/website/static", filename))
            flash('Image successfully uploaded!', category='success')
        else:
            flash('Allowed image types are -> png, jpg, jpeg, gif')

    return render_template("home.html", user=current_user)

    


@views.route('/delete-note', methods=['POST'])
def delete_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})

@views.route('/delete-image', methods=['POST'])
def delete_image():
    image = json.loads(request.data)
    ImageId = image['ImageId']
    image = Image.query.get(imageId)
    if image:
        if image.user_id == current_user.id:
            db.session.delete(image)
            db.session.commit()

    return jsonify({})
