document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('board'),
          c = canvas.getContext('2d'),
          particles = [],
          MAX_PARTICLES = 1000,
          MAX_RADIUS = 50,
          mouse = {
              x : undefined,
              y : undefined,
          };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function create(options){
        options = options || {
            // random position
            x : Math.random() * window.innerWidth,
            y : Math.random() * window.innerHeight,
        };
        // random color
        var red = Math.floor(Math.random() * 250),
              green = Math.floor(Math.random() * 250),
              blue = Math.floor(Math.random() * 250),
              // max 1
              alpha = Math.random();
        // max number
        if(particles.length > MAX_PARTICLES){
            particles.shift();
        }
        // particle
        var p = {
            x : options.x,
            y : options.y,
            // random direction negative or positive value
            xVelocity : (Math.random() - 0.5),
            yVelocity : (Math.random() - 0.5),
            radius : Math.random() * 20 + 10,
            color : "rgba(" + red + "," + green + "," + blue + "," + alpha +")",
        };
        p.minRadius = p.radius;
        particles.push(p);
    }

    function draw(p){
            //start draw
            c.beginPath();
            c.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false); //circle
            // c.fillStyle = p.color;
            // c.fill();
            c.stroke();
            c.strokeStyle = p.color;
    }

    function fade(p){
            p.radius *= 0.99;
    }

    function move(p){
        if (p.x + p.radius > canvas.width || p.x - p.radius < 0) {
            p.xVelocity = -p.xVelocity;
        }
        if (p.y + p.radius > canvas.height || p.y - p.radius < 0){
            p.yVelocity = -p.yVelocity;
        }
        p.x += p.xVelocity;
        p.y += p.yVelocity;
        //interactivity
        if (mouse.x - p.x < 50 && mouse.x - p.x > -50 && mouse.y - p.y < 50 && mouse.y - p.y > -50) {
            if (p.radius < MAX_RADIUS) {
                    p.radius += 1;
            }
        } else if (p.radius > p.minRadius){
            p.radius -= 1;
        }
    }

    function loop(){
        //to clear canvas
        c.clearRect(0, 0, canvas.width, canvas.height);
        create();
        particles.forEach(function(p){
            draw(p);
            fade(p);
            move(p);
        });
        window.requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', function(e){
        mouse.x = e.x;
        mouse.y = e.y;
    });
    loop();
});
