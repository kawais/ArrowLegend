import { BasePlatform } from "./BasePlatform";
import Game from "../game/Game";

export default class TestPlatform extends BasePlatform{
    checkUpdate():void
    {

    }

    login(callback):void
    {
        // callback && callback("" + Date.now());
        callback && callback("201afdafdastrergasfsdaewfdfda823");
    }

    onShare(callback):void
    {
        callback && callback();
        Game.hero.reborn();
    }
}