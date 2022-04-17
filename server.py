from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import random
app = Flask(__name__)

data = {
    "gw": {
        "video": "gutwrench.gif",
        "answer": "gw",
        "review": "<div id=review-header>Gut Wrench Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
    },
    "dla": {
        "video": "doubleleg.gif",
        "answer": "dla",
        "review": "<div id=review-header>Double Leg Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
    },
    "sla": {
        "video": "singleleg.gif",
        "answer": "sl",
        "review": "<div id=review-header>Single Leg Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
    },
    "s": {
        "video": "sprawl.gif",
        "answer": "s",
        "review": "<div id=review-header>Sprawl Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
    },
    "ps": {
        "video": "penstep.gif",
        "answer": "ps",
        "review": "<div id=review-header>Penetration Step Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
    },

}

score = 0
question_num = 0


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/quiz/<question_num>')
def quiz(question_num=None):
    if int(question_num) < 5:
        return render_template('quiz_mc.html', score=score, question_num=question_num, data=data["gw"])
    else:
        return render_template('quiz_sa.html', score=score, question_num=question_num, data=data["gw"])


@app.route('/quiz')
def quiz2():
    return render_template('quiz_welcome.html')


if __name__ == '__main__':
    app.run(debug=True)
