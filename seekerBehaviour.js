function seekingBehaviour(target, currentPos, vel, maxSpeed, maxForce, maxVel){
    let desired = new Vector2(target.getX() - currentPos.getX(), target.getY() - currentPos.getY());
    desired.normalize();
    desired = desired * maxSpeed;

    let steering = new Vector2(desired.getX() - vel.getX(), desired.getY() - vel.getY());
    steering.clampMagnitude(maxForce);

    let newVel = new Vector2(vel.getX() + steering.getX(), vel.getY() + vel.getY());
    newVel.clampMagnitude(maxSpeed);
    
    return newVel;
}
