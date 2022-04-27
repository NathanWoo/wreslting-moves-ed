let answerChosen;
let results = false;
let currentVidID;

$(document).ready(function () {
    display_header()
    display_score()
    display_video()
    display_submit()
    display_next()

    // submit answer
    $("#submit-button").click(function (e) {
        e.preventDefault();
        which_answer();
    })
    
    $("#next-button").click(function (e) {
        e.preventDefault();
        nextquestion()
    })
})

function which_answer() {
    let chosen_answer_html_id = '';
    if ($('#gw:checked').length > 0) {
        answerChosen = 1;
        chosen_answer_html_id = '#gw';
    }
    if ($('#dla:checked').length > 0) {
        answerChosen = 2;
        chosen_answer_html_id = '#dla';
    }
    if ($('#sla:checked').length > 0) {
        answerChosen = 3;
        chosen_answer_html_id = '#sla';
    }
    if ($('#s:checked').length > 0) {
        answerChosen = 4;
        chosen_answer_html_id = '#s';
    }
    if ($('#ps:checked').length > 0) {
        answerChosen = 5;
        chosen_answer_html_id = '#ps';
    }
    if ($('#l:checked').length > 0) {
        answerChosen = 6;
        chosen_answer_html_id = '#l';
    }
    if ($('#sn:checked').length > 0) {
        answerChosen = 7;
        chosen_answer_html_id = '#sn';
    }

    if (!$.isNumeric(answerChosen)){
        alert('Please select an answer')
        return
    }
    
    answer_feedback(chosen_answer_html_id, answerChosen, currentVidID);
    console.log(answerChosen)
    console.log(currentVidID)

    answer_info = {"answer_chosen": answerChosen, "correctID": currentVidID }
    check_answer(answer_info)
}

function answer_feedback(chosen_answer_html_id, chosen_answer_id, currentID){
    if (chosen_answer_id != currentID){
        $(chosen_answer_html_id + '-feedback').append(" ❌ ")
        $('#' + dict["video"] + '-feedback').append(" ✅ ")
        display_popup()
    } else {
        $(chosen_answer_html_id + '-feedback').append(" ✅ ")
    }
}

function check_answer(info) {
    console.log(info)
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

function display_header() {
    $("#question-header").text("Question " + current_question + "/10")
}

function display_video() {
    //$("#video").html("<img src=/static/" + dict["video"] + ">")
    $("#video").html("<video width='320' height='240' controls='muted autoplay'><source src='/static/" + dict["answer"] + "1.MP4.webm' type='video/mp4'>Your browser does not support the video tag</video>")
    currentVidID = dict["id"]

}

function display_score() {
    q_so_far = parseInt(current_question) - 1
    $("#score").text("Score: " + score + "/" + q_so_far)
}

function display_next() {
    $("#next_buttons").html("<button type='button' id='next-button'>Next</button>")
}

function display_submit() {
    $("#buttons").html("<a href='/check_answer'><button type='button' id='submit-button'>Submit</button>")
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
