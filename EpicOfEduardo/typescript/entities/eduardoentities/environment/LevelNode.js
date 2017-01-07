/* global Entity HitBox GameSprite MyGame LevelWorld */
class LevelNode extends Entity {
    constructor(_x, _y, _ln) {
        super(_x, _y);
        this.levelName = _ln;
        this.mask = new HitBox(_x, _y, 16, 16);
        this.sprite = new GameSprite(MyGame.imgs["level_icons"], 16, 16);
        this.sprite.addAnimation("cleared", [4, 5, 6, 7]);
        this.sprite.addAnimation("not_cleared", [0, 1, 2, 3]);
        this.image = this.sprite;
        this.sprite.playAnimation("not_cleared", 5);
        this.setType("node");
        this.cameFrom = "north";
        if (Eduardo.levelCleared[_ln]) {
            this.sprite.playAnimation("cleared", 5);
        }
    }
    setReturnPath(cameFrom) {
        this.cameFrom = cameFrom;
    }
    enterLevel() {
        Eduardo.currentLevel = this.levelName;
        if (this.levelName === "Mystic Cave") {
            MyGame.setWorld(new LevelWorld("cave", 64, 409));
            MyGame.color = "#121218";
        }
        else if (this.levelName === "Pretty Plains") {
            MyGame.setWorld(new LevelWorld("pretty_plains_1", 32, 310));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Coastown Bridge") {
            MyGame.setWorld(new LevelWorld("city_bridge", 48, 404));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Butter Beach") {
            MyGame.setWorld(new LevelWorld("butter_beach", 48, 962));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Bitter Beach") {
            MyGame.setWorld(new LevelWorld("bitter_beach", 48, 448));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Outskirts") {
            MyGame.setWorld(new LevelWorld("outskirts", 48, 1020));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Whimsy Woodlands") {
            MyGame.setWorld(new LevelWorld("whimsy_woodlands", 48, 1020));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Sugar Meadows") {
            MyGame.setWorld(new LevelWorld("sugar_meadows", 48, 444));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Cursed Mountain") {
            MyGame.setWorld(new LevelWorld("cursed_mountain", 64, 6699));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Rocky River") {
            MyGame.setWorld(new LevelWorld("rocky_river_s1", 7104, 640));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Mudboot's Path") {
            MyGame.setWorld(new LevelWorld("mudboots_path_1", 48, 480));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Simon's Swamp") {
            MyGame.setWorld(new LevelWorld("simons_swamp", 48, 760));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Birch Cliffs") {
            MyGame.setWorld(new LevelWorld("birch_cliffs", 64, 2400));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Snowdrift Forest") {
            MyGame.setWorld(new LevelWorld("snowdrift_forest", 9920, 208));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Logger's Way") {
            MyGame.setWorld(new LevelWorld("loggers_way", 8580, 1600));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Cold Lake") {
            MyGame.setWorld(new LevelWorld("cold_lake", 48, 640));
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Lost Manor") {
            MyGame.setWorld(new LevelWorld("mansion_foyer", 48, 640));
            MyGame.color = "#12124E";
        }
        else if (this.levelName === "Belle's Bridge") {
            MyGame.setWorld(new LevelWorld("river_bridge", 48, 626));
            MyGame.color = "#12124E";
        }
        else if (this.levelName == "Riverside" || this.levelName == "Joel's Convenience" || this.levelName == "Outpost" || this.levelName == "Snow Cabin") {
            MyGame.setWorld(new LevelWorld("shop", 48, 306));
            MyGame.color = "#FBA561";
        }
    }
    isValidPath(_key) {
        if (_key == "ArrowUp") {
            if (this.levelName == "Mazey Cave 2") {
                return false;
            }
            for (let i = this.y - 24; i > 0; i -= 6) {
                if (this.collideTypes("node", this.x, i)) {
                    return true;
                }
                else if (this.collideTypes("block", this.x, i)) {
                    return false;
                }
            }
        }
        else if (_key == "ArrowLeft") {
            for (let i = this.x - 24; i > 0; i -= 6) {
                if (this.collideTypes("node", i, this.y)) {
                    return true;
                }
                else if (this.collideTypes("block", i, this.y)) {
                    return false;
                }
            }
        }
        else if (_key == "ArrowRight") {
            for (let i = this.x + 40; i < this.world.width; i += 6) {
                if (this.collideTypes("node", i, this.y)) {
                    return true;
                }
                else if (this.collideTypes("block", i, this.y)) {
                    return false;
                }
            }
        }
        else if (_key == "ArrowDown") {
            if (this.levelName == "Lake's View") {
                return false;
            }
            for (let i = this.y + 40; i < this.world.height; i += 6) {
                if (this.collideTypes("node", this.x, i)) {
                    return true;
                }
                else if (this.collideTypes("block", this.x, i)) {
                    return false;
                }
            }
        }
        return false;
    }
    update(_dt) {
        this.sprite.updateAnimation(_dt);
    }
}
