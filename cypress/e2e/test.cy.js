describe("Platformer Game", () => {
    beforeEach(() => {
      cy.visit("index.html"); // Replace with your actual game URL
    });
  
    it("should display the game canvas", () => {
      cy.get("#gameCanvas").should("be.visible");
    });
  
    it("should start the game when 'Start Game' button is clicked", () => {
      cy.get("#startButton").click();
      // You can add assertions to check if the game has started
    });
  
    it("should allow player movement using arrow keys", () => {
      cy.get("body").type("{rightarrow}");
      // Add assertions to check if the player moved right
    });
  
    it("should allow player to jump using the space key", () => {
        cy.get("body").trigger("keydown", { code: "Space" }); // Simulate key press
      
        // Wait for a while to allow the player to jump
        cy.wait(2000); // Adjust the duration as needed
      
        // Check if the player is jumping using the exposed function
        cy.window().then((win) => {
          const jumpingStatus = win.isPlayerJumping();
          expect(jumpingStatus).to.be.true;
        });
      
        cy.get("body").trigger("keyup", { code: "Space" }); // Simulate key release
      
        // Wait for a while to ensure the player stops jumping
        cy.wait(2000); // Adjust the duration as needed
      
        // Check if the player has stopped jumping using the exposed function
        cy.window().then((win) => {
          const jumpingStatus = win.isPlayerJumping();
          expect(jumpingStatus).to.be.false;
        });
      });
      
      
      
  
      it("should collide with platforms and stop when jumping", () => {
        cy.get("#startButton").click();
      
        // Trigger space key press event on the canvas
        cy.get("#gameCanvas").trigger("keydown", { code: "Space" });
      
        // Add assertions to check if the player collided with a platform and stopped
        // You can add your assertions here based on your game behavior
      });
      
  
    it("should collide with spikes and end the game", () => {
      cy.get("#startButton").click();
      // Trigger collision with spikes
      // Add assertions to check if the game ended
    });
  
    it("should collide with power-ups and gain extra abilities", () => {
      cy.get("#startButton").click();
      // Trigger collision with power-ups
      // Add assertions to check if the player gained abilities
    });
  
    it("should collide with enemies and end the game", () => {
      cy.get("#startButton").click();
      // Trigger collision with enemies
      // Add assertions to check if the game ended
    });
  
    it("should display the score during gameplay", () => {
      cy.get("#startButton").click();
      // Add assertions to check if the score is displayed
    });
  
    it("should end the game when the player falls off the screen", () => {
      cy.get("#startButton").click();
      // Make the player fall off the screen
      // Add assertions to check if the game ended
    });
  
  });
  