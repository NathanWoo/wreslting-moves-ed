from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import random
app = Flask(__name__)

data = {
    "gw": {
        "id": 1,
        "id_learn": 5,
        "name": "Gut Wrench",
        "video": "gw",
        "answer": "gw",
        "review": "<div id=review-header>Gut Wrench Review</div><div id=review-content><ul><li>opponent is laying on the ground</li><li>locks hands around ribs</li><li>rotate hips to flip opponent</li></ul>"
    },
    "dl": {
        "id": 2,
        "id_learn": 3,
        "name": "Double Leg Attack",
        "video": "dl",
        "answer": "dl",
        "review": "<div id=review-header>Double Leg Review</div><div id=review-content><ul><li>usually starts from a penetration step</li><li>body level starts low, then raises as opponent is picked up</li><li>both opponents legs picked up</li></ul>"
    },
    "sla": {
        "id": 3,
        "id_learn": 2,
        "name": "Single Leg Attack",
        "video": "sl",
        "answer": "sl",
        "review": "<div id=review-header>Single Leg Review</div><div id=review-content><ul><li>usually starts with a penetration step</li><li>ends with both hands around one leg</li><li>used to destabilize and take down opponent</li></ul>"
    },
    "s": {
        "id": 4,
        "id_learn": 4,
        "name": "Sprawl",
        "video": "s",
        "answer": "s",
        "review": "<div id=review-header>Sprawl Review</div><div id=review-content><ul><li>move legs back to “fall” on opponent</li><li>land with arched back, chest on opponents back</li><li>defense usually in response to single and double leg attacks</li></ul>"
    },
    "ps": {
        "id": 5,
        "id_learn": 1,
        "name": "Penetration Step",
        "video": "ps",
        "answer": "ps",
        "review": "<div id=review-header>Penetration Step Review</div><div id=review-content><ul><li>body level lowers below opponent</li><li>front knee drops to ground</li><li>back leg moves to front</li><li>often used to set up attacks</li></ul>"
    },
    "l": {
        "id": 6,
        "id_learn": 6,
        "name": "Leg Lace",
        "video": "l",
        "answer": "l",
        "review": "<div id=review-header>Leg Lace Review</div><div id=review-content><ul><li>opponent is laying on the ground</li><li>cross opponents legs across each other near ankles</li><li>sit underneath and rotate to roll opponent</li></ul>"
    },
    "sn": {
        "id": 7,
        "id_learn": 7,
        "name": "Snapdown",
        "video": "sn",
        "answer": "sn",
        "review": "<div id=review-header>Snapdown Review</div><div id=review-content><ul><li>starting position with head around back of neck</li><li>pull opponents head and body down to the mat while moving back</li></ul>"
    },
}

data_learn = {
    1: {
        "id": 1,
        "name": "Penetration step",
        "video": "https://www.youtube.com/embed/W4jTOaaBxHQ?autoplay=1&amp;start=17&amp;end=28",
        "review": ["body level lowers below opponent", 
                    "front knee drops to ground",
                    "back leg moves to front",
                    "often used to set up attacks (coming next!)"]
    },
    2: {
        "id": 2,
        "name": "Single leg attack",
        "video": "https://www.youtube.com/embed/WsTqgJLhOaY?autoplay=1&amp;start=34&amp;end=33",
        "review": ["usually starts with a penetration step (as described before)",
                    "ends with both hands around one leg",
                    "used to destabilize and take down opponent"]
    },
    3: {
        "id": 3,
        "name": "Double leg attack",
        "video": "https://www.youtube.com/embed/vRqWENxFFyo?autoplay=1&amp;start=25&amp;end=40",
        "review": ["usually starts from a penetration step",
                    "body level starts low, then raises as opponent is picked up",
                    "both opponents legs picked up"]
    },
    4: {
        "id": 4,
        "name": "Sprawl",
        "video": "https://www.youtube.com/embed/6DYyE4pB7qs?autoplay=1&amp;start=8&amp;end=19",
        "review": ["move legs back to “fall” on opponent",
                    "land with arched back, chest on opponents back",
                    "defense usually in response to single and double leg attacks"]
    },
    5: {
        "id": 5,
        "name": "Gut Wrench",
        "video": "https://www.youtube.com/embed/r5k2tM7jb28?autoplay=1&amp;start=13&amp;end=38",
        "review": ["opponent is laying on the ground",
        "locks hands around ribs",
        "rotate hips to flip opponent"
        ]
    },
    6: {
        "id": 6,
        "name": "Leg Lace",
        "video": "https://www.youtube.com/embed/KNphgR_IOy8?autoplay=1&amp;start=2:25&amp;end=2:44",
        "review": ["opponent is laying on the ground",
        "cross opponents legs across each other near ankles",
        "sit underneath and rotate to roll opponent"
        ]
    },
        7: {
        "id": 7,
        "name": "Snapdown",
        "video": "https://www.youtube.com/embed/XHunumvrlTU?autoplay=1&amp;start=25&amp;end=37",
        "review": ["starting position with head around back of neck",
        "pull opponents head and body down to the mat while moving back"
        ]
    }

}

score = 0
question_num = 0

quiz_data = random.choices(list(data.values()), k=11)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/quiz/<question_num>')
def quiz(question_num=None):
    question_num = int(question_num)
    print("num:", question_num)
    if int(question_num) < 5:
        return render_template('quiz_mc.html', score=score, question_num=question_num, data=quiz_data[question_num])
    else:
        return render_template('quiz_sa.html', score=score, question_num=question_num, data=quiz_data[question_num])
    
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

@app.route('/scorePage')
def getScore():
    return render_template('scorePage.html', score=score)


if __name__ == '__main__':
    app.run(debug=True)
