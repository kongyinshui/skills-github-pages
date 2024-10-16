"use strict";

var canvas = document.getElementById("spaceCanvas");
var ctx = canvas.getContext("2d");
var shipAngle = 0;
var shipSpeed = 0.01;
var shipColor = "white";

var planet = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 100,
            color: "blue"
        };
var ship = {
            radius: 20,
            distanceFromPlanet: 200
        };				



function drawPlanet() {
            ctx.beginPath();
            ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
            ctx.fillStyle = planet.color;
            ctx.fill();
            ctx.closePath();
}

function drawShip() {
            const shipX = planet.x + ship.distanceFromPlanet * Math.cos(shipAngle);
            const shipY = planet.y + ship.distanceFromPlanet * Math.sin(shipAngle);

            ctx.beginPath();
            ctx.arc(shipX, shipY, ship.radius, 0, Math.PI * 2);
            ctx.fillStyle = shipColor;
            ctx.fill();
            ctx.closePath();
}

function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPlanet();
            drawShip();

            // 飞船围绕行星旋转
            shipAngle += shipSpeed;

            requestAnimationFrame(update);
}

        // 鼠标点击事件：改变飞船颜色
        canvas.addEventListener("click", () => {
            shipColor = shipColor === "white" ? "red" : "white"; // 切换飞船颜色
        });

        // 键盘事件：按空格键时加速飞船
        window.addEventListener("keydown", (e) => {
            if (e.which == 107) {
                shipSpeed += 0.01; // 增加飞船速度
            }
			else if(e.which==109){
				shipSpeed -= 0.01;
			}
        });

        update(); // 启动动画循环
