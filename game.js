class Game{
    constructor(){
        this.createfield();
        this.player = new PlayerController();
    }

    startGame(){
        $( document ).ready(function() {
            setInterval(function(){
                if (running){

                }
            }, 1000.0/60.0);
        });
    }

    createfield(){
        this.$game = $('<div id="game"></div>');
        this.$field = $('<div id="field"></div>');
        this.$game.append(this.$field);
        $("main").append(this.$game);
    }
}


