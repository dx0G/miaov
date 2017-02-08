/**
 * Created by guoxu on 2017/2/5.
 */
function startMove(obj, json, fn) {
    clearInterval(obj.iTimer);
    var iCur = 0;
    var iSpeed = 0;

    obj.iTimer = setInterval(function() {

        var iBtn = true;

        for ( var attr in json ) {

            var iTarget;

            if (attr == "opacity") {
                iCur = Math.round(css( obj, "opacity" ) * 100);
                iTarget = json["opacity"] * 100;
            } else {
                iCur = parseInt(css(obj, attr));
                iTarget = json[attr];
            }

            iSpeed = ( iTarget - iCur ) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != iTarget) {
                iBtn = false;
                if (attr == "opacity") {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                    obj.style.filter = "alpha(opacity="+ (iCur + iSpeed) +")";
                } else {
                    obj.style[attr] = iCur + iSpeed + "px";
                }
            }

        }

        if (iBtn) {
            clearInterval(obj.iTimer);
            fn && fn.call(obj);
        }

    }, 30);
}

function css(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

function shake(obj, attr, fn) {
    if (obj.onOff) {
        return;
    }
    obj.onOff = true;

    clearInterval(obj.timer);
    var pos = parseInt(getStyle(obj, attr));
    var arr = [];
    var num = 0;

    for (var i = 20; i > 0; i -= 2) {
        arr.push(i, -i);
    }
    arr.push(0);
    obj.timer = setInterval(function () {

        obj.style.left = pos + arr[num] + "px";
        num++;
        if (num == arr.length) {
            clearInterval(obj.timer);
            fn && fn.call(obj);
            obj.onOff = false;
        }
    }, 50)
}