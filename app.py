from flask import Flask, render_template

app = Flask(__name__)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cable-calculate')
def cable_calculate():
    return render_template('cable-calculate.html')

@app.route('/cable-tray')
def cable_tray():
    return render_template('cable-tray-page.html')

if __name__ == '__main__':
    app.run(debug=True)
