var color, stroke, strokeWeight, path, ellipse, rect, line, triangle, cPath, img, vertex, beginPath, endPath, cBezierVertex, qBezierVertex, bezier, scBezierVertex, sqBezierVertex, animate, text, ROTATE = 0, TRANSLATEX = 0, TRANSLATEY = 0, SCALEX = 1, SCALEY = 1, rotate, scale, translate, resetMatrix, rotPosX = 0, rotPosY = 0, draw, drawSpeed = 50, frameRate, ID;

var COUNTER = 0;

var xlmns = "http://www.w3.org/2000/svg";

var intervals = [];

var Canvas = (function() {
    //// Canvas Constructor ////
    var Canvas = function(id, width, height, parent) {
        ///// Create SVG canvas element /////
        var svg = document.createElementNS(xlmns, "svg");
        svg.setAttribute("id", id);
        svg.setAttribute('viewBox', "0 0 " + width + " " + height);
        document.querySelector(parent).appendChild(svg);
        
        //// current color ////
        this.cc = "rgb(255, 255, 255)";

        //// current stroke ////
        this.cs = "rgb(255, 255, 255)";

        //// current stroke-width ////
        this.csw = 1;
        
        this.id = id;
    };

    //// Canvas methods: essentially our library ////
    Canvas.prototype = {
         color: function(r, g, b, a) {
            a = a || 255;
            this.cc = "rgb(" + r + "," + g + "," + b + "," + a + ")";
        },
        stroke: function(r, g, b, a) {
            a = a || 255;
            this.cs = "rgb(" + r + "," + g + "," + b + "," + a + ")";
        },
        strokeWeight: function(w) {
            this.csw = w;
        },
        text: function(message, x, y, size) {
            var newText = document.createElementNS(xlmns, "text");
            newText.setAttribute("x", x);
            newText.setAttribute("y", y);
            newText.textContent = message;
            newText.setAttribute("font-size", size);
            newText.setAttribute("fill", this.cc);
            newText.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
            newText.setAttribute("transform-origin", rotPosX + " " + rotPosY);
            newText.classList.add(String(COUNTER));

            document.getElementById(ID).appendChild(newText);
        },
        rect: function(x, y, width, height) {
            var newRect = document.createElementNS(xlmns, "rect");
            newRect.setAttribute("x", x);
            newRect.setAttribute("y", y);
            newRect.setAttribute("width", width);
            newRect.setAttribute("height", height);
            newRect.setAttribute("fill", this.cc);
            newRect.setAttribute("stroke", this.cs);
            newRect.setAttribute("stroke-width", this.csw);
            newRect.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
            newRect.setAttribute("transform-origin", rotPosX + " " + rotPosY);
            newRect.classList.add(String(COUNTER));

            document.getElementById(ID).appendChild(newRect);
        },
        img: function(src, x, y, width, height) {
            var newImg = document.createElementNS(xlmns, "image");
            newImg.setAttribute("x", x);
            newImg.setAttribute("y", y);
            newImg.setAttribute("width", width);
            newImg.setAttribute("height", height);
            newImg.setAttribute("href", src);
            newImg.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
            newImg.setAttribute("transform-origin", rotPosX + " " + rotPosY);
            newImg.classList.add(String(COUNTER));
            
            document.getElementById(ID).appendChild(newImg);
        },
        ellipse: function(x, y, width, height) {
            var newEllipse = document.createElementNS(xlmns, "ellipse");
            newEllipse.setAttribute("cx", x);
            newEllipse.setAttribute("cy", y);
            newEllipse.setAttribute("rx", width);
            newEllipse.setAttribute("ry", height);
            newEllipse.setAttribute("fill", this.cc);
            newEllipse.setAttribute("stroke", this.cs);
            newEllipse.setAttribute("stroke-width", this.csw);
            newEllipse.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
            newEllipse.setAttribute("transform-origin", rotPosX + " " + rotPosY);
            newEllipse.classList.add(String(COUNTER));

            document.getElementById(ID).appendChild(newEllipse);
        },
        line: function(x1, y1, x2, y2) {
            var newLine = document.createElementNS(xlmns, "line");
            newLine.setAttribute("x1", x1);
            newLine.setAttribute("y1", y1);
            newLine.setAttribute("x2", x2);
            newLine.setAttribute("y2", y2);
            newLine.setAttribute("stroke", this.cs);
            newLine.setAttribute("stroke-width", this.csw);
            newLine.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
            newLine.setAttribute("transform-origin", rotPosX + " " + rotPosY);
            newLine.classList.add(String(COUNTER));
            document.getElementById(ID).appendChild(newLine);
        },
        // Cubic Bézier (single shape)
        bezier: function(x1, y1, x2, y2, x, y) {
            var newPath = document.createElementNS(xlmns, "path");
            newPath.setAttribute('stroke', this.cs);
            newPath.setAttribute('stroke-width', this.csw);
            newPath.setAttribute('fill', this.cc);
            newPath.setAttribute('d', "C" + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x + " " + y);
            newPath.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
            newPath.classList.add(String(COUNTER));
            newPath.setAttribute("transform-origin", rotPosX + " " + rotPosY);

            document.getElementById(ID).appendChild(cPath);
        },
        triangle: function(x1, y1, x2, y2, x3, y3) {
            var newPath = document.createElementNS(xlmns, "path");
            newPath.setAttribute('stroke', this.cs);
            newPath.setAttribute('stroke-width', this.csw);
            newPath.setAttribute('fill', this.cc);
            newPath.setAttribute('d', "M" + x1 + " " + y1 + "L" + x2 + " " + y2 + "L" + x3 + " " + y3);
            newPath.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
            newPath.setAttribute("transform-origin", rotPosX + " " + rotPosY);
            newPath.classList.add(String(COUNTER));

            document.getElementById(ID).appendChild(newPath);
        },
        beginPath: function() {
            var newPath = document.createElementNS(xlmns, "path");
            newPath.setAttribute('stroke', this.cs);
            newPath.setAttribute('stroke-width', this.csw);
            newPath.setAttribute('fill', this.cc);
            newPath.setAttribute('d', "");
            newPath.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
            newPath.setAttribute("transform-origin", rotPosX + " " + rotPosY);
            newPath.classList.add(String(COUNTER));
            cPath = newPath;
        },
        // Move / Line to
        vertex: function(x, y) {
            var currentPathway = cPath.getAttribute("d");
            if (currentPathway === "") {
                cPath.setAttribute('d', currentPathway + "M" + x + " " + y);
            } else {
                cPath.setAttribute('d', currentPathway + "L" + x + " " + y);
            }
        },
        // Cubic Bézier (multi-shape)
        cBezierVertex: function(x1, y1, x2, y2, x, y) {
            var currentPathway = cPath.getAttribute("d");
            cPath.setAttribute('d', currentPathway + "C" + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x + " " + y);
        },
        // Several Béziers (cubic)
        scBezierVertex: function(x2, y2, x, y) {
            var currentPathway = cPath.getAttribute("d");
            cPath.setAttribute('d', currentPathway + "S" + x2 + " " + y2 + " " + x + " " + y);
        },
        // Quadratic Bézier
        qBezierVertex: function(x1, y1, x, y) {
            var currentPathway = cPath.getAttribute("d");
            cPath.setAttribute('d', currentPathway + "Q" + x1 + " " + y1 + " " + x + " " + y);
        },
        // Several Béziers (quadratic)
        sqBezierVertex: function(x, y) {
            var currentPathway = cPath.getAttribute("d");
            cPath.setAttribute('d', currentPathway + "T" + x + " " + y);
        },
        endPath: function(end) {
            if (end === "END") {
                cPath.setAttribute('d', cPath.getAttribute('d') + "Z");
            }
            document.getElementById(ID).appendChild(cPath);
            cPath = "";
        },
        resetMatrix: function() {
            ROTATE = 0;
            SCALEX = 1;
            SCALEY = 1;
            TRANSLATEX = 0;
            TRANSLATEY = 0;
        },
        translate: function(x, y) {
            TRANSLATEX = x;
            TRANSLATEY = y;
        },
        scale: function(x, y) {
            y = y || x;
            SCALEX = x;
            SCALEY = y;
        },
        rotate: function(theta, x, y) {
            ROTATE = theta;
            rotPosX = x;
            rotPosY = y;
        },
        // animate: takes a single shape (not multi-shapes) and animates it
        animate: function(shape, args, anims) {
            var newShape;

            switch (shape) {
                case 'ellipse':
                    newShape = document.createElementNS(xlmns, "ellipse");
                    newShape.setAttribute("cx", args[0]);
                    newShape.setAttribute("cy", args[1]);
                    newShape.setAttribute("rx", args[2]);
                    newShape.setAttribute("ry", args[3]);
                    newShape.setAttribute("fill", this.cc);
                    newShape.setAttribute("stroke", this.cs);
                    newShape.setAttribute("stroke-width", this.csw);
                    newShape.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
                    newShape.setAttribute("transform-origin", rotPosX + " " + rotPosY);
                    newShape.classList.add(String(COUNTER));
                break;
                case 'rect':
                    newShape = document.createElementNS(xlmns, "rect");
                    newShape.setAttribute("x", args[0]);
                    newShape.setAttribute("y", args[1]);
                    newShape.setAttribute("width", args[2]);
                    newShape.setAttribute("height", args[3]);
                    newShape.setAttribute("fill", this.cc);
                    newShape.setAttribute("stroke", this.cs);
                    newShape.setAttribute("stroke-width", this.csw);
                    newShape.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
                    newShape.setAttribute("transform-origin", rotPosX + " " + rotPosY);
                    newShape.classList.add(String(COUNTER));
                break;
                case 'line':
                    newShape = document.createElementNS(xlmns, "line");
                    newShape.setAttribute("x1", args[0]);
                    newShape.setAttribute("y1", args[1]);
                    newShape.setAttribute("x2", args[2]);
                    newShape.setAttribute("y2", args[3]);
                    newShape.setAttribute("stroke", this.cs);
                    newShape.setAttribute("stroke-width", this.csw);
                    newShape.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
                    newShape.setAttribute("transform-origin", rotPosX + " " + rotPosY);
                    newShape.classList.add(String(COUNTER));
                break;
                case 'bezier':
                    newShape = document.createElementNS(xlmns, "path");
                    newShape.setAttribute('stroke', this.cs);
                    newShape.setAttribute('stroke-width', this.csw);
                    newShape.setAttribute('fill', this.cc);
                    newShape.setAttribute('d', "C" + args[0] + " " + args[1] + " " + args[2] + " " + args[3] + " " + args[4] + " " + args[5]);
                    newShape.setAttribute("transform", "rotate(" + ROTATE + ") translate(" + TRANSLATEX + " " + TRANSLATEY + ") scale(" + SCALEX + " " + SCALEY + ")");
                    newShape.setAttribute("transform-origin", rotPosX + " " + rotPosY);
                    newShape.classList.add(String(COUNTER));
            }

            for (var i = 0; i < anims.length; i++) {
                var newAnimation = document.createElementNS(xlmns, "animate");
                newAnimation.setAttribute("attributeName", anims[i][0]);
                newAnimation.setAttribute("dur", anims[i][2]);
                newAnimation.setAttribute("values", anims[i][1]);
                newAnimation.setAttribute("repeatCount", anims[i][3]);

                newShape.appendChild(newAnimation);
            }

            document.getElementById(ID).appendChild(newShape);
        },
        frameRate: function(spd) {
            drawSpeed = spd;
        }
    };
    
    Canvas.prototype.draw = function(func) {
        intervals.push({run: func, time: frameRate, id: ID});
    };
    
    Canvas.prototype.updateVariables = function() {
        color = this.color, stroke = this.stroke, strokeWeight = this.strokeWeight, path = this.path, ellipse = this.ellipse, img = this.img, rect = this.rect, triangle = this.triangle, line = this.line, vertex = this.vertex, endPath = this.endPath, beginPath = this.beginPath, bezier = this.bezier, cBezierVertex = this.cBezierVertex, qBezierVertex = this.qBezierVertex, scBezierVertex = this.scBezierVertex, sqBezierVertex = this.sqBezierVertex, animate = this.animate, text = this.text, rotate = this.rotate, translate = this.translate, scale = this.scale, resetMatrix = this.resetMatrix, draw = this.draw, frameRate = this.frameRate, ID = this.id;
        resetMatrix();
    };

    //// Holds our operations on the canvas ////
    Canvas.prototype.drawOn = function(func) {
        this.updateVariables();
        color(255, 255, 255);
        stroke(255, 255, 255);
        strokeWeight(1);
        func();
    };

    //// Controls our viewpoint of the canvas ////
    Canvas.prototype.view = function(x, y, w, h) {
        document.getElementById(ID).setAttribute("viewBox", x + " " + y + " " + w + " " + h);
    };

    //// Return our canvas class ////
    return Canvas;
})();

// EXPORTED FROM JQUERY LIBRARY
function isVisible(elem) {
    return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
}

var INTERVALTIME = 0;
window.setInterval(function() {
    INTERVALTIME++;
    
    var elements = document.getElementsByClassName(COUNTER);
    for (var i = elements.length - 1; i >= 0; i--) {
        elements[i].remove();
    }
    
    for (var i = 0; i < intervals.length; i++) {
        if (isVisible(document.getElementById(intervals[i].id))) {
            intervals[i].run();
        }
    }
    
    resetMatrix();
}, 1);
