class PlayerController {
    constructor() {
        this.posX = 200;
        this.posY = 200;
        this.heigth = 20;
        this.width = 20;
        this.currentRotation = 0;

        this.vel = new Vector2(0,0);
        this.maxSpeed = 5;
        this.maxForce = 0.01;
        this.maxVel = 0.1;
        this.createPlayer();
    }

    createPlayer(){
        this.$playerElement = $('<div class="player"></div>');
        this.$playerElement.css({top: this.posY, left: this.posX, heigth: this.heigth, width : this.width});
        this.$playerSprite = $('<img class="sprite" src="Sprites/Spieler.png">');
        this.$playerSprite.css({heigth: this.heigth , width : this.width});
        $(this.$playerElement).append(this.$playerSprite);
        $("#field").append(this.$playerElement);
    }

    update(){
        this.vel = seekingBehaviour(mousePos, new Vector2(this.posX, this.posY), this.vel, this.maxSpeed, this.maxForce, this.maxVel);
        this.move();
        this.rotate();
    }

    move(){
        this.posX = this.posX + this.vel.getX();
        this.posY = this.posY + this.vel.getY();
        this.$playerElement.css({top: this.posY, left: this.posX});
    }

    rotate(){
        this.currentRotation = this.vel.angel(new Vector2(0,1)) + 180;
        if (this.vel.getX() >= 0){
            this.currentRotation *= -1;
        }
        this.$playerSprite.css({transform: 'rotate(' + this.currentRotation + 'deg'});
    }
}