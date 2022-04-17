from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import random
app = Flask(__name__)


@app.route('/')
def index():
  return render_template('index.html')

@app.route('/quiz/<question_num>')
def quiz(question_num=None):
  return render_template('quiz_mc.html', score='0', question_num=question_num, video='doubleleg.gif', answer='correct', answer_array=['one', 'two'])


@app.route('/quiz')
def quiz2():
  return render_template('quiz_welcome.html')


if __name__ == '__main__':
  app.run(debug=True)
