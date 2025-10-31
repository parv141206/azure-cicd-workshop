from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Microsoft jindabad!'

if __name__ == '__main__':
    app.run()