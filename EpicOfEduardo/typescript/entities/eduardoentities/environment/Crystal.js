/* global Item GameSprite MyGame Eduardo OverWorld ScreenTransition */
class Crystal extends Item {
    constructor(_x, _y) {
        super(_x, _y);
        if (Eduardo.currentLevel == "Mystic Cave") {
            this.image = new GameSprite(MyGame.imgs["vibrant_crystal"], 48, 48);
            this.image.addAnimation("glow", [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1]);
            this.image.playAnimation("glow", 20);
            this.setHitBox(48, 48);
        }
        else if (Eduardo.currentLevel == "City's Secret") {
            this.image = new GameSprite(MyGame.imgs["gem_ruby"], 32, 32);
            this.image.addAnimation("glow", [0, 1, 2, 1, 0]);
            this.image.playAnimation("glow", 20);
            this.setHitBox(32, 32);
        }
        else if (Eduardo.currentLevel == "Mazey Cave 1") {
            this.image = new GameSprite(MyGame.imgs["gem_topaz"], 48, 48);
            this.image.addAnimation("glow", [0, 1, 2, 1, 0]);
            this.image.playAnimation("glow", 18);
            this.setHitBox(48, 48);
        }
        else if (Eduardo.currentLevel == "Ice Peak Cavern") {
            this.image = new GameSprite(MyGame.imgs["amethyst"], 32, 32);
            this.image.addAnimation("glow", [0, 1, 2, 1, 0]);
            this.image.playAnimation("glow", 18);
            this.setHitBox(32, 32);
        }
        else if (Eduardo.currentLevel == "Mazey Cave 2") {
            this.image = new GameSprite(MyGame.imgs["emerald"], 48, 48);
            this.image.addAnimation("glow", [0, 1, 2, 1, 0]);
            this.image.playAnimation("glow", 18);
            this.setHitBox(48, 48);
        }
        else if (Eduardo.currentLevel == "Simon's Nase") {
            this.image = new GameSprite(MyGame.imgs["gem_saphire"], 48, 48);
            this.image.addAnimation("glow", [0, 1, 2, 1, 0]);
            this.image.playAnimation("glow", 18);
            this.setHitBox(48, 48);
        }
        else if (Eduardo.currentLevel == "Fake Queen's Castle") {
            this.image = new GameSprite(MyGame.imgs["diamond"], 48, 48);
            this.image.addAnimation("glow", [0, 1, 2, 1, 0]);
            this.image.playAnimation("glow", 18);
            this.setHitBox(48, 48);
        }
    }
    collect() {
        if (Eduardo.currentLevel == "City's Secret" && !Eduardo.levelCleared["City's Secret"]) {
            Eduardo.maxHearts += 2;
            Eduardo.hearts = Eduardo.maxHearts;
        }
        if (Eduardo.currentLevel == "Ice Peak Cavern" && !Eduardo.levelCleared["Ice Peak Cavern"]) {
            Eduardo.maxHearts += 2;
            Eduardo.hearts = Eduardo.maxHearts;
        }
        if (Eduardo.currentLevel == "Fake Queen's Castle" && !Eduardo.levelCleared["Fake Queen's Castle"]) {
            Eduardo.maxHearts += 2;
            Eduardo.hearts = Eduardo.maxHearts;
            Eduardo.levelCleared[Eduardo.currentLevel] = true;
            if (MyGame.playerName) {
                kongregate.stats.submit('Money', Math.min(Eduardo.money, 9999));
                let lvlclrd = 0;
                for (let level in Eduardo.levelCleared) {
                    if (level) {
                        lvlclrd++;
                    }
                }
                lvlclrd -= 4;
                kongregate.stats.submit("Levels Cleared", lvlclrd);
            }
            this.world.addEntity(new ScreenTransition(MyGame.camera.x, MyGame.camera.y, new CutScene2()));
            return;
        }
        Eduardo.levelCleared[Eduardo.currentLevel] = true;
        if (MyGame.playerName) {
            kongregate.stats.submit('Money', Math.min(Eduardo.money, 9999));
            let lvlclrd = 0;
            for (let level in Eduardo.levelCleared) {
                if (level) {
                    lvlclrd++;
                }
            }
            lvlclrd -= 4;
            kongregate.stats.submit("Levels Cleared", lvlclrd);
        }
        Eduardo.hearts = Eduardo.maxHearts;
        this.world.addEntity(new VictoryFanfare(MyGame.camera.x, MyGame.camera.y));
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
    }
}
