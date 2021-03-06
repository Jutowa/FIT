// global program execution state (todo: gibt es enums wie in c/c++ ?)
// 0 == introduction screen
// 1 == calibration
// 2 == validation
// 3 == experiment
// 4 == show results
var state = 0;

// some global variables (bad coding style is just right  thing for a quick prototype in a strange language)
var dt = 0.1; // delta time for animations
var canvas; // the canvas we can draw to
var cx;     // the canvas context

// settings canvas and flags to toggle
var settings_canvas; // the canvas we can draw to
var s_cx;     // the canvas context
//var apply_kalman_filter=true;
var show_gaze_cursor = false;


// immediate gui events
var e1 =
{
    mouse_down: false, // mousbutton down?
    mouse_klicked: false, // button pressed? (set to false after use)
    mx: 0, // Position des Mauszeigers
    my: 0,
    mx_old: 0,
    my_old: 0 // previous position of the mousepointer
};

var e2 =
{
    mouse_down: false, // mousbutton down?
    mouse_klicked: false, // button pressed? (set to false after use)
    mx: 0, // Position des Mauszeigers
    my: 0,
    mx_old: 0,
    my_old: 0 // previous position of the mousepointer
};


// gazex,y relative to the canvas
var gaze_x = 0;
var gaze_y = 0;



var setup = function () {
    var w = canvas.width;
    var h = canvas.height;
    if (webgazer.eyes_found()) {
        if (button(cx, e1, 0.5 * w - 50, 0.5 * h - 20, 100, 40, "start calibration")) {
            state = 1;
        }
    }
    else {
        cx.fillStyle = "black";
        cx.textAlign = "center";
        cx.fillText("Setup: please wait until the video-preview is ready. Then place your face inside the box.", 0.5 * w, 0.5 * h - 50);
    }
}

var calibration_points = [[0.05, 0.05], [0.95, 0.05], [0.95, 0.95], [0.05, 0.95], [0.5, 0.5]];//,[0.5, 0.05],[0.95, 0.5],[0.5, 0.95],[0.05, 0.5]];
var calibration_step = 0;
var calibration_substep = 0;

var calibration = function () {
    var w = canvas.width;
    var h = canvas.height;

    var radius = 20; // radius of calibration points


    cx.fillStyle = "black";
    cx.textAlign = "center";
    cx.fillText("Calibration: please look exactly into the center of the calibration point and then klick 5x for each point.", 0.5 * w, 0.5 * h - 1.5 * radius - 20);
    cx.fillText("Calibration step " + calibration_step.toString() + "/" + calibration_points.length.toString(), 0.5 * w, 0.5 * h - 1.5 * radius);


    // draw a calibration point and check if the mouse is inside
    pos = calibration_points[calibration_step];
    var inside = false;
    if (Math.abs(e1.mx - w * pos[0]) <= radius && Math.abs(e1.my - h * pos[1]) <= radius) {
        cx.fillStyle = "rgb(200,0,0)";
        inside = true;
    }
    else {
        cx.fillStyle = "rgb(20,200,20)";
    }

    var x = w * pos[0];
    var y = h * pos[1];
    circle(cx, x, y, radius, true, true);
    cx.fillStyle = "rgb(0,0,0)";
    circle(cx, x, y, 3, true, true);
    cx.fillText(calibration_substep.toString() + "/5", x, y + radius + 10);

    if (e1.mouse_klicked) {
        e1.mouse_klicked = false;
        if (inside) {
            webgazer.recordScreenPosition(e1.mx, e1.my, 'click'); // eventType[0] === 'click'
            calibration_substep++;
            if (calibration_substep >= 3) {
                calibration_substep = 0;
                calibration_step++;
                if (calibration_step >= calibration_points.length) {
                    state = 2;
                }
            }
        }
    }
}

var validation_points = [[0.2, 0.2], [0.8, 0.2], [0.8, 0.8], [0.2, 0.8]];
var validation = function () {
    var w = canvas.width;
    var h = canvas.height;
    var r = 20;

    cx.fillStyle = "black";
    cx.textAlign = "center";
    cx.fillText("Validation: look at the provided validation dots but do not klick them. Check, if the gaze cursor is within reasonable proximity.", 0.5 * w, 0.5 * h - 50);

    cx.fillStyle = "rgb(0,200,200)";
    for (var i = 0; i < validation_points.length; i++) {
        var p = validation_points[i];
        circle(cx, w * p[0], h * p[1], r, true, true);
    }


    if (button(cx, e1, 0.5 * w - 150, 0.5 * h + 60, 100, 40, "Start Game")) {
        state = 3;
    }

    if (button(cx, e1, 0.5 * w - 25, 0.5 * h + 60, 100, 40, "recalibrate")) {
        // Restart the calibration process by clearing the local storage and reseting the calibration point
        webgazer.clearData();
        calibration_step = 0;
        calibration_substep = 0;
        state = 1;
    }

}

var game_state = function () {

    var w = canvas.width;
    var h = canvas.height;
    var game = new Game();
    game.update(w, h);
}

var game_over = function () {
    var w = canvas.width;
    var h = canvas.height;

    cx.fillStyle = "black";
    cx.textAlign = "center";
    cx.fillText("Play again", 0.5 * w, 0.5 * h - 10);


    if (button(cx, e1, 0.5 * w - 150, 0.5 * h + 60, 100, 40, "Play Again")) {
        state = 3;
    }
}


var setup_step2_called = false;
var update = function () {


    // continue with  setup - call setup_step2 *once*
    if (!setup_step2_called) {
        setup_step2();
        setup_step2_called = true;
        console.log("Check 1");
    }



    var w = canvas.width;
    var h = canvas.height;

    // reset stroke color.
    cx.strokeStyle = "rgb(0,0,0)";
    // clear the background
    cx.fillStyle = "rgb(240, 240, 255)";
    cx.fillRect(0, 0, w, h);
    cx.strokeRect(0, 0, w, h);


    if (state == 0) { setup(); }
    if (state == 1) { calibration(); }
    if (state == 2) { validation(); }
    if (state == 3) { game_state(); }
    if (state == 4) { game_over(); }
}

// first load images
var setup_step1 = function () {
    setInterval(update, 1000.0 / 60.0);
}

// then init webgazer and the canvas
var setup_step2 = function () {

    canvas = document.getElementById("plotting_canvas");

    var left_border = 322; // make some space for the webgazer preview window

    // set the canvas size based on the browser window size:
    canvas.width = window.innerWidth - left_border;
    canvas.height = window.innerHeight;

    canvas.style.top = "0px";
    canvas.style.left = left_border.toString() + "px";
    canvas.style.position = 'fixed';
    if (!canvas.getContext) { return; }
    cx = canvas.getContext("2d");

    settings_canvas = document.getElementById("settings_canvas");
    settings_canvas.width = 320;
    settings_canvas.height = 400;
    settings_canvas.style.top = "242px";
    settings_canvas.style.left = "0px";
    settings_canvas.style.position = 'fixed';
    if (!settings_canvas.getContext) { return; }
    s_cx = settings_canvas.getContext("2d");


    // setup webgazer

    //webgazer.setRegression('weightedRidge');
    webgazer.setRegression('ridge'). // currently must set regression and tracker
        setTracker('TFFacemesh').
        showPredictionPoints(false). // shows a square every 100 milliseconds where current prediction is 
        begin();

    window.applyKalmanFilter = true;



    webgazer.setGazeListener(function (data, clock) {
        if (data == null) { return; }

        gaze_x = data.x; //these x coordinates are relative to the viewport
        gaze_y = data.y; //these y coordinates are relative to the viewport

    });

    // setup mouse callbacks
    canvas.onmousedown = () => {
        e1.mouse_down = true;
        e1.mouse_klicked = false;
        // for calculating dragging
        e1.mx_old = e1.mx;
        e1.my_old = e1.my;
    }

    canvas.onmouseup = () => {
        e1.mouse_down = false;
        e1.mouse_klicked = true;
    }
    canvas.onmousemove = (e) => {
        //Differenz zwischen Mausposition und Position der Canvas-Fl??che ermitteln
        //damit an der richten Stelle gezeichnet wird
        e1.mx = e.clientX - canvas.offsetLeft;
        e1.my = e.clientY - canvas.offsetTop;
    }

    // setup mouse callbacks
    settings_canvas.onmousedown = () => {
        e2.mouse_down = true;
        e2.mouse_klicked = false;
    }

    settings_canvas.onmouseup = () => {
        e2.mouse_down = false;
        e2.mouse_klicked = true;
    }
    settings_canvas.onmousemove = (e) => {
        //Differenz zwischen Mausposition und Position der Canvas-Fl??che ermitteln
        //damit an der richten Stelle gezeichnet wird
        e2.mx = e.clientX - settings_canvas.offsetLeft;
        e2.my = e.clientY - settings_canvas.offsetTop;
    }
}

// main entry point - on page load the init function is executed
window.onload = () => {
    setup_step1();
};

// exit point
window.onbeforeunload = function () {
    webgazer.end();
}
