import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/interpreter')
def interpreter():
    return render_template('interpreter.html')

@app.route('/variables')
def variables():
    return render_template('variables.html')

@app.route('/controlflow')
def controlflow():
    return render_template('controlflow.html')

@app.route('/datastructures')
def datastructures():
    return render_template('datastructures.html')

@app.route('/functions')
def functions():
    return render_template('functions.html')

@app.route('/modules')
def modules():
    return render_template('modules.html')

@app.route('/venv')
def venv():
    return render_template('venv.html')

@app.route('/flask')
def flask_page():
    return render_template('flask.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)