class PlayerController {
    constructor() {
        this.posX = 200;
        this.posY = 200;
        this.createPlayer();
    }

    createPlayer() {
        this.$playerElement = $('<div class="player"></div>');
        this.$playerElement.css({top: this.posY, left: this.posX});
        $("#field").append(this.$playerElement);
    }
}