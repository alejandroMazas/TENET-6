class Enemy {
    constructor(ctx, gameSizeWidth, gameSizeHeight, enemyPosX, enemyPosY, enemyWidth, enemyHeight,) {
        this.ctx = ctx
        this.gameSize = { w: gameSizeWidth, h: gameSizeHeight }
        this.enemyPos = { x: enemyPosX, y: enemyPosY }
        this.enemySize = { w: enemyWidth, h: enemyHeight }
        this.enemyBullets = []
        this.timerIndex = 0
    }
    drawEnemy() {
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)

    }

    villainShoot() {
        this.enemyBullets.push(
            new Bullet(this.ctx, this.enemyPos.x, this.enemyPos.y, 30, 40, 20))
            
    
    }

    
}
