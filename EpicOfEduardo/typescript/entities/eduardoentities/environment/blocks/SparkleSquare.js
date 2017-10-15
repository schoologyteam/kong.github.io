/* global Entity ParticleEmitter MyGame*/
class SparkleSquare extends Entity {
    constructor(_x, _y, _w, _h) {
        super(_x, _y);
        this.width = _w - 9;
        this.height = _h - 9;
        this.timer = 0.75; 
    }
    added() {
        this.image = new ParticleEmitter();
        this.image.setImage(MyGame.imgs["sparkles"]);
        this.image.useFade(1, 0.1);
        this.image.setLife(1, 2);
        this.image.setLocalPosition(this.x, this.y);
        this.image.setUseLocal(true);
    }
    update(_dt) {
        this.image.update(_dt);
        this.timer -= _dt;
        if (this.timer <= 0) {
            this.timer += 0.75;
            this.image.imageParticle(Math.random() * this.width, Math.random() * this.height);
        }
    }
}
/* RoadSign.js */
class RoadSign extends Entity {
    constructor(_x, _y, _id) {
        super(_x, _y);
        this.text = new Array();
        this.image = new GameImage(MyGame.imgs["sign"]);
        this.setHitBox(48, 48);
        switch (_id) {
            case 0:
                if (MyGame.textLanguage === "English") {
                    this.text.push(`Left Arrow or ${config.keyLeft}: Move Left`);
                    this.text.push(`Right Arrow or ${config.keyRight}: Move Right`);
                }
                else {
                    this.text.push(`Tecla de la Izquierda o ${config.keyLeft}: Mover a la Izquierda`);
                    this.text.push(`Tecla de la Derecha o ${config.keyRight}: Mover a la Derecha`);
                }
                break;
            case 1:
                if (MyGame.textLanguage === "English") {
                    this.text.push(`Up Arrow, ${config.keyUp}, or ${config.jumpKey}: Jump`);
                }
                else {
                    this.text.push(`Tecla de Arriba, ${config.keyUp}, o ${config.jumpKey}: Saltar`);
                }
                break;
            case 2:
                if (MyGame.textLanguage === "English") {
                    this.text.push(`${config.actionKey}: Open chests and use items.`);
                }
                else {
                    this.text.push(`${config.actionKey}: Abrir las cajas y usar articulos.`);
                }
                break;
            case 2:
                if (MyGame.textLanguage === "English") {
                    this.text.push(`${config.actionKey}: Open chests and use items.`);
                }
                else {
                    this.text.push(`${config.actionKey}: Abrir las cajas y usar articulos.`);
                }
                break;
            case 3:
                if (MyGame.textLanguage === "English") {
                    this.text.push(`Up Arrow, ${config.keyUp}, or ${config.actionKey}: Go through the door.`);
                }
                else {
                    this.text.push(`Tecla dey Arriba, ${config.keyUp}, o ${config.actionKey}: Pasar por la puerta.`);
                }
                break;
            case 4:
                this.image = new GameImage(MyGame.imgs["james"]);
                this.setHitBox(96, 48, -24, 0);
                if (MyGame.textLanguage === "English") {
                    this.text.push(`To buy an item, stand in front of it and press ${config.actionKey}.`);
                }
                else {
                    this.text.push(`Para comprar, camine al articulo i oprima ${config.actionKey}.`);
                }
                break;
            default:
        }
    }
    render(_g) {
        super.render(_g);
        if (this.collideTypes("player", this.x, this.y)) {
            _g.rectangle(MyGame.camera.x + 48, MyGame.camera.y + 96, MyGame.WIDTH - 96, 64, "rgb(255,255,255)");
            for (let i = 0; i < this.text.length; i++) {
                _g.text(this.text[i], 64, 120 + 30 * i, "rgb(0,0,0)", "24px Verdana");
            }
        }
    }
}