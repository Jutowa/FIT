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

        if (this.position.getX() < game.getFieldSize().getX() * 0.05){
            this.position.setX(game.getFieldSize().getX() * 0.05);
        }else if (this.position.getX() > game.getFieldSize().getX() * 0.95){
            this.position.setX(game.getFieldSize().getX() * 0.95);
        }
        if (this.position.getY() < game.getFieldSize().getY() * 0.05){
            this.position.setY(game.getFieldSize().getY() * 0.05);
        }else if (this.position.getY() > game.getFieldSize().getY() * 0.95){
            this.position.setY(game.getFieldSize().getY() * 0.95);
        }

        this.rotate(enemyVel);
        this.$element.css({ top: this.position.getY(), left: this.position.getX()});
    }

    rotate(enemyVel){
        this.currentRotation = enemyVel.angel(new Vector2(1,0)) + 180;
        if (enemyVel.getX() >= 0){
            this.currentRotation *= -1;
        }
        this.$sprite.css({transform: 'rotate(' + this.currentRotation + 'deg'});
    }

    setVisiblity(visible){
        if (visible){
            this.$element.show();
        }else{
            this.$element.hide();
        }
    }
}