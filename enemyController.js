class EnemyController extends Controller{
    constructor(position, size, maxForce, maxSpeed, maxVel, sprite){
        super(position, size, maxForce, maxSpeed, maxVel, sprite);
        this.isVisible = true;
        this.indicator = new Indicator(this.size, "Sprites/Pfeil.png");
        this.offsetY = 20;
    }

    seek(){
        this.vel = seekingBehaviour(game.player.getPos(), new Vector2(this.position.getX(), this.position.getY()), this.vel, this.maxSpeed, this.maxForce, this.maxVel);
    }

    edgeCheck(){
        switch(this.isVisible){
            case true:
                if (this.position.getX() < 0|| this.position.getX() > game.getFieldSize().getX()){
                    this.$element.hide();
                    this.indicator.setVisiblity(true);
                    this.isVisible = false;
                }else if  (this.position.getY() < 0 - this.offsetY || this.position.getY() > game.getFieldSize().getY() - this.offsetY){
                    this.$element.hide();
                    this.indicator.setVisiblity(true);
                    this.isVisible = false;
                }
                break;
            case false:
                if (this.position.getX() > 0 && this.position.getX() < game.getFieldSize().getX()
                        && this.position.getY() > 0 - this.offsetY && this.position.getY() < game.getFieldSize().getY() - this.offsetY){
                    this.$element.show();
                    this.indicator.setVisiblity(false);
                    this.isVisible = true;
                }
                this.indicator.update(this.position, this.vel);
                break;
        }
    }
}