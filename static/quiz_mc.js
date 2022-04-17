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
    $("#question-header").text("Question " + question_num + "/10")
}

function display_video() {
    $("#video").html("<img src=/media/" + video + ">")
}

function display_score() {
    q_so_far = parseInt(question_num) - 1
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
    review = get_review()
    $("#popup").html(review)
}

function get_review() {
    return "<div id=review-header>Gut Wrench Review</div><div id=review-content><ul><li>review element 1</li><li>review element 2</li><li>review element 3</li></ul>"
}