from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = '/workspace/data/about.json'

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return {
        'bio': 'Welcome to my about page.',
        'skills': ['Python', 'JavaScript', 'React'],
        'experience': [],
        'education': []
    }

def save_data(data):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/api/about', methods=['GET'])
def get_about():
    data = load_data()
    return jsonify(data)

@app.route('/api/about', methods=['PUT', 'POST'])
def update_about():
    data = request.get_json()
    current = load_data()
    current.update(data)
    save_data(current)
    return jsonify(current)

@app.route('/api/about/skills', methods=['GET'])
def get_skills():
    data = load_data()
    return jsonify(data.get('skills', []))

@app.route('/api/about/skills', methods=['PUT', 'POST'])
def update_skills():
    skills = request.get_json()
    data = load_data()
    data['skills'] = skills
    save_data(data)
    return jsonify(skills)

@app.route('/api/about/experience', methods=['GET'])
def get_experience():
    data = load_data()
    return jsonify(data.get('experience', []))

@app.route('/api/about/experience', methods=['PUT', 'POST'])
def update_experience():
    experience = request.get_json()
    data = load_data()
    data['experience'] = experience
    save_data(data)
    return jsonify(experience)

@app.route('/api/about/education', methods=['GET'])
def get_education():
    data = load_data()
    return jsonify(data.get('education', []))

@app.route('/api/about/education', methods=['PUT', 'POST'])
def update_education():
    education = request.get_json()
    data = load_data()
    data['education'] = education
    save_data(data)
    return jsonify(education)

@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
