"use strict";

        const {
            vec3, vec4
        } = glMatrix;

        var canvas;
        var gl;

        var numOfSubdivides = 5;
        var points = [];

        var va = vec4.fromValues(0.0, 0.0, -1.0, 1);
        var vb = vec4.fromValues(0.0, 0.942809, 0.333333, 1);
        var vc = vec4.fromValues(-0.816479, -0.471405, 0.333333, 1);
        var vd = vec4.fromValues(0.816479, -0.471405, 0.333333, 1);

        var vBuffer = null;
        var vPosition = null;

        function triangle(a, b, c) {
            points.push(a[0], a[1], a[2], a[3]);
            points.push(b[0], b[1], b[2], b[3]);
            points.push(c[0], c[1], c[2], c[3]);
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

        function initSphere() {
            canvas = document.getElementById("gl-canvas");
            gl = canvas.getContext("webgl2");
            if (!gl) {
                alert("WebGL isn't available");
            }

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(1.0, 1.0, 1.0, 1.0);
            gl.enable(gl.DEPTH_TEST);

            var program = initShaders(gl, "vertex-shader", "fragment-shader");
            gl.useProgram(program);

            divideTetra(va, vb, vc, vd, numOfSubdivides);

            vBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

            vPosition = gl.getAttribLocation(program, "vPosition");
            gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vPosition);

            render();
        }

        function render() {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, points.length / 4);
        }