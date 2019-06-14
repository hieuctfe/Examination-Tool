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

window.addEventListener('selectstart', function (e) { e.preventDefault(); });

function getAnw() {
    let listQuest = $('.quest');
    return listQuest.map((idx, el) => {
        let id = $(el).attr("id");
        let anwser = $("#" + id + " input").map((idx, el) => {
            if (el.type == "checkbox" || el.type == "radio") {
                if (el.checked) {
                    return el.value;
                }
            } else {
                return el.value;
            }
        }).get();
        return {
            questionCode: id,
            answers: anwser
        }

    }).get();
}

function reCheckExam(list) {
    list.forEach(function (el) {
        $("#" + el.questionCode + " input").each((idx, elq) => {
            if (elq.type == "checkbox" || elq.type == "radio") {
                if (el.answers.indexOf(elq.value) >= 0) {
                    elq.checked = true;
                    $(elq).trigger('change');
                }
            } else {
                elq.value = el.anwser[idx];
                $(elq).trigger('change');
            }
        })
    })
}

function autoSave() {
    setInterval(function () {
        let studentID = $('#studentCode').text();
        let asw = getAnw();
        let ob = {
            examID: examID,
            ExamAs: asw,
            studentID: studentID
        };
        document.cookie = "sda=" + JSON.stringify(ob);
    }, 15000)
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
    let studentID = $('#studentCode').text();
    var sda = getCookie("sdau");
    if (sda != "") {
        var ob = JSON.parse(sda);
        if (ob.examID == mamon && ob.studentID == studentID) {
            reCheckExam(ob.ExamAs);
        }
    }
    autoSave();
}
////  decode

var keySize = 256;
var ivSize = 128;
var saltSize = 256;
var iterations = 1000;

var message = "Does this work?";
var password = "hieudeptrai";


function encrypt(msg, pass) {
    var salt = CryptoJS.lib.WordArray.random(saltSize / 8);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var iv = CryptoJS.lib.WordArray.random(ivSize / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    });

    var encryptedHex = base64ToHex(encrypted.toString());
    var base64result = hexToBase64(salt + iv + encryptedHex);


    return base64result;
}

function decrypt(transitmessage, pass) {

    var hexResult = base64ToHex(transitmessage)

    var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
    var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
    var encrypted = hexToBase64(hexResult.substring(96));

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    })

    return decrypted.toString(CryptoJS.enc.Utf8);
}

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}

try {
    checkCookie(examID);
} catch (e) {

}
