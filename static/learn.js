$(document).ready(function () {
    display_video()

})

function display_video() {
    $("#learn-video").html("<video width='320' height='240' controls autoplay><source src='/static/" + learn_data["abr"] + "_learn.webm' type='video/mp4'>Your browser does not support the video tag</video>")
}