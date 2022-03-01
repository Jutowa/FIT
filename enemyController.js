class EnemyController extends Controller{
    seek(){
        this.vel = seekingBehaviour(game.player.getPos(), new Vector2(this.posX, this.posY), this.vel, this.maxSpeed, this.maxForce, this.maxVel);
    }
}