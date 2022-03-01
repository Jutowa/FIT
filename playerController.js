class PlayerController extends Controller{
    seek(){
        this.vel = seekingBehaviour(mousePos, new Vector2(this.position.getX(), this.position.getY()), this.vel, this.maxSpeed, this.maxForce, this.maxVel);
        if (this.position.getX() < 0 || this.position.getX() > 800){
            this.vel.setX(this.vel.getX() * -1);
        }else if  (this.position.getY() < 0 || this.position.getY() > 600){
            this.vel.setY(this.vel.getY() * -1);
        }
    }
}