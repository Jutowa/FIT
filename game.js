class Game{
    constructor(){
        this.createfield();
        this.createListener();
        this.player = new PlayerController();
        this.startGame();
    }

    startGame(){
        $( document ).ready(function() {
            setInterval(function(){
                game.getPlayer().update();
            }, 1000.0/60.0);
        });
    }

    createfield(){
        this.$gameElememnt = $('<div id="game"></div>');
        this.$fieldElement = $('<div id="field"></div>');
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
}