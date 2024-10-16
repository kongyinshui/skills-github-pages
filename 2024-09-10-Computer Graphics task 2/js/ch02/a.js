"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;
var points = [];
var numTimesToSubdivide = 3;

window.onload = function initTriangles(){
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext("webgl2");
    if( !gl ){
        alert( "WebGL isn't available" );
    }

    // 初始化 WebGL 视口和背景颜色
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // 加载着色器并初始化缓冲区
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // 创建顶点缓冲区
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );

    // 获取并关联着色器的 vPosition 属性
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // 生成初始图形
    updateTriangles();
};

function updateTriangles(){
    // 清空之前的点
    points = [];

    // 初始化 Sierpinski 三角形的顶点
    var vertices = [
        -1, -1,  0,
         0,  1,  0,
         1, -1,  0
    ];

    var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
    var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
    var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

    // 根据当前的递归层数进行三角形划分
    divideTriangle( u, v, w, numTimesToSubdivide );

    // 将新的点数据传入缓冲区
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW );

    // 重新渲染三角形
    renderTriangles();
}

function updateSubdivisionLevel(value){
    numTimesToSubdivide = parseInt(value); // 将滑动条值转换为整数
    document.getElementById("subdivisionValue").innerText = numTimesToSubdivide; // 更新显示的递归层数
    updateTriangles(); // 更新图形
}

function triangle( a, b, c ){
    points.push( a[0], a[1], a[2] );
    points.push( b[0], b[1], b[2] );
    points.push( c[0], c[1], c[2] );
}

function divideTriangle( a, b, c, count ){
    if( count == 0 ){
        triangle( a, b, c );
    }else{
        var ab = vec3.create();
        vec3.lerp( ab, a, b, 0.5 );
        var bc = vec3.create();
        vec3.lerp( bc, b, c, 0.5 );
        var ca = vec3.create();
        vec3.lerp( ca, c, a, 0.5 );

        divideTriangle( a, ab, ca, count-1 );
        divideTriangle( b, bc, ab, count-1 );
        divideTriangle( c, ca, bc, count-1 );
    }
}

function renderTriangles(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length / 3 );
}
