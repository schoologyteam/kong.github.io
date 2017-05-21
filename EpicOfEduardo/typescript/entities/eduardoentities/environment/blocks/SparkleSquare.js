/* global Entity ParticleEmitter MyGame */
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