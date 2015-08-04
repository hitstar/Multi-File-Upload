import os
from flask import Flask , request, redirect, url_for, render_template
from werkzeug import secure_filename

UPLOAD_FOLDER = 'static/image'
ALLOWED_EXTENTION = set(['jpg','gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.',1)[1] in ALLOWED_EXTENTION

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/upload', methods = ['POST'])
def upload():	
	form = request.form
	if form:
		print 'ok'

# @app.route('/upload/<filename>')
# def upload_file(fielname):
# 	return send_from_directory(app.config['UPLOAD_FOLDER'],filename)

if __name__ == "__main__":
	app.run();
	debug = True
		

