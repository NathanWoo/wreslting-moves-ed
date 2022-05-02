$(document).ready(function () {
    display_video()

})

function display_video() {
    $("#learn-video").html("<video class='video-fluid' controls autoplay><source src='/static/" + learn_data["abr"] + "_learn.webm' type='video/mp4'>Your browser does not support the video tag</video>")
}