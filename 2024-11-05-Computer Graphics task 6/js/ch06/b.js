"use strict";

const {
    vec3, vec4, mat4
} = glMatrix;

var canvas;
var gl;

var points = [];
var normals = [];
var numOfSubdivides = 3;

var va = vec4.fromValues(0.0, 0.0, -1.0, 1);
var vb = vec4.fromValues(0.0, 0.942809, 0.333333, 1);
var vc = vec4.fromValues(-0.816479, -0.471405, 0.333333, 1);
var vd = vec4.fromValues(0.816479, -0.471405, 0.333333, 1);

var vBuffer = null;
var nBuffer = null;
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

function triangle(a, b, c) {
    points.push(...a, ...b, ...c);

    var t1 = vec3.create();
    vec3.subtract(t1, vec3.fromValues(b[0], b[1], b[2]), vec3.fromValues(a[0], a[1], a[2]));
    var t2 = vec3.create();
    vec3.subtract(t2, vec3.fromValues(c[0], c[1], c[2]), vec3.fromValues(a[0], a[1], a[2]));

    var normal = vec3.create();
    vec3.cross(normal, t1, t2);
    vec3.normalize(normal, normal);

    normals.push(...normal, ...normal, ...normal);
}

function divideTriangle(a, b, c, n) {
    if (n > 0) {
        var ab = vec4.create();
        vec4.lerp(ab, a, b, 0.5);
        vec3.normalize(ab, vec3.fromValues(ab[0], ab[1], ab[2]));
        ab[3] = 1.0;

        var bc = vec4.create();
        vec4.lerp(bc, b, c, 0.5);
        vec3.normalize(bc, vec3.fromValues(bc[0], bc[1], bc[2]));
        bc[3] = 1.0;

        var ac = vec4.create();
        vec4.lerp(ac, a, c, 0.5);
        vec3.normalize(ac, vec3.fromValues(ac[0], ac[1], ac[2]));
        ac[3] = 1.0;

        divideTriangle(a, ab, ac, n - 1);
        divideTriangle(ab, b, bc, n - 1);
        divideTriangle(bc, c, ac, n - 1);
        divideTriangle(ab, bc, ac, n - 1);
    } else {
        triangle(a, b, c);
    }
}

function divideTetra(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}

function initPhongSphere() {
    canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    divideTetra(va, vb, vc, vd, numOfSubdivides);

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

    var lightPosition = gl.getUniformLocation(program, "lightPosition");
    var ambientProduct = gl.getUniformLocation(program, "ambientProduct");
    var diffuseProduct = gl.getUniformLocation(program, "diffuseProduct");
    var specularProduct = gl.getUniformLocation(program, "specularProduct");
    var shininess = gl.getUniformLocation(program, "shininess");

    gl.uniform4fv(lightPosition, [1.0, 1.0, 1.0, 1.0]);
    gl.uniform4fv(ambientProduct, [0.2, 0.2, 0.2, 1.0]);
    gl.uniform4fv(diffuseProduct, [0.8, 0.8, 0.8, 1.0]);
    gl.uniform4fv(specularProduct, [1.0, 1.0, 1.0, 1.0]);
    gl.uniform1f(shininess, 50.0);

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var modelViewMatrix = mat4.create();
    var projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100);
    mat4.lookAt(modelViewMatrix, [0, 0, 5], [0, 0, 0], [0, 1, 0]);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, modelViewMatrix);
    gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix);

    gl.drawArrays(gl.TRIANGLES, 0, points.length / 4);
}
