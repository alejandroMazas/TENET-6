class Hero{
    constructor(ctx,gameSizeWidth, gameSizeHeight,heroPosX,heroPosY,heroWidth,heroHeight,heroSpeedX,heroSpeedY){
        this.ctx=ctx
        this.gameSize={w:gameSizeWidth,h:gameSizeHeight}
        this.heroPos={x:heroPosX, y:heroPosY}
        this.heroSize={w:heroWidth,h:heroHeight}
        this.heroSpeed={x:heroSpeedX, y:heroSpeedY}
        this.bullets=[]
        this.timerIndex=0
        this.heroGravity=0.4
        this.lives=[]
    }

    drawHero(){
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.heroPos.x,this.heroPos.y,this.heroSize.w,this.heroSize.h)
    }
}