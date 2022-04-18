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
    $("#submit-button").click(function(e) {
        e.preventDefault();
        which_answer();
    })
})

function which_answer() {
    if ($('#gw:checked').length > 0) {
        answerChosen = 1;
    }
    if ($('#dla:checked').length > 0) {
        answerChosen = 2;
    }
    if ($('#sla:checked').length > 0) {
        answerChosen = 3;
    }
    if ($('#s:checked').length > 0) {
        answerChosen = 4;
    }
    if ($('#ps:checked').length > 0) {
        answerChosen = 5;
    }
    console.log(answerChosen)
    console.log(currentVidID)

    answer_info = {"answer_chosen": answerChosen, "correctID": currentVidID}
    check_answer(answer_info)
}

function check_answer(info) {
    $.ajax({
        type: "POST",
        url: "/check_answer",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(info),
        success: function(result){
            let newscore = result
            score = newscore
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    }); 
}

function display_header() {
    $("#question-header").text("Question " + current_question + "/10")
}

function display_video() {
    $("#video").html("<img src=/static/" + dict["video"] + ">")
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