class PlayerController extends Controller{
    seek(){
        this.vel = seekingBehaviour(mousePos, new Vector2(this.posX, this.posY), this.vel, this.maxSpeed, this.maxForce, this.maxVel);
    }
}