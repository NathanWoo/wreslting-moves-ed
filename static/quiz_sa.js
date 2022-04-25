let answerChosen;
let results = false;
let currentVidID;

$(document).ready(function () {
    display_header()
    display_score()
    display_video()
    display_submit()
    //display_next()
    display_correct("#gw-feedback")
    display_incorrect("#ps-feedback")
    display_popup()

    // submit answer
    $("#submit-button").click(function (e) {
        console.log($('#user-shortans').val())
        e.preventDefault();
        which_answer();
        nextquestion();
    })
})

function which_answer() {
    if ($('#user-shortans').val().toLowerCase() == "gut wrench") {
        answerChosen = 1;
    }
    if ($('#user-shortans').val().toLowerCase() == "double leg attack") {
        answerChosen = 2;
    }
    if ($('#user-shortans').val().toLowerCase() == "single leg attack") {
        answerChosen = 3;
    }
    if ($('#user-shortans').val().toLowerCase() == "sprawl") {
        answerChosen = 4;
    }
    if ($('#user-shortans').val().toLowerCase() == "penetration step") {
        answerChosen = 5;
    }
    if ($('#user-shortans').val().toLowerCase() == "leg lace" || $('#user-shortans').val().toLowerCase() == "lace") {
        answerChosen = 6;
    }
    if ($('#user-shortans').val().toLowerCase() == "snapdown") {
        answerChosen = 7;
    }
    console.log(answerChosen)
    console.log(currentVidID)

    answer_info = { "answer_chosen": answerChosen, "correctID": currentVidID }
    check_answer(answer_info)
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
    $("#buttons").html("<button type='button' id='next-button'>Continue</button>")
}

function display_submit() {
    $("#buttons").html("<button type='button' id='submit-button'>Submit</button>")
    if (parseInt(current_question) == 10) {
        $("#buttons").empty();
        $("#buttons").html("<a href='/scorePage'><button>See Final Scores</button></a>")
    }
}

function display_correct(id) {
    $(id).append(" ✅ ")
}

function display_incorrect(id) {
    $(id).append(" ❌ ")
}

function display_popup() {
    $("#popup").html(dict["review"])
}
