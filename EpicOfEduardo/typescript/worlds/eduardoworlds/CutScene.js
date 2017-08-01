/* global World */
class CutScene1 extends World {
    constructor() {
        super();
        this.act = 0;
        this.timer = 40;
        MyGame.color = "#87CEFA";
        let mapXML = MyGame.maps["cutscene_1"].responseXML;
        let elem = mapXML.getElementsByTagName("level");
        this.setSize(parseInt(elem[0].getAttribute("width"), 10) * 2, parseInt(elem[0].getAttribute("height"), 10) * 2);
        elem = mapXML.getElementsByTagName("walls");
        let wm = new GridMask(0, 0, 48, Math.ceil(this.width / 48), Math.ceil(this.height / 48));
        wm.loadFromString(elem[0].innerHTML);
        elem = mapXML.getElementsByTagName("walls_render");
        let wr = new TiledImage(MyGame.imgs["base_tiles"], Math.ceil(this.width / 48), Math.ceil(this.height / 48), 48);
        wr.loadFromString(elem[0].innerHTML);
        let walls = new Entity(0, 0, wr);
        //walls.setType("wall");
        this.addEntity(walls);
        elem = mapXML.getElementsByTagName("decoration");
        wr = new TiledImage(MyGame.imgs["decorations"], Math.ceil(this.width / 48), Math.ceil(this.height / 48), 48);
        wr.loadFromString(elem[0].innerHTML);
        this.addEntity(new Entity(0, 0, wr));
        this.text = [];
        if (MyGame.textLanguage === "English") {
            this.text.push("Help me! Help me!");
            this.text.push("Somebody please help me!");
            this.text.push("...");
            this.text.push("");
            this.text.push("You, young man, will you listen to my story?");
            this.text.push("I was a protector of my world,");
            this.text.push("They called me the forest queen.");
            this.text.push("But my power was usurped by the evil Rose Witch.");
            this.text.push("Now she guards her castle with a magic spell.");
            this.text.push("But perhaps, if you can collected the magic gems,");
            this.text.push("Then the barrier can be dispelled.");
            this.text.push("In this cave, there is a magic crystal,");
            this.text.push("that you can you use to travel between worlds.");
            this.text.push("Your quest won't be easy, but I believe in you!");
            this.skipText = "Press the key again to continue to the game.";
        }
        else {
            this.text.push("¡Ayúdame!");
            this.text.push("¡Por favor, Ayúdame!");
            this.text.push("...");
            this.text.push("");
            this.text.push("Mi chico. ¿escucharás la historia que estoy aquí?");
            this.text.push("Fui la protectora de mi mundo.");
            this.text.push("Me llamo la reina del bosque.");
            this.text.push("Pero, la Bruja de las Rosas ha me desterrado,");
            this.text.push("y, ahora, protege su castillo con una fórmula mágica.");
            this.text.push("Pero, si reúnes las gemas mágicas,");
            this.text.push("puedes disipar la berrara.");
            this.text.push("En esta cueva, hay un crystal mágico,");
            this.text.push("que puedes usar a viajar al otro mundo.");
            this.text.push("Tu búsqueda no es fácil, ¡pero creo que puedas!");
            this.skipText = "Oprima la tecla de nuevo para continuar al juego.";
        }
        this.fairy = new Entity(176 * 2, 480, new GameSprite(MyGame.imgs["dark_fairy"], 48, 44), new HitBox(48, 44));
        this.addEntity(this.fairy);
        this.cage = new Entity(172 * 2, 464, new GameImage(MyGame.imgs["magic_cage"]));
        this.addEntity(this.cage);
        this.eddy = new EddyCutscene(-100, 420);
        this.addEntity(this.eddy);
        this.offCameraFloor = new Entity(-200, 528, null, new HitBox(1200, 24));
        this.offCameraFloor.setType("wall");
        this.addEntity(this.offCameraFloor);
        this.wtf = new Entity(720, 384, null, new HitBox(48, 144));
        this.wtf.setType("wall");
        this.addEntity(this.wtf);
        this.considerSkipping = false;
        this.skipTimer = 0;
    }
    update(_dt) {
        super.update(_dt);
        if (KeyManager.pressed(config.actionKey) || KeyManager.pressed(config.jumpKey || KeyManager.pressed(config.pauseKey) || KeyManager.pressed("Enter") || KeyManager.pressed("Escape"))) {
            if (this.considerSkipping) {
                MyGame.color = "#121218";
                this.addEntity(new ScreenTransition(MyGame.camera.x, MyGame.camera.y, new LevelWorld("cave", 64, 408)));
            }
            else {
                this.considerSkipping = true;
                this.skipTimer = 300;
            }
        }
        this.timer--;
        this.skipTimer--;
        if (this.skipTimer <= 0) {
            this.considerSkipping = false;
        }
        if (this.timer <= 0) {
            switch (this.act) {
                case 0:
                    this.timer = 90;
                    break;
                case 1:
                    this.eddy.setXSpeed(3);
                    this.eddy.image.playAnimation("right", 15, true);
                    this.timer = 130;
                    break;
                case 2:
                    this.eddy.setXSpeed(0);
                    this.eddy.image.playAnimation("stand_r");
                    this.timer = 90;
                    break;
                case 3:
                    this.timer = 120;
                    break;
                case 4:
                    this.timer = 240;
                    break;
                case 5:
                    this.timer = 240;
                    break;
                case 6:
                    this.timer = 360;
                    break;
                case 7:
                    this.timer = 300;
                    break;
                case 8:
                    this.timer = 240;
                    break;
                case 9:
                    this.timer = 180;
                    break;
                case 10:
                    this.timer = 90;
                    this.eddy.setXSpeed(4);
                    this.eddy.image.playAnimation("right", 15, true);
                    break;
                case 11:
                    this.timer = 30;
                    this.eddy.jump();
                    this.eddy.image.playAnimation("jump_r");
                    break;
                case 12:
                    MyGame.nowPlaying.pause();
                    MyGame.nowPlaying.currentTime = 0;
                    MyGame.nowPlaying = MyGame.snds["Cave"];
                    MyGame.nowPlaying.play();
                    MyGame.color = "#121218";
                    this.addEntity(new ScreenTransition(MyGame.camera.x, MyGame.camera.y, new LevelWorld("cave", 64, 408)));
                    break;
                default:
            }
            this.act++;
        }
    }
    render(_g) {
        super.render(_g);
        switch (this.act) {
            case 1:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[0], 78, 56, "#FFFFFF", "18px Verdana");
                break;
            case 2:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[1], 78, 56, "#FFFFFF", "18px Verdana");
                break;
            case 3:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[2], 78, 56, "#FFFFFF", "18px Verdana");
                break;
            case 5:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[4], 78, 56, "#FFFFFF", "18px Verdana");
                break;
            case 6:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[5], 78, 56, "#FFFFFF", "18px Verdana");
                _g.text(this.text[6], 78, 84, "#FFFFFF", "18px Verdana");
                break;
            case 7:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[7], 78, 56, "#FFFFFF", "18px Verdana");
                _g.text(this.text[8], 78, 84, "#FFFFFF", "18px Verdana");
                break;
            case 8:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[9], 78, 56, "#FFFFFF", "18px Verdana");
                _g.text(this.text[10], 78, 84, "#FFFFFF", "18px Verdana");
                break;
            case 8:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[11], 78, 56, "#FFFFFF", "18px Verdana");
                _g.text(this.text[12], 78, 84, "#FFFFFF", "18px Verdana");
                break;
            case 9:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[13], 78, 56, "#FFFFFF", "18px Verdana");
                break;
            case 10:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[13], 78, 56, "#FFFFFF", "18px Verdana");
                break;
            default:
        }
        if (this.considerSkipping) {
            _g.rectangle(86, 538, 528, 32);
            _g.text(this.skipText, 90, 560, "#FFFFFF", "18px Verdana");
        }
    }
}

class CutScene2 extends World {
    constructor() {
        super();
        MyGame.nowPlaying.pause();
        MyGame.nowPlaying.currentTime = 0;
        this.act = 0;
        this.timer = 40;
        let mapXML = MyGame.maps["cutscene_2"].responseXML;
        let elem = mapXML.getElementsByTagName("level");
        this.setSize(parseInt(elem[0].getAttribute("width"), 10) * 2, parseInt(elem[0].getAttribute("height"), 10) * 2);
        elem = mapXML.getElementsByTagName("walls");
        let wm = new GridMask(0, 0, 48, Math.ceil(this.width / 48), Math.ceil(this.height / 48));
        wm.loadFromString(elem[0].innerHTML);
        elem = mapXML.getElementsByTagName("walls_render");
        let wr = new TiledImage(MyGame.imgs["base_tiles"], Math.ceil(this.width / 48), Math.ceil(this.height / 48), 48);
        wr.loadFromString(elem[0].innerHTML);
        let walls = new Entity(0, 0, wr, wm);
        walls.setType("wall");
        this.addEntity(walls);
        elem = mapXML.getElementsByTagName("decoration");
        wr = new TiledImage(MyGame.imgs["decorations"], Math.ceil(this.width / 48), Math.ceil(this.height / 48), 48);
        wr.loadFromString(elem[0].innerHTML);
        this.addEntity(new Entity(0, 0, wr));
        this.text = [];
        Eduardo.money = 9999;
        MyGame.saveGame();
        if (MyGame.textLanguage === "English") {
            this.text.push("You did it, you defeated the Rose Witch!");
            this.text.push("I can't thank you enough!");
            this.text.push("And for a reward, I give you as much money as you can carry!");
        }
        else {
            this.text.push("¡Tu ganas! ¡Vences la Bruha de las Rosas!");
            this.text.push("¡Muchas gracias!");
            this.text.push("¡Tu primio es el dinero máximo!");
        }
        this.fairy = new Entity(176 * 2, 400, new GameSprite(MyGame.imgs["dark_fairy"], 48, 44), new HitBox(48, 44));
        this.fairy.image.addAnimation("flutter", [1, 2, 3, 2]);
        this.fairy.image.playAnimation("flutter", 15);
        this.fairy.update = function(_dt) {
            this.image.updateAnimation(_dt);
        };
        this.addEntity(this.fairy);
        this.eddy = new EddyCutscene(264, 458);
        this.eddy.image.playAnimation("stand_r");
        this.addEntity(this.eddy);
    }
    update(_dt) {
        super.update(_dt);
        this.timer--;
        if (this.timer <= 0) {
            switch (this.act) {
                case 0:
                    this.timer = 240;
                    break;
                case 1:
                    this.timer = 240;
                    break;
                case 2:
                    this.timer = 240;
                    break;
                case 3:
                    this.timer = 240;
                    break;
                case 4:
                    let menu = new MenuWorld();
                    menu.loadCredits(1);
                    this.addEntity(new ScreenTransition(this.camera.x, this.camera.y, menu));
                default:
            }
            this.act++;
        }
    }
    render(_g) {
        super.render(_g);
        switch (this.act) {
            case 1:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[0], 78, 56, "#FFFFFF", "18px Verdana");
                break;
            case 2:
                _g.rectangle(64, 32, 528, 64);
                _g.text(this.text[1], 78, 56, "#FFFFFF", "18px Verdana");
                break;
            case 3:
                _g.rectangle(64, 32, 592, 64);
                _g.text(this.text[2], 78, 56, "#FFFFFF", "18px Verdana");
                break;
            default:
        }
    }
}

class EddyCutscene extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameSprite(MyGame.imgs["eddy"], 62, 70);
        this.image.addAnimation("right", [0, 1, 2, 3]);
        this.image.addAnimation("left", [4, 5, 6, 7]);
        this.image.addAnimation("stand_r", [0]);
        this.image.addAnimation("stand_l", [4]);
        this.image.addAnimation("jump_r", [8]);
        this.image.addAnimation("jump_l", [10]);
        this.image.addAnimation("fall_r", [9]);
        this.image.addAnimation("fall_l", [11]);
        this.image.addAnimation("attack_r", [12, 13, 14, 0]);
        this.image.addAnimation("attack_l", [15, 16, 17, 4]);
        this.image.addAnimation("crouch_r", [20]);
        this.image.addAnimation("crouch_l", [24]);
        this.image.addAnimation("crawl_r", [21, 22, 21, 23]);
        this.image.addAnimation("crawl_l", [25, 26, 25, 27]);
        this.image.addAnimation("glide_r", [18]);
        this.image.addAnimation("glide_l", [19]);
        this.mask = new HitBox(this.x + 8, this.y, 48, 70);
        this.gravity = 0.65;
        this.drag = 0.017;
        this.image.playAnimation("stand_l");
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
        this.mask.update(this.x + 8, this.y);
        if (this.collideTypes("wall", this.x, this.y+1)) {
            this.setYSpeed(0);
        }
        else {
            this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
            if (this.getYSpeed() <= 0) {
                this.image.playAnimation("jump_r");
            }
            else {
                this.image.playAnimation("fall_r");
            }
        }
        if (this.jumpTimer > 0) {
            this.jumpTimer -= 1;
            this.setYSpeed(-8.5);
        }
        this.moveBy(this.getXSpeed(), this.getYSpeed(), "wall");
    }
    jump() {
        this.jumpTimer = 16;
        this.y -= 3;
    }
}
