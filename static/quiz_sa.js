let answerChosen;
let results = false;
let currentVidID;
let submitted = false;

$(document).ready(function () {
    display_header()
    display_score()
    display_video()
    display_submit()
    display_next()
    display_correct("#gw-feedback")
    display_incorrect("#ps-feedback")

    // submit answer
    $("#submit-button").click(function (e) {
        console.log($('#user-shortans').val())
        e.preventDefault();
        if (!submitted){
            which_answer();
        } else {
            alert("You've already submitted answer for this question")
            return
        }
    })

    $("#next-button").click(function (e) {
        e.preventDefault();
        if (!submitted) {
            alert("Please submit an answer")
        } else {
            nextquestion()
        }
    })
})

function which_answer() {
    let chosen_answer_html_id = '';
    if ($.trim($('#user-shortans').val()) == ''){
        alert('Please provide input')
        return
    }

    if ($('#user-shortans').val().toLowerCase() == "gut wrench") {
        answerChosen = 1;
        chosen_answer_html_id = '#gw';
    }
    if ($('#user-shortans').val().toLowerCase() == "double leg attack") {
        answerChosen = 2;
        chosen_answer_html_id = '#dl';
    }
    if ($('#user-shortans').val().toLowerCase() == "single leg attack") {
        answerChosen = 3;
        chosen_answer_html_id = '#sl';
    }
    if ($('#user-shortans').val().toLowerCase() == "sprawl") {
        answerChosen = 4;
        chosen_answer_html_id = '#s';
    }
    if ($('#user-shortans').val().toLowerCase() == "penetration step") {
        answerChosen = 5;
        chosen_answer_html_id = '#ps';
    }
    if ($('#user-shortans').val().toLowerCase() == "leg lace" || $('#user-shortans').val().toLowerCase() == "lace") {
        answerChosen = 6;
        chosen_answer_html_id = '#l';
    }
    if ($('#user-shortans').val().toLowerCase() == "snapdown") {
        answerChosen = 7;
        chosen_answer_html_id = '#sn';
    }

    if (!$.isNumeric(answerChosen)){
        answerChosen = -1
    }

    answer_feedback(chosen_answer_html_id, answerChosen, currentVidID);
    answer_info = { "answer_chosen": answerChosen, "correctID": currentVidID }
    check_answer(answer_info)
    submitted = true;
}

function answer_feedback(chosen_answer_html_id, chosen_answer_id, currentID){
    if (chosen_answer_id != currentID){
        $("#symbol").append(" ❌ This is a <b>" + dict["name"] + "</b>")
        display_popup()
    } else {
        $("#symbol").append(" ✅ Correct!")
    }
}

function check_answer(info) {
    $.ajax({
        type: "POST",
        url: "/check_answer",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(info),
        success: function (result) {
            let newscore = result
            score = newscore
        },
        error: function (request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function nextquestion() {
    let currentNumQuestion = parseInt(current_question);
    let nextone = currentNumQuestion + 1;
    window.location.assign("/quiz/" + nextone);
}

function nextquestion() {
    let currentNumQuestion = parseInt(current_question);
    let nextone = currentNumQuestion + 1;
    window.location.assign("/quiz/" + nextone);
}

function display_header() {
    $("#question-header").text("Question " + current_question + "/10")
}

function display_video() {
    //$("#video").html("<img src=/static/" + dict["video"] + ">")
    $("#video").html("<video width='320' height='240' controls=muted autoplay><source src='/static/" + dict["answer"] + "2.MP4.webm' type='video/mp4'>Your browser does not support the video tag</video>")
    currentVidID = dict["id"]
}

function display_score() {
    q_so_far = parseInt(current_question) - 1
    $("#score").text("Score: " + score + "/" + q_so_far)
}

function display_next() {
    $("#next_buttons").html("<button type='button' class='btn btn-primary' id='next-button'>Next</button>")
    if (parseInt(current_question) == 10) {
        $("#buttons").empty();
        $("#next_buttons").html("<a href='/scorePage'><button>See Final Scores</button></a>")
        display_submit();
    }
}

function display_submit() {
    $("#buttons").html("<button type='button' class='btn btn-primary' id='submit-button'>Submit</button>")
}

function display_correct(id) {
    $(id).append(" ✅ ")
}

function display_incorrect(id) {
    $(id).append(" ❌ ")
}

function display_popup() {
    $("#popup").html(dict["review"])
    $("#returntolearn").html("<a href='/learn/"+dict["id_learn"]+"'><button type='button' class='btn btn-primary' id='backtolearn-button'>Review the move: "+dict["name"]+"</button>")
}
