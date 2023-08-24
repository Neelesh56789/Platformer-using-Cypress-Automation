const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const player = {
            x: 100,
            y: 300,
            width: 30,
            height: 50,
            jumping: false,
            velocityY: 0,
            speed: 3
        };

        const gravity = 1;
        const jumpForce = -10;
        const maxJumpTime = 500;
        

        const platforms = [
            { x: 0, y: 350, width: canvas.width, height: 50 },
            { x: 200, y: 280, width: 100, height: 20 },
            { x: 400, y: 200, width: 100, height: 20 },
            { x: 600, y: 150, width: 100, height: 20 },
            { x: 700, y: 100, width: 100, height: 20 }
        ];

        const spikes = [
            { x: 350, y: 320, width: 50, height: 30 },
            { x: 500, y: 170, width: 50, height: 30 }
        ];

        let gameRunning = false;

        document.getElementById("startButton").addEventListener('click', () => {
            gameRunning = true;
            gameLoop();
        });
        let isJumping = false; // Initialize with false

        // Function to check if the player is jumping
        function isPlayerJumping() {
        return isJumping;
        }


        // Updated keyup event listener
        document.addEventListener("keyup", function(event) {
            if (event.code === 'Space') {
                player.jumping = false;
                player.velocityY = 0;
                isJumping = false; // Set to false when not jumping
              }
        });
        function isColliding(objA, objB) {
            return objA.x < objB.x + objB.width &&
                objA.x + objA.width > objB.x &&
                objA.y < objB.y + objB.height &&
                objA.y + objA.height > objB.y;
        }

        function endGame() {
            gameRunning = false;
            alert("Game Over!");
            location.reload(); // Reload the page for now
        }
        


let hasDoubleJump = false;
let doubleJumpUsed = false;

// Double Jump Power-up
const doubleJumpPowerup = {
    x: 450,
    y: 100,
    width: 30,
    height: 30
};

// Simple patrolling enemy
const enemy = {
    x: 650,
    y: 320,
    width: 30,
    height: 30,
    speed: 2,
    direction: -1
};

const airControlFactor = 0.5;
const maxAirSpeed = 3;

document.addEventListener("keydown", function(event) {
    if (event.code === 'Space') {
        if (player.y >= 2 * player.height) { 
          player.jumping = true;
          player.velocityY = jumpForce;
          isJumping = true; // Set to true when jumping
        }
      }

    if (event.code === 'ArrowRight') {
        let moveSpeed = player.jumping ? maxAirSpeed * airControlFactor : player.speed;
        player.x += moveSpeed;
    }

    if (event.code === 'ArrowLeft') {
        let moveSpeed = player.jumping ? maxAirSpeed * airControlFactor : player.speed;
        player.x -= moveSpeed;
    }

    if (event.code === 'Space' && hasDoubleJump && !doubleJumpUsed && player.jumping) {
        player.velocityY = jumpForce;
        doubleJumpUsed = true;
    }
});
    
let score = 0;

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Increase the score for every frame
score += 0.1;

            // Updated player physics
            if (player.jumping && player.y >= 2 * player.height) { // Ensure player can't go beyond the set height
                player.velocityY = jumpForce; 
            } else {
                player.velocityY += gravity; 
            }
            player.y += player.velocityY;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            player.velocityY += gravity;
            player.y += player.velocityY;

            for (const platform of platforms) {
                if (isColliding(player, platform) && player.velocityY > 0) {
                    player.jumping = false;
                    player.velocityY = 0;
                    player.y = platform.y - player.height;
                }
            }

            for (const spike of spikes) {
            if (isColliding(player, spike)) {
            score -= 50;  // 3. Decrease the score
            endGame();
        }
    }

            if (player.y > canvas.height) {
                endGame();
            }

            ctx.fillStyle = "#8B4513";
            for (const platform of platforms) {
                ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            }

            ctx.fillStyle = "red";
            for (const spike of spikes) {
                ctx.fillRect(spike.x, spike.y, spike.width, spike.height);
            }

            ctx.fillStyle = "#FFD700";
            ctx.fillRect(player.x, player.y, player.width, player.height);

    // Power-up collision detection
    if (isColliding(player, doubleJumpPowerup)) {
        hasDoubleJump = true;
        doubleJumpPowerup.x = -100; // Move out of canvas
    }

    // Enemy movement and collision
    enemy.x += enemy.speed * enemy.direction;
    if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
        enemy.direction *= -1; // Reverse direction at canvas edges
    }

    if (isColliding(player, enemy)) {
        endGame();
    }

    // Drawing logic for platforms, spikes, and player (unchanged)...

    // Draw Double Jump Power-up
    ctx.fillStyle = "#32CD32";
    ctx.fillRect(doubleJumpPowerup.x, doubleJumpPowerup.y, doubleJumpPowerup.width, doubleJumpPowerup.height);

    // Draw enemy
    ctx.fillStyle = "black";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    // Score Display
     // 4. Display the score
     ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + Math.floor(score), 10, 30);

    requestAnimationFrame(gameLoop);
}
window.isPlayerJumping = isPlayerJumping;
