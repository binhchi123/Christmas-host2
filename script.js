 document.body.addEventListener("click", function() {
            var audio = document.getElementById("audio");
            audio.play();
        });

const snows_canvas = document.getElementById("SnowsCanvas");
const snows_ctx = snows_canvas.getContext("2d");

function drawStar_2(x, y, radius, spikes, color) {
    snows_ctx.save();
    snows_ctx.beginPath();
    snows_ctx.translate(x, y);
    snows_ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < spikes; i++) {
        snows_ctx.rotate((Math.PI / spikes) * 2);
        snows_ctx.lineTo(0, 0 - radius * 0.5);
        snows_ctx.rotate((Math.PI / spikes) * 2);
        snows_ctx.lineTo(0, 0 - radius);
    }
    snows_ctx.closePath();
    snows_ctx.fillStyle = color;
    snows_ctx.fill();
    snows_ctx.restore();
}

function drawFallingSnow() {
    const snowflakes = [];
    const stars = [];

    function createSnowflake() {
        return {
            x: Math.random() * snows_canvas.width,
            y: Math.random() * snows_canvas.height,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
        };
    }

    function createStar() {
        return {
            x: Math.random() * snows_canvas.width,
            y: Math.random() * snows_canvas.height,
            radius: Math.random() * 5 + 1,
            spikes: 5,
            color: 'white',
            speed: Math.random() * 2 + 1,
        };
    }

    for (let i = 0; i < 200; i++) {
        snowflakes.push(createSnowflake());
    }

    for (let i = 0; i < 100; i++) {
        stars.push(createStar());
    }

    function drawFrame() {
        snows_ctx.clearRect(0, 0, snows_canvas.width, snows_canvas.height);

        for (const snowflake of snowflakes) {
            snows_ctx.fillStyle = "white";
            snows_ctx.beginPath();
            snows_ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, 2 * Math.PI);
            snows_ctx.fill();
            snowflake.y += snowflake.speed;
            if (snowflake.y > snows_canvas.height) {
                snowflake.y = 0;
            }
        }

        for (const star of stars) {
            snows_ctx.fillStyle = "white";
            snows_ctx.beginPath();
            snows_ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            snows_ctx.fill();
            star.y += star.speed;
            if (star.y > snows_canvas.height) {
                star.y = 0;
            }
            drawStar_2(star.x, star.y, star.radius, star.spikes, star.color);
        }
        requestAnimationFrame(drawFrame);
    }
    drawFrame();
}

drawFallingSnow();

let isOpen = false;
function toggleCard() {
    const card = document.getElementById("christmasCard");
    const content = card.querySelector(".card-content");

    if (!isOpen) {
        card.style.display = "block"; // hiện thiệp
        setTimeout(() => {
            content.style.transform = "translateY(0)";
        }, 50);
        isOpen = true;
    } else {
        content.style.transform = "translateY(120%)"; // trượt xuống
        setTimeout(() => {
            card.style.display = "none"; // ẩn thiệp sau khi trượt xong
        }, 1000); // khớp với transition 1s
        isOpen = false;
    }
}