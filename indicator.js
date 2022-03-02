class Indicator {
    constructor(size, sprite) {
        this.size = size;
        this.sprite = sprite;
        this.position = new Vector2(0,0);
        this.create();
        this.setVisiblity(false);
    }

    create() {
        this.$element = $('<div class="object"></div>');
        this.$element.css({heigth: this.size.getY(), width: this.size.getX() });
        this.$sprite = $('<img class="sprite" src="' + this.sprite + '">');
        this.$sprite.css({ heigth: this.size.getY(), width: this.size.getX() });
        $(this.$element).append(this.$sprite);
        $("#field").append(this.$element);
    }

    update(enemyPosition, enemyVel){
        this.position.setX(enemyPosition.getX());
        this.position.setY(enemyPosition.getY());

        if (this.position.getX() < game.getFieldSize().getX() * 0.02){
            this.position.setX(game.getFieldSize().getX() * 0.02);
        }else if (this.position.getX() > game.getFieldSize().getX() * 0.98){
            this.position.setX(game.getFieldSize().getX() * 0.98);
        }
        if (this.position.getY() < 0 - 10){
            this.position.setY(0 - 10);
        }else if (this.position.getY() > game.getFieldSize().getY() * 0.97){
            this.position.setY(game.getFieldSize().getY() * 0.95);
        }

        this.rotate();
        this.$element.css({ top: this.position.getY(), left: this.position.getX()});
    }

    rotate(){
        let tmp = new Vector2(this.position.getX() - game.getPlayer().getPos().getX() , this.position.getY() - game.getPlayer().getPos().getY());
        this.angel = tmp.angel(new Vector2(0,1));
        if (this.position.getX() >  game.getPlayer().getPos().getX()){
            this.angel *= -1;
        }

        this.$sprite.css({transform: 'rotate(' + this.angel + 'deg'});
    }

    setVisiblity(visible){
        if (visible){
            this.$element.show();
        }else{
            this.$element.hide();
        }
    }
}