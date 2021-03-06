
import Game from "../Game";
import GamePro from "../GamePro";

/**子弹爆炸特效 */
export default class BoomEffect{
    static TAG:string = "BoomEffect";

    public pro: GamePro;
    public effectId:number = 0;
    public sp3d:Laya.Sprite3D;
    constructor() {

    }

    static getEffect(pro: GamePro,effectId:number):BoomEffect
    {
        let effect:BoomEffect = Laya.Pool.getItemByClass(BoomEffect.TAG,BoomEffect);
        // let effect:BoomEffect = Laya.Pool.getItemByClass(BoomEffect.TAG + effectId,BoomEffect);
        // let effect:BoomEffect = new BoomEffect();
        if(!effect.pro || effect.effectId != effectId)
        {
            effect.pro = pro;
            effect.effectId = effectId;
            effect.sp3d = Laya.Sprite3D.instantiate(Laya.loader.getRes("h5/bulletsEffect/" + effectId + "/monster.lh"));
            // Game.monsterResClones.push(effect.sp3d);
            console.log("创建新的怪物子弹爆炸特效");
        }
        effect.sp3d.transform.localPosition = pro.sp3d.transform.localPosition;
        Game.layer3d.addChild(effect.sp3d);

        setTimeout(() => {
            effect.recover();
        }, 500);
        return effect;
    }

    recover():void
    {
        this.sp3d && this.sp3d.removeSelf();
        // Laya.Pool.recover(BoomEffect.TAG + this.effectId,this)
        Laya.Pool.recover(BoomEffect.TAG,this)
    }
}