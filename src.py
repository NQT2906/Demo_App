from mmdet.apis import inference_detector, init_detector, show_result_pyplot
import base64
import time
import operator
from datetime import datetime

# Choose to use a config and initialize the detector
minh_config = '/home/object_detection/K18_Minh/demo/mmdetection/pth/dh_faster_rcnn_r50_fpn_1x_coco_focal_loss.py'
thuan_config = '/home/object_detection/K18_SongThuan/ThesisDemo/model/cdersnet_ga/cdersnet_ga.py'
# Setup a checkpoint file to load
# checkpoint = '/home/object_detection/K18_Minh/demo/mmdetection/pth/best_bbox_mAP_epoch_12.pth'
thuan_checkpoint = '/home/object_detection/K18_SongThuan/ThesisDemo/model/cdersnet_ga/best_bbox_mAP.pth'
thuan_checkpoint_ocr = '/home/object_detection/K18_SongThuan/ThesisDemo/weights/transformerocr.pth'
minh_checkpoint = '/home/object_detection/K18_Minh/demo/mmdetection/pth/best_bbox_mAP_epoch_12.pth'

import os
from flask import Flask, flash, request, redirect, url_for, render_template, Response, send_file, jsonify
from werkzeug.utils import secure_filename
import warnings
warnings.filterwarnings("ignore")
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg
from PIL import Image, ImageDraw, ImageFont
import cv2
import numpy as np


thuan_input_path = '/home/object_detection/K18_SongThuan/ThesisDemo/demo_input/'
thuan_output_path = '/home/object_detection/K18_SongThuan/ThesisDemo/demo_output/'

minh_input_path = '/home/object_detection/K18_Minh/demo/mmdetection/pth/web/uploads/'
minh_output_path = "/home/object_detection/K18_Minh/demo/mmdetection/pth/web/static/"

def detect_func(model, img):
    dict_detection = {}
    score_thr = 0.5
    result = inference_detector(model, img)
    img = img.split('/')[-1] 
    dict_detection[img] = []
    if isinstance(result, tuple):
        bbox_result, segm_result = result
        if isinstance(segm_result, tuple):
            segm_result = segm_result[0]
    else:
        bbox_result, segm_result = result, None
    
    bboxes = np.vstack(bbox_result)
    labels = [
        np.full(bbox.shape[0], i, dtype=np.int32)
        for i, bbox in enumerate(bbox_result)
    ]
    labels = np.concatenate(labels)
    
    scores = bboxes[:, -1]
    inds = scores > score_thr
    bboxes = bboxes[inds, :]
    labels = labels[inds]
    
    for cls, bbox in zip(labels, bboxes):
        dict_detection[img].append([str(cls), str((bbox[0])), str((bbox[1])), str((bbox[2])), str((bbox[3])), str((bbox[4]))])
        
    return dict_detection

def infer_reg_func(det_results, img, detector):

  font = ImageFont.truetype("DejaVuSans.ttf", 20)
  color = [(0,0,255), (0,128,0), (255,0,0)]
  image = cv2.imread(img)
  curr_img = Image.open(img)
  draw = ImageDraw.Draw(curr_img)
  
  for bbox in det_results[img.split('/')[-1]]:
      cls = int(bbox[0])
      score = float(bbox[-1])
      if score >= 0.5:
          x1,y1,x2,y2 =  int(float(bbox[1])), int(float(bbox[2])), int(float(bbox[3])), int(float(bbox[4]))
          draw.rectangle((x1,y1,x2,y2),outline=color[int(cls)],width = 5)
  
          if cls == 0:
              crop_img = image[y1:y2,x1:x2]
  
              w, h = crop_img.shape[1], crop_img.shape[0]
  
              cv2.imwrite("temp.png", crop_img)
              image_ = Image.open("temp.png")
  
  
              caption = detector.predict(image_)
              # print(caption)
              w, h = draw.textsize(caption, font=font)
              if x2 < h:
                  draw.rectangle(
                      (x1 + x2, y1 - 20, x1 + x2 + w, y1 + h),
                      fill=(64, 64, 64, 255)
                  )
                  draw.text(
                      (x1 + x2, y1 - 20),
                      text=caption,
                      fill=(255, 255, 255, 255),
                      font=font
                  )
              else:
                  draw.rectangle(
                      (x1, y1 - 20, x1 + w, y1 - 20 + h),
                      fill=(64, 64, 64, 255)
                  )
                  draw.text(
                      (x1, y1 - 20),
                      text=caption,
                      fill=(255, 255, 255, 255),
                      font=font
                  )
                  
  idname = time.time()
  out_file = thuan_output_path + str(idname) + "-" + img.split('/')[-1]
  cv2.imwrite(out_file, np.asarray(curr_img))
  return out_file  


#UPLOAD_FOLDER = "/home/object_detection/K18_Minh/demo/mmdetection/pth/web/uploads/"
UPLOAD_FOLDER = thuan_input_path

app = Flask(__name__, template_folder="/home/object_detection/K18_Minh/demo/mmdetection/pth/web/templates/")
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# @app.route('/')
# def upload_form():
#     return render_template('upload.html')

# @app.route('/', methods=['POST'])
# def run_model():
#     if 'file' not in request.files:
#         flash('No file part')
#         return redirect(request.url)
#     file = request.files['file']
#     if file.filename == '':
#         flash('No image selected for uploading')
#         return redirect(request.url)
#     else:
#         filename = secure_filename(file.filename)
#         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
# 		# print(filename)
#         flash('Image successfully uploaded')
#         model = init_detector(config, checkpoint, device='cuda:0')
#         det_results = detect_func(model, thuan_input_path + str(filename))
#         result = inference_detector(model, UPLOAD_FOLDER + str(filename))
#         #show_result_pyplot(model, thuan_input_path + str(filename), result, score_thr=0.5, out_file="/home/object_detection/K18_Minh/demo/mmdetection/pth/web/static/out.jpg")
#         return render_template('upload.html', filename=filename)

@app.route('/thuan/upload', methods=['POST'])
def web_thuan():
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
        file.save(os.path.join(thuan_input_path, filename))
        flash('Image successfully uploaded')
        model = init_detector(thuan_config, thuan_checkpoint, device='cuda:0')
        det_results = detect_func(model, thuan_input_path + str(filename))
        #Caption recognition
        config_ocr = Cfg.load_config_from_name('vgg_transformer')
        config_ocr['weights'] = thuan_checkpoint_ocr
        config_ocr['cnn']['pretrained']=False
        config_ocr['device'] = 'cuda:0'
        config_ocr['predictor']['beamsearch']=False
        detector = Predictor(config_ocr)
        out_file = infer_reg_func(det_results, thuan_input_path + str(filename), detector)
        
        print(filename)
        with open(out_file, "rb") as image_file:
          encoded_string = base64.b64encode(image_file.read())
        test_time = time.time() - start_time

        return jsonify(image=encoded_string.decode("utf-8"), time=test_time, name=out_file.split('/')[-1])

@app.route('/minh/upload', methods=['POST'])
def mobile_minh():
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
        file.save(os.path.join(minh_input_path, filename))
        flash('Image successfully uploaded')
        model = init_detector(minh_config, minh_checkpoint, device='cuda:0')
        result = inference_detector(model, minh_input_path + str(filename))
        print(filename)
        idname = time.time()

        out_file = minh_output_path + str(idname) + "-" + filename
        show_result_pyplot(model, minh_input_path + str(filename), result, score_thr=0.5, out_file=out_file)
        with open(out_file, "rb") as image_file:
          encoded_string = base64.b64encode(image_file.read())
        test_time = time.time() - start_time

        return jsonify(image=encoded_string.decode("utf-8"), time=test_time, name=str(idname) + "-" + filename)


@app.route('/thuan/history', methods=['GET'])
def get_history_thuan():
    start_time = time.time()
    predicted_images = os.listdir(thuan_output_path)
    images = []
    for img in predicted_images:
      with open(thuan_output_path + img, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        img_dict = {"name": img, "created": str(datetime.fromtimestamp(os.path.getctime(thuan_output_path + img))), "image": encoded_string.decode("utf-8")}
        images.append(img_dict)
    test_time = time.time() - start_time
    num_history = 10
    return jsonify(images=sorted(images, key=operator.itemgetter('created'), reverse=True)[0 : num_history], total=num_history, time=test_time)
   
@app.route('/minh/history', methods=['GET'])
def get_history_minh():
    start_time = time.time()
    predicted_images = os.listdir(minh_output_path)
    images = []
    for img in predicted_images:
      with open(minh_output_path + img, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        img_dict = {"name": img, "created": str(datetime.fromtimestamp(os.path.getctime(minh_output_path + img))), "image": encoded_string.decode("utf-8")}
        images.append(img_dict)
    test_time = time.time() - start_time
    num_history = 10
    # return jsonify(images=sorted(images, key=operator.itemgetter('created'), reverse=True), total=len(predicted_images), time=test_time)
    return jsonify(images=sorted(images, key=operator.itemgetter('created'), reverse=True)[0 : num_history], total=num_history, time=test_time)
   

if __name__ == "__main__":
    app.run(host='0.0.0.0')