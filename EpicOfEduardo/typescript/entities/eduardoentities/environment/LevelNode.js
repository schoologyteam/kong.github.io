/* global Entity HitBox GameSprite MyGame LevelWorld Eduardo */
class LevelNode extends Entity {
    constructor(_x, _y, _ln) {
        super(_x, _y);
        this.levelName = _ln;
        this.mask = new HitBox(_x, _y, 16, 16);
        this.sprite = new GameSprite(MyGame.imgs["level_icons"], 16, 16);
        this.sprite.addAnimation("cleared", [4, 5, 6, 7]);
        this.sprite.addAnimation("not_cleared", [0, 1, 2, 3]);
        this.sprite.addAnimation("shop", [8, 9, 10, 11]);
        this.image = this.sprite;
        this.sprite.playAnimation("not_cleared", 5);
        this.setType("node");
        this.cameFrom = "north";
        if (Eduardo.levelCleared[_ln]) {
            this.sprite.playAnimation("cleared", 5);
        }
        if (this.levelName == "Riverside" || this.levelName == "Joel's Convenience" || this.levelName == "Outpost" || this.levelName == "Snow Cabin") {
            this.sprite.playAnimation("shop", 5);
        }
    }
    setReturnPath(cameFrom) {
        this.cameFrom = cameFrom;
    }
    enterLevel() {
        MyGame.nowPlaying.pause();
        MyGame.nowPlaying.currentTime = 0;
        Eduardo.currentLevel = this.levelName;
        let _ln = null;
        let _sx = 0;
        let _sy = 0;
        if (this.levelName === "Mystic Cave") {
            _ln = "cave";
            _sx = 64;
            _sy = 408;
            MyGame.nowPlaying = MyGame.snds["Cave"];
            MyGame.nowPlaying.play();
            MyGame.color = "#121218";
        }
        else if (this.levelName === "Pretty Plains") {
            _ln = "pretty_plains_1";
            _sx = 32;
            _sy = 310;
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Coastown Bridge") {
            _ln = "city_bridge";
            _sx = 48;
            _sy = 404;
            MyGame.nowPlaying = MyGame.snds["City"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Butter Beach") {
            _ln = "butter_beach";
            _sx = 48;
            _sy = 962;
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Bitter Beach") {
            _ln = "bitter_beach";
            _sx = 48;
            _sy = 448;
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Outskirts") {
            _ln = "outskirts";
            _sx = 48;
            _sy = 1020;
            MyGame.nowPlaying = MyGame.snds["City"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Whimsy Woodlands") {
            _ln = "whimsy_woodlands";
            _sx = 48;
            _sy = 1020;
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Sugar Meadows") {
            _ln = "sugar_meadows";
            _sx = 48;
            _sy = 444;
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Cursed Mountain") {
            _ln = "cursed_mountain";
            _sx = 64;
            _sy = 6696;
            MyGame.nowPlaying = MyGame.snds["Mountain"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Rocky River") {
            _ln = "rocky_river_s1";
            _sx = 7104;
            _sy = 840;
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Mudboot's Path") {
            _ln = "mudboots_path_1";
            _sx = 48;
            _sy = 480;
            MyGame.nowPlaying = MyGame.snds["Swamp"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Simon's Swamp") {
            _ln = "simons_swamp";
            _sx = 48;
            _sy = 760;
            MyGame.nowPlaying = MyGame.snds["Swamp"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Birch Cliffs") {
            _ln = "birch_cliffs";
            _sx = 64;
            _sy = 2400;
            MyGame.nowPlaying = MyGame.snds["Mountain"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Snowdrift Forest") {
            _ln = "snowdrift_forest";
            _sx = 9920;
            _sy = 208;
            MyGame.nowPlaying = MyGame.snds["Snow"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Logger's Way") {
            _ln = "loggers_way";
            _sx = 8580;
            _sy = 1664;
            MyGame.nowPlaying = MyGame.snds["Mountain"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Deep Forest") {
            _ln = "deep_woods";
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            _sx = 48;
            _sy = 688;
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Abandoned Town") {
            _ln = "abandoned_town";
            _sx = 48;
            _sy = 208;
            MyGame.nowPlaying = MyGame.snds["City"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Cold Lake") {
            _ln = "cold_lake";
            _sx = 48;
            _sy = 640;
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Lost Manor") {
            _ln = "mansion_foyer";
            _sx = 48;
            _sy = 640;
            MyGame.nowPlaying = MyGame.snds["Haunted"];
            MyGame.nowPlaying.play();
            MyGame.color = "#12124E";
        }
        else if (this.levelName === "Belle's Bridge") {
            _ln = "river_bridge";
            _sx = 48;
            _sy = 626;
            MyGame.nowPlaying = MyGame.snds["City"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "City's Secret") {
            _ln = "city_tower";
            _sx = 72;
            _sy = 2400;
            MyGame.nowPlaying = MyGame.snds["City"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Forest's View") {
            _ln = "forest_view";
            _sx = 8448;
            _sy = 864;
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Lake's View") {
            _ln = "lakes_view";
            _sx = 8496;
            _sy = 400;
            MyGame.nowPlaying = MyGame.snds["Mountain"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        if (this.levelName === "Mazey Cave 1") {
            _ln = "maze_cave_1";
            _sx = 32;
            _sy = 496;
            MyGame.nowPlaying = MyGame.snds["Cave"];
            MyGame.nowPlaying.play();
            MyGame.color = "#121218";
        }
        else if (this.levelName === "Lost Woods") {
            _ln = "lost_woods_1";
            _sx = 1920;
            _sy = 400;
            MyGame.nowPlaying = MyGame.snds["Forest"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        if (this.levelName === "Ice Peak Cavern") {
            _ln = "ice_cavern";
            _sx = 32;
            _sy = 352;
            MyGame.nowPlaying = MyGame.snds["Snow"];
            MyGame.nowPlaying.play();
            MyGame.color = "#121218";
        }
        else if (this.levelName === "Ice Peak Path") {
            _ln = "ice_path";
            _sx = 5354 * 2;
            _sy = 168 * 2;
            MyGame.nowPlaying = MyGame.snds["Snow"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        if (this.levelName === "Mazey Cave 2") {
            _ln = "maze_cave_two_1";
            _sx = 32;
            _sy = 1744;
            MyGame.nowPlaying = MyGame.snds["Cave"];
            MyGame.nowPlaying.play();
            MyGame.color = "#121218";
        }
        else if (this.levelName === "Mudboot's Secret") {
            _ln = "mudboots_secret";
            _sx = 32;
            _sy = 544;
            MyGame.nowPlaying = MyGame.snds["Swamp"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Simon's Nase") {
            _ln = "chapel_outside";
            _sx = 48;
            _sy = 640;
            MyGame.nowPlaying = MyGame.snds["Haunted"];
            MyGame.nowPlaying.play();
            MyGame.color = "#12124E";
        }
        else if (this.levelName === "Swamp's End") {
            _ln = "swamps_end";
            _sx = 48;
            _sy = 524;
            MyGame.nowPlaying = MyGame.snds["Swamp"];
            MyGame.nowPlaying.play();
            MyGame.color = "#87CEFA";
        }
        else if (this.levelName === "Fake Queen's Castle") {
            _ln = "castle_entrance";
            _sx = 48;
            _sy = 224;
            MyGame.nowPlaying = MyGame.snds["Mountain"];
            MyGame.nowPlaying.play();
            MyGame.color = "#12124E";
        }
        else if (this.levelName == "Riverside" || this.levelName == "Joel's Convenience" || this.levelName == "Outpost" || this.levelName == "Snow Cabin") {
            _ln = "shop";
            _sx = 48;
            _sy = 360;
            MyGame.nowPlaying.play();
            MyGame.color = "#FBA561";
        }
        if (!_ln) {
            return;
        }
        this.world.addEntity(new ScreenTransition(MyGame.camera.x, MyGame.camera.y, new LevelWorld(_ln, _sx, _sy)));
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
