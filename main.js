const canvas = document.querySelector('canvas');

const width = 500;
const height = 400;

canvas.width = width;
canvas.height = height;

let p1s = 0, p2s = 0;

const c = canvas.getContext('2d');

const rect = (x = 0, y = 0, w = 10, h = 10, color = 'black') => ({
    x, y, w, h, color,
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
    }
});

const ball = (x = 0, y = 0, w = 10, h = 10, color = 'black', xspeed = 1.2, yspeed = 1.2) => ({
    x, y, w, h, color, xspeed, yspeed,
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
    },
    update() {
        this.x += xspeed;
        this.y += yspeed;
    },
    edges() {
        if (this.y < 0 || this.y > height - 10) yspeed *= -1;
        if (this.x < 0) {
            reset();
            xspeed *= -1;
            p2s++;
        }
        if (this.x > width - 10) {
            reset();
            xspeed *= -1;
            p1s++;
        }
    },
    checkLeft() {
        if (this.x <= 20) {
            if (this.y >= j1.y && this.y <= j1.y + 100) {
                xspeed *= -1;
                if(xspeed > 0) xspeed += 0.2;
                else xspeed -= 0.2;
            }
        }
    },
    checkRight() {
        if (this.x >= width - 30) {
            if (this.y >= j2.y && this.y <= j2.y + 100) {
                xspeed *= -1;
                if(xspeed > 0) xspeed += 0.2;
                else xspeed -= 0.2;
            }
        }
    }
});

//Setup
let background = rect(0, 0, width, height, 'black');

let j1 = rect(10, (height / 2) - 50, 10, 100, 'white');
let j2 = rect(width - 20, (height / 2) - 50, 10, 100, 'white');

let xv = Math.random()*2.5;
let yv = Math.random()*2.5;
let p = ball(width / 2, height / 2, 10, 10, 'white', xv, yv);

let state = 'play';

function reset() {
    p.x = width / 2;
    p.y = height / 2;
    p.xspeed = 1.5;
    p.xspeed = 1.5;
    p.xspeed = Math.random()*2.5;
    p.yspeed = Math.random()*2.5;
    j1.y = height / 2 - 50;
    j2.y = height / 2 - 50;

}

//Update
const update = () => {
    c.clearRect(0, 0, width, height);

    background.draw();
    if (state == 'pause') {
        c.fillStyle = 'white';
        c.font = 'bold 40px Arial';
        c.textAlign = 'center';
        c.fillText("PAUSE", width / 2, height / 2);
    }
    if(state == 'end'){
        c.fillStyle = 'white';
        c.font = 'bold 40px Arial';
        c.textAlign = 'center';
        if(p1s == 5) c.fillText("PLAYER 1 WINS", width / 2, height / 2 - 30);
        else c.fillText("PLAYER 2 WINS", width / 2, height / 2 - 30);
    }

    c.fillStyle = 'white';
    c.font = 'bold 20px Arial';
    c.textAlign = 'center';
    c.fillText(p1s, 30, 40);
    c.fillText(p2s, width - 30, 40);

    j1.draw();
    j2.draw();

    if (state == 'play') {
        p.update();
        p.edges();
        p.checkLeft();
        p.checkRight();
    }
    p.draw();

    if(p1s == 5 || p2s == 5) state = 'end';

    requestAnimationFrame(update);
}; requestAnimationFrame(update);

//Input Managment
const keydown = document.addEventListener("keydown", function (event) {
    if (state == 'play') {
        //Player 1 movement
        if ((event.key == 'w' || event.key == 'W') && j1.y > 0) j1.y -= 20;
        if ((event.key == 's' || event.key == 'S') && j1.y < height - 100) j1.y += 20;

        //Player 2 movement
        if (event.key == 'ArrowUp' && j2.y > 0) j2.y -= 20;
        if (event.key == 'ArrowDown' && j2.y < height - 100) j2.y += 20;
    }

    //Puase
    if (event.key == 'p' || event.key == 'P') {
        if(state == 'pause') state = 'play';
        else state = 'pause';
    }
});