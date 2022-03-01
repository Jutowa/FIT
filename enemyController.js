class EnemyController extends Controller{
    seek(){
        this.vel = seekingBehaviour(game.player.getPos(), new Vector2(this.position.getX(), this.position.getY()), this.vel, this.maxSpeed, this.maxForce, this.maxVel);
    }
}