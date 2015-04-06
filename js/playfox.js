
/*
    Fox Trail
*/

$(document).ready(function() {
    var pawId = 0,
        lastLeft = 0,
        lastTop = 0;

    function checkSpeed(interval, callback) {
        var t1 = (new Date).getTime();
        return function() {
            var t2 = (new Date).getTime();
            t2 - t1 >= interval && (t1 = t2, callback.apply(null, arguments))
        }
    }

    function findAngle(x1, y1, x2, y2) {
        lastTop = y2;
        lastLeft = x2;
        var distX = x2 - x1;
        var distY = y2 - y1;
        var rad = Math.atan2(distY, distX);
        var deg = (rad * (180 / Math.PI)) + 90;
        return deg;
    }

    $(document).mousemove(checkSpeed(150, function(event) {
        if ($(window).width() >= 768) {
            var left = event.pageX;
            var top = event.pageY;
            var angle = findAngle(lastLeft, lastTop, left, top);
            if ((angle < 0 && angle > -90) || (angle > 90 && angle < 180)) {
                if (pawId % 2 == 0) {
                    top += 20;
                    left -= 20;
                } else {
                };
            } else {
                if (pawId % 2 == 0) {
                    top += 20;
                    left += 20;
                }
            }
            $('body').append('<img src="images/fox-paw20.png" class="paw" id="paw' + pawId + '" style="top: ' + top + 'px; left: ' + left + 'px; transform: rotate(' + angle + 'deg);" />');
            setTimeout(function() {
                $('.paw').each(function() {
                    $(this).css('opacity') < '0.1' && $(this).remove()
                })
            }, 1000);
            pawId++;
        }
    }));
});
