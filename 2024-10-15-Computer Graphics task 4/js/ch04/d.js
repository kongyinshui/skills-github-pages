"use strict";

const { vec4 } = glMatrix;

var canvas;
var gl;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;

var scale = [1.0, 1.0]; // 添加缩放因子
var scaleLoc;

/*var rotationSpeed = 0.05; // 旋转速度
var theta = [0, 0]; // 旋转角度
var thetaLoc;*/

window.onload = function initCube() {
    canvas = document.getElementById("rtcb-canvas");

    gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("WebGL isn't available");
    }

    makeCube();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    // load shaders and initialize attribute buffer
    var program = initShaders(gl, "rtvshader", "rtfshader");
    gl.useProgram(program);

/*    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
*/
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    scaleLoc = gl.getUniformLocation(program, "scale"); // 获取缩放的 uniform 位置
    gl.uniform2fv(scaleLoc, scale); // 将初始缩放因子传递给着色器

/*    thetaLoc = gl.getUniformLocation(program, "theta"); // 获取旋转角度的 uniform 位置
    gl.uniform2fv(thetaLoc, theta); // 设置初始旋转角度*/

    document.getElementById("xbutton").onclick = function () {
        scale[0] += -0.2; // 沿 X 轴缩放，增加更大的步长
        gl.uniform2fv(scaleLoc, scale); // 更新缩放因子
    };

    document.getElementById("ybutton").onclick = function () {
        scale[1] += -0.2; // 沿 Y 轴缩放，增加更大的步长
        gl.uniform2fv(scaleLoc, scale); // 更新缩放因子
    };

    document.getElementById("pause").onclick = function () {
        scale = [1.0, 1.0]; // 重新设置缩放因子
        gl.uniform2fv(scaleLoc, scale); // 更新缩放因子
    };

    render();
};

function makeCube() {
    var vertices = [
        vec4.fromValues(-0.5, -0.5, 0.5, 1.0),
        vec4.fromValues(-0.5, 0.5, 0.5, 1.0),
        vec4.fromValues(0.5, 0.5, 0.5, 1.0),
        vec4.fromValues(0.5, -0.5, 0.5, 1.0),
        vec4.fromValues(-0.5, -0.5, -0.5, 1.0),
        vec4.fromValues(-0.5, 0.5, -0.5, 1.0),
        vec4.fromValues(0.5, 0.5, -0.5, 1.0),
        vec4.fromValues(0.5, -0.5, -0.5, 1.0),
    ];

 /*   var vertexColors = [
        vec4.fromValues(0.0, 0.0, 0.0, 1.0),
        vec4.fromValues(1.0, 0.0, 0.0, 1.0),
        vec4.fromValues(1.0, 1.0, 0.0, 1.0),
        vec4.fromValues(0.0, 1.0, 0.0, 1.0),
        vec4.fromValues(0.0, 0.0, 1.0, 1.0),
        vec4.fromValues(1.0, 0.0, 1.0, 1.0),
        vec4.fromValues(0.0, 1.0, 1.0, 1.0),
        vec4.fromValues(1.0, 1.0, 1.0, 1.0)
    ];
*/
    var faces = [
        1, 0, 3, 1, 3, 2, //正
/*        2, 3, 7, 2, 7, 6, //右
        3, 0, 4, 3, 4, 7, //底
        6, 5, 1, 6, 1, 2, //顶
        4, 5, 6, 4, 6, 7, //背
        5, 4, 0, 5, 0, 1  //左*/
    ];

    for (var i = 0; i < faces.length; i++) {
        points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2]);

//        colors.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
    }
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 使立方体持续旋转
/*    theta[0] += rotationSpeed; // 旋转速度
    theta[1] += rotationSpeed;*/
//    gl.uniform2fv(thetaLoc, theta); // 更新旋转角度

    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);

    requestAnimFrame(render);
}
