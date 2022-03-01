class PlayerController extends Controller{
    seek(){
        this.vel = seekingBehaviour(mousePos, new Vector2(this.position.getX(), this.position.getY()), this.vel, this.maxSpeed, this.maxForce, this.maxVel);
    }

    edgeCheck(){
        if (this.position.getX() < 0 || this.position.getX() > game.getFieldSize().getX()){
            this.vel.setX(this.vel.getX() * -1);
        }else if  (this.position.getY() < 0 || this.position.getY() > game.getFieldSize().getY()){
            this.vel.setY(this.vel.getY() * -1);
        }
    }
}