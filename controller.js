class Controller{
    constructor(posX, posY, heigth, width, maxForce, maxSpeed, maxVel, sprite) {
        this.posX = posX;
        this.posY = posY;
        this.heigth = heigth;
        this.width = width;
        this.currentRotation = 0;

        this.vel = new Vector2(0,0);
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce;
        this.maxVel = maxVel;

        this.sprite = sprite;
        this.createPlayer();
    }

    createPlayer(){
        this.$element = $('<div class="object"></div>');
        this.$element.css({top: this.posY, left: this.posX, heigth: this.heigth, width : this.width});
        this.$sprite = $('<img class="sprite" src="' + this.sprite +  '">');
        this.$sprite.css({heigth: this.heigth , width : this.width});
        $(this.$element).append(this.$sprite);
        $("#field").append(this.$element);
    }

    update(){
        this.seek();
        this.move();
        this.rotate();
    }

    seek(){

    }

    move(){
        this.posX = this.posX + this.vel.getX();
        this.posY = this.posY + this.vel.getY();
        this.$element.css({top: this.posY, left: this.posX});
    }

    rotate(){
        this.currentRotation = this.vel.angel(new Vector2(0,1)) + 180;
        if (this.vel.getX() >= 0){
            this.currentRotation *= -1;
        }
        this.$sprite.css({transform: 'rotate(' + this.currentRotation + 'deg'});
    }

    getPos(){
        return new Vector2(this.posX, this.posY);
    }
}