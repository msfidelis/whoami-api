# -*- coding: UTF-8 -*-
from flask import Flask, abort, flash, redirect, render_template, request, url_for, jsonify

import requests
import socket

app = Flask(__name__)
app.config.from_object(__name__)

APP_ZONE_ENDPOINT = "http://169.254.169.254/latest/meta-data/placement/availability-zone"
APP_PUBLIC_IP_ENDPOINT = "http://169.254.169.254/latest/meta-data/public-ipv4"
APP_LOCAL_IP_ENDPOINT = "http://169.254.169.254/latest/meta-data/local-ipv4"

zone = requests.get(APP_ZONE_ENDPOINT).text
public_ip = requests.get(APP_PUBLIC_IP_ENDPOINT).text
local_ip = requests.get(APP_LOCAL_IP_ENDPOINT).text
hostname = socket.gethostname()

@app.route('/')
def index_action():
    return render_template('index.html', hostname=hostname, public_ip=public_ip, zone=zone, local_ip=local_ip)

@app.route('/whoami')
def api_action():
    message = {"hostname": hostname, "public_ip": public_ip, "local_ip": local_ip, "zone": zone}
    response = jsonify(message)
    response.status_code = 200
    return response 

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=80)