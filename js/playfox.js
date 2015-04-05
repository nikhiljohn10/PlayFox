/* 

Fox Trail

*/



var set, thread, x1,x2,y1,y2,c;
var timeWalk;
var Trail = [];
var trailBox = document.getElementById('fox-trail'); 
var hook = document.getElementById('mouse-hook'); 

var Paw = function (X,Y,angle=0) {
	this.img = document.createElement("img");
	this.img.src = "images/fox-paw.png";
	this.img.style.position = "absolute";
	this.img.style.left = X+"px";
	this.img.style.top = Y+"px";
	this.img.style.display = "none";
	this.img.style.transform = "rotate("+angle+"deg)";
	trailBox.appendChild(this.img);
	$(this.img).fadeIn(500,function () {
		setTimeout(function () {
			var p = Trail.shift();
			$(p.img).fadeOut(1000,function () {
				this.parentNode.removeChild(this);
			});
		},1000);
	});
};

function addPath (e, deg=0) {
	Trail.push(new Paw(e.pageX,e.pageY,deg));
}

document.addEventListener('click',addPath);

$("body").mousemove(function(e) {
    if (!set) {
        x1 = e.pageX, //set starting mouse x
        y1 = e.pageY, //set starting mouse y
        set = true;
        // timeWalk = setInterval(stepNext(e),500);
    } 
    clearTimeout(thread);
    thread = setTimeout(callback.bind(this, e), 100);
});

function stepNext (e) {
	log('Paw @ ('+x1+','+y1+')');
	x2 = e.pageX; //new X
    y2 = e.pageY; //new Y
	addPath(x1,y1,getAngle(x1, y1, x2, y2));
	set = false;
}

function getAngle (x1, y1, x2, y2) {
    var distY = y2-y1; //opposite
    var distX = x2-x1; //adjacent
    var rad = Math.atan2(distY, distX);
    var deg = (rad * (180 / Math.PI))+90;
    return deg; //return angle in degrees
}

function callback(e) {
   	clearInterval(timeWalk);
    set = false;
}

log = function (string) {
	console.log(string);	
}


// enabled = !(window.ontouchstart !== undefined);