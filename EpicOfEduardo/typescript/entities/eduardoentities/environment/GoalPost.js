/* global Item GameImage Eduardo MyGame */
class GoalPost extends Item {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameImage(MyGame.imgs["goal_post"]);
        this.setHitBox(60, 300, 0, -60);
    }
    collect() {
        Eduardo.levelCleared[Eduardo.currentLevel] = true;
        Eduardo.hearts += 2;
        if (Eduardo.hearts > Eduardo.maxHearts) {
            Eduardo.hearts = Eduardo.maxHearts;
        }
        this.world.addEntity(new VictoryFanfare(MyGame.camera.x, MyGame.camera.y));
    }
}

class VictoryFanfare extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        if (MyGame.textLanguage === "English") {
            this.text = "Victory";
        }
        else {
            this.text = "Victoria";
        }
        this.image = {};
        this.image.list = [];
        this.image.render = function(_g) {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].render(_g);
            }
        };
        this.image.update = function(_dt) {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].update(_dt);
            }
        }
        this.image.list.push(new ParticleEmitter());
        this.image.list[0].setColour("rgb(255, 255, 255)");
        this.image.list[0].setShape("rectangle");
        this.image.list[0].setMotion(60, Math.PI / 4, 120, 3 * Math.PI / 4);
        this.image.list[0].setSize(5, 5);
        this.image.list[0].setUseLocal(true);
        this.image.list[0].setLocalPosition(this.x, this.y);
        this.image.list[0].setLife(0.3, 0.6);
        this.image.list[0].setScale(0.4, 1.6);
        this.image.list.push(new ParticleEmitter());
        this.image.list[1].setColour("rgb(255, 100, 100)");
        this.image.list[1].setShape("rectangle");
        this.image.list[1].setMotion(60, Math.PI / 4, 120, 3 * Math.PI / 4);
        this.image.list[1].setSize(5, 5);
        this.image.list[1].setUseLocal(true);
        this.image.list[1].setLocalPosition(this.x, this.y);
        this.image.list[1].setLife(0.3, 0.6);
        this.image.list[1].setScale(0.4, 1.6);
        this.image.list.push(new ParticleEmitter());
        this.image.list[2].setColour("rgb(5, 90, 240)");
        this.image.list[2].setShape("rectangle");
        this.image.list[2].setMotion(60, Math.PI / 4, 120, 3 * Math.PI / 4);
        this.image.list[2].setSize(5, 5);
        this.image.list[2].setUseLocal(true);
        this.image.list[2].setLocalPosition(this.x, this.y);
        this.image.list[2].setLife(0.3, 0.6);
        this.image.list[2].setScale(0.4, 1.6);
        this.image.list.push(new ParticleEmitter());
        this.image.list[3].setColour("rgb(235, 240, 40)");
        this.image.list[3].setShape("rectangle");
        this.image.list[3].setMotion(60, Math.PI / 4, 120, 3 * Math.PI / 4);
        this.image.list[3].setSize(5, 5);
        this.image.list[3].setUseLocal(true);
        this.image.list[3].setLocalPosition(this.x, this.y);
        this.image.list[3].setLife(0.3, 0.6);
        this.image.list[3].setScale(0.4, 1.6);
        for (let i = 0; i < this.image.list.length; i++) {
            for (let j = 0; j < 12; j++) {
                this.image.list[i].colouredShapeParticle(160 + Math.random() * MyGame.WIDTH - 320, 180 + Math.random() * 60);
            }
        }
    }
    update(_dt) {
        this.image.update(_dt);
    }
    render(_g) {
        super.render(_g);
        _g.text(this.text, 260, 240, "#000000", "48px Verdana");
        _g.text(this.text, 262, 242, "#FFFFFF", "48px Verdana");
    }
}