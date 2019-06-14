if (document.layers) {
    //Capture the MouseDown event.
    document.captureEvents(Event.MOUSEDOWN);

    //Disable the OnMouseDown event handler.
    document.onmousedown = function () {
        return false;
    };
}
else {
    //Disable the OnMouseUp event handler.
    document.onmouseup = function (e) {
        if (e != null && e.type == "mouseup") {
            //Check the Mouse Button which is clicked.
            if (e.which == 2 || e.which == 3) {
                //If the Button is middle or right then disable.
                return false;
            }
        }
    };
}

//Disable the Context Menu event.
document.oncontextmenu = function () {
    return false;
};
//// selection detect
function disableSelect(event) {
    event.preventDefault();
}

function startDrag(event) {
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('selectstart', disableSelect);
    // ... my other code
}

function onDragEnd() {
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('selectstart', disableSelect);
    // ... my other code
}

window.addEventListener('selectstart', function(e){ e.preventDefault(); });

// cookie handdle
function getAnw() {
    let listQuest = $('.quest');
    return listQuest.map((idx, el) => {
        let id = $(el).attr("id");
        let anwser = $("#" + id + " input").map((idx, el) => {
            if (el.type == "checkbox") {
                if (el.checked) {
                    return el.value;
                }
            } else {
                return el.value;
            }
        }).get();
        return {
            questionId: id,
            anwser: anwser
        }

    }).get();
}

function reCheckExam(list) {
    list.forEach(function (el) {
        $("#" + el.questionId + " input").each((idx, elq) => {
            if (elq.type == "checkbox") {
                if (el.anwser.indexOf(elq.value) >= 0) {
                    elq.checked = true;
                }
            } else {
                elq.value = el.anwser[idx];
            }
        })
    })
}

function autoSave() {
    setInterval(function () {
        let asw = getAnw();
        let ob = {
            examID: examID,
            ExamAs: asw
        }
        document.cookie = "sda=" + JSON.stringify(ob);
    }, 10000)
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(mamon) {
    var sda = getCookie("sda");
    console.log(sda);
    if (sda != "") {
        var ob = JSON.parse(sda);
        console.log(ob.examID);
        if (ob.examID == mamon) {
            reCheckExam(ob.ExamAs);
        }
    } else {
    }
    autoSave();
}
