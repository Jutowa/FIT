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

    //bringt die Länge auf 1
    normalize(){
        let length = this.getLength();
        this.x = this.x/length;
        this.y = this.y/length;
    }

    //berechnet das Skalar Produkt dieses Vektor mit einem anderen Vektor
    dotproduct(v){
        return this.getX() * v.getX() + this.getY() * v.getY();
    }

    //brechnet den Winkel dieses Vektors zu einem anderen Vektor
    angel(v){
        let zaehler = (this.dotproduct(v));
        let nenner = (this.getLength() * v.getLength());
        let angel = Math.acos(zaehler/nenner);
        return angel * (360 / (2 * Math.PI));
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