class Game{
    constructor(){
        this.fieldSize = new Vector2(800,600);

        this.createfield();
        this.createListener();
        this.player = new PlayerController(new Vector2 (200,200), new Vector2(20,20), 0.02, 5, 0.2, "Sprites/Spieler.png");
        this.enemyList = [];
        this.enemyList.push(new EnemyController(new Vector2 (10,10), new Vector2(20,20), 0.02, 50, 0.2, "Sprites/Gegner.png"));

        this.startGame();
    }

    startGame(){
        $( document ).ready(function() {
            setInterval(function(){
                game.getPlayer().update();
                game.getEnemyList().forEach(element => {
                    element.update();
                });
            }, 1000.0/60.0);
        });
    }

    createfield(){
        this.$gameElememnt = $('<div id="game"></div>');
        this.$fieldElement = $('<div id="field"></div>');
        this.$fieldElement.css({width: this.fieldSize.getX(), height: this.fieldSize.getY()})
        this.$gameElememnt.append(this.$fieldElement);
        $("main").append(this.$gameElememnt);
    }

    createListener(){
        var mouseover = false;

        $(document).mousemove(function(e){
            if (mouseover){
                mousePos.setX(e.clientX - 8);
                mousePos.setY(e.clientY - 8);
            }
        });

        $(this.$fieldElement).mouseover(function(e){
            mouseover = true;
        });

        $(this.$fieldElement).mouseout(function(e){
            mouseover = false;
        });
    }

    getPlayer(){
        return this.player;
    }

    getEnemyList(){
        return this.enemyList;
    }

    getFieldSize(){
        return this.fieldSize;
    }
}