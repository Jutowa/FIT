class Vector2{
    constructor (x,y){
        this.x = x;
        this.y = y;
    }

    clampMagnitude(radius){
        if (this.getLength() > radius){
            this.normalize();
            this.x = radius * this.x;
            this.y = radius * this.y;
        }
    }

    normalize(){
        let length = this.getLength();
        this.x = this.x/length;
        this.y = this.y/length;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getLength(){
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }
}