class Bullet {
    constructor(ctx, bulletPosX,bulletPosY,bulletWidth,bulletHeight,bulletSpeed){
        this.ctx=ctx
        this.bulletPos={x:bulletPosX, y:bulletPosY}
        this.bulletSize={w:bulletWidth,h:bulletHeight}
        this.bulletSpeed=bulletSpeed
    }
    drawBullet() {
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.bulletPos.x,this.bulletPos.y,this.bulletSize.w,this.bulletSize.h, this.bulletSpeed)
    }

    drawEnemyBullet() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.bulletPos.x,this.bulletPos.y,this.bulletSize.w,this.bulletSize.h, this.bulletSpeed)
    
    }


    moveLeft() {
        this.bulletPos.x-=this.bulletSpeed

    }
    moveRight() {
        this.bulletPos.x+=this.bulletSpeed
    }
    
}