$(document).ready(function () {
    console.log("here")
    display_header()
    display_score()
    display_video()
    display_next()
    display_correct("#gw-feedback")
    display_incorrect("#ps-feedback")
    display_popup()
})

function display_header() {
    $("#question-header").text("Question " + current_question + "/10")
}

function display_video() {
    $("#video").html("<img src=/static/" + dict["video"] + ">")
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