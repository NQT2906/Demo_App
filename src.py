from mmdet.apis import inference_detector, init_detector, show_result_pyplot
import base64
import time
import operator
from datetime import datetime

# Choose to use a config and initialize the detector
config = '/home/object_detection/K18_Minh/demo/mmdetection/pth/dh_faster_rcnn_r50_fpn_1x_coco_focal_loss.py'
# Setup a checkpoint file to load
checkpoint = '/home/object_detection/K18_Minh/demo/mmdetection/pth/best_bbox_mAP_epoch_12.pth'

import os
from flask import Flask, flash, request, redirect, url_for, render_template, Response, send_file, jsonify
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "/home/object_detection/K18_Minh/demo/mmdetection/pth/web/uploads/"

app = Flask(__name__, template_folder="/home/object_detection/K18_Minh/demo/mmdetection/pth/web/templates/")
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def upload_form():
    return render_template('upload.html')
 
@app.route('/', methods=['POST'])
def run_model():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No image selected for uploading')
        return redirect(request.url)
    else:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
		# print(filename)
        flash('Image successfully uploaded')
        model = init_detector(config, checkpoint, device='cuda:0')
        result = inference_detector(model, UPLOAD_FOLDER + str(filename))
        show_result_pyplot(model, UPLOAD_FOLDER + str(filename), result, score_thr=0.5, out_file="/home/object_detection/K18_Minh/demo/mmdetection/pth/web/static/out.jpg")
        return render_template('upload.html', filename=filename)
        
@app.route('/upload', methods=['POST'])
def mobile():
    start_time = time.time()
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No image selected for uploading')
        return redirect(request.url)
    else:
        filename = secure_filename(file.filename)
        file.save(os.path.join("/home/object_detection/K18_Minh/demo/mmdetection/pth/web/uploads/", filename))
        flash('Image successfully uploaded')
        model = init_detector(config, checkpoint, device='cuda:0')
        result = inference_detector(model, UPLOAD_FOLDER + str(filename))
        print(filename)
        idname = time.time()
        out_file="/home/object_detection/K18_Minh/demo/mmdetection/pth/web/static/" + str(idname) +"-"+filename
        show_result_pyplot(model, UPLOAD_FOLDER + str(filename), result, score_thr=0.5, out_file=out_file)
        with open(out_file, "rb") as image_file:
          encoded_string = base64.b64encode(image_file.read())
        test_time = time.time() - start_time

        return jsonify(image=encoded_string.decode("utf-8"), time=test_time, name=str(idname) +"-"+filename)

@app.route('/history', methods=['GET'])
def get_history():
    saved_folder = "/home/object_detection/K18_Minh/demo/mmdetection/pth/web/static/"
    start_time = time.time()
    predicted_images = os.listdir(saved_folder)
    images = []
    for img in predicted_images:
      with open(saved_folder + img, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        img_dict = {"name": img, "created": str(datetime.fromtimestamp(os.path.getctime(saved_folder + img))), "image": encoded_string.decode("utf-8")}
        images.append(img_dict)
    test_time = time.time() - start_time
    return jsonify(images=sorted(images, key=operator.itemgetter('created'), reverse=True), total=len(predicted_images), time=test_time)
   
if __name__ == "__main__":
    app.run(host='0.0.0.0')