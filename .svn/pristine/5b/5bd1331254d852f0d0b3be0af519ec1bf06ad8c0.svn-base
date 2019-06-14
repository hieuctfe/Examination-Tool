// Update the count down every 1 second
function timer(minutes2) {
    var countDownDate = new Date();
    countDownDate.setSeconds(countDownDate.getSeconds() + minutes2);
    return new Promise((rs,rj) => {
        var x = setInterval(function() {
            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate.getTime() - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("timer").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";

            if (seconds <= 59 && minutes == 0 && hours == 0 && days == 0) {
                document.getElementById("timer").setAttribute("style", "color:red");
            } 

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                rs();
            }
        }, 1000);
    })
}
