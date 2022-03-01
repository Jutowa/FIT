class Controller{
    constructor(position, size, maxForce, maxSpeed, maxVel, sprite) {
        this.position = position;
        this.size = size;
        this.currentRotation = 0;

        this.vel = new Vector2(0,0);
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce;
        this.maxVel = maxVel;

        this.sprite = sprite;

        this.create();
    }

    create(){
        this.$element = $('<div class="object"></div>');
        this.$element.css({top: this.position.getY(), left: this.position.getX(), heigth: this.size.getY(), width : this.size.getX()});
        this.$sprite = $('<img class="sprite" src="' + this.sprite +  '">');
        this.$sprite.css({heigth: this.size.getY(), width : this.size.getX()});
        $(this.$element).append(this.$sprite);
        $("#field").append(this.$element);
    }

    update(){
        this.edgeCheck();
        this.seek();
        this.move();
        this.rotate();
    }

    seek(){
        //for Childclass
    }

    edgeCheck(){
        //for Childclass
    }

    move(){
        this.position.setX(this.position.getX() + this.vel.getX());
        this.position.setY(this.position.getY() + this.vel.getY());
        this.$element.css({top: this.position.getY(), left:  this.position.getX()});
    }

    rotate(){
        this.currentRotation = this.vel.angel(new Vector2(0,1)) + 180;
        if (this.vel.getX() >= 0){
            this.currentRotation *= -1;
        }
        this.$sprite.css({transform: 'rotate(' + this.currentRotation + 'deg'});
    }

    getPos(){
        return this.position;
    }
}