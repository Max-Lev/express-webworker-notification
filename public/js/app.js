console.log('client app.js');

var worker = new Worker('js/w-worker.js');

function sendMsgtoWorker() {
    var data = {
        data: {
            msg: "msg data from app.js"
        }
    };
    worker.postMessage([data, 'xxx']);
};

worker.onmessage = function (e) {
    console.log('WebWorker response:', e.data);
    worker.terminate();
};

function showNotification() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification

        var options = {
            body: 'You Got new Msg'
        };

        var notification = new Notification("Hi there!", options);
        console.log(notification);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Hi there!");
            }
        });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}
