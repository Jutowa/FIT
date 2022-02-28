class PlayerController {
    constructor() {
        this.posX = 200;
        this.posY = 200;
        this.vel = new Vector2(0,0);
        this.maxSpeed = 5;
        this.maxForce = 0.01;
        this.maxVel = 0.1;
        this.createPlayer();
    }

    createPlayer(){
        this.$playerElement = $('<div class="player"></div>');
        this.$playerElement.css({top: this.posY, left: this.posX});
        $("#field").append(this.$playerElement);
    }

    update(){
        this.vel = seekingBehaviour(mousePos, new Vector2(this.posX, this.posY), this.vel, this.maxSpeed, this.maxForce, this.maxVel);
        this.posX = this.posX + this.vel.getX();
        this.posY = this.posY + this.vel.getY();
        this.$playerElement.css({top: this.posY, left: this.posX});
    }
}