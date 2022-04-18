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

data_learn = {
    1: {
        "id": 1,
        "name": "Penetration step",
        "video": "penstep.gif",
        "review": ["body level lowers below opponent", 
                    "front knee drops to ground",
                    "back leg moves to front",
                    "often used to set up attacks (coming next!)"]
    },
    2: {
        "id": 2,
        "name": "Single leg attack",
        "video": "singleleg.gif",
        "review": ["usually starts with a penetration step (as described before)",
                    "ends with both hands around one leg",
                    "used to destabilize and take down opponent"]
    },
    3: {
        "id": 3,
        "name": "Double leg attack",
        "video": "doubleleg.gif",
        "review": ["usually starts from a penetration step",
                    "body level starts low, then raises as opponent is picked up",
                    "both opponents legs picked up"]
    },
    4: {
        "id": 4,
        "name": "Sprawl",
        "video": "sprawl.gif",
        "review": ["move legs back to “fall” on opponent",
                    "land with arched back, chest on opponents back",
                    "defense usually in response to single and double leg attacks"]
    },
    5: {
        "id": 5,
        "name": "Gut Wrench",
        "video": "gutwrench.gif",
        "review": ["opponent is laying on the ground",
        "locks hands around ribs",
        "rotate hips to flip opponent"
        ]
    }
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
    id = int(id)
    learn_data = data_learn[id]
    return render_template('learn.html', learn_data=learn_data)


if __name__ == '__main__':
    app.run(debug=True)
