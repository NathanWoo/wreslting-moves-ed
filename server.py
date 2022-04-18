from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import random
app = Flask(__name__)

data = {
    "gw": {
        "id": 1,
        "video": "gutwrench.gif",
        "answer": "gw",
        "review": "<div id=review-header>Gut Wrench Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
    },
    "dla": {
        "id": 2,
        "video": "doubleleg.gif",
        "answer": "dla",
        "review": "<div id=review-header>Double Leg Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
    },
    "sla": {
        "id": 3,
        "video": "singleleg.gif",
        "answer": "sl",
        "review": "<div id=review-header>Single Leg Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
    },
    "s": {
        "id": 4,
        "video": "sprawl.gif",
        "answer": "s",
        "review": "<div id=review-header>Sprawl Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
    },
    "ps": {
        "id": 5,
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
    
@app.route('/check_answer', methods=['GET', 'POST'])
def check_answer():
    global score
    global data

    json_data = request.get_json()
    users_answer = json_data["answer_chosen"]
    correct_id = json_data["correctID"]
    resultBool = False

    # search through moves for correct id
    for p_id, p_info in data.items():    
        for key in p_info:
            if(key == "id"):
                if(correct_id == p_info[key]):
                    if(users_answer == p_info[key]):
                        resultBool = True
                        score = score + 1

    return jsonify(score=score)

@app.route('/quiz')
def quiz2():
    return render_template('quiz_welcome.html')

@app.route('/learn/<id>')
def learn(id):
    learn_data = data[id]
    return render_template('learn.html', learn_data=learn_data)


if __name__ == '__main__':
    app.run(debug=True)
