const gameLauncher= {
    name: 'Tenet',
    description: 'Intento de Tenet',
    authors: ['Miguel Delgado', 'Alejandro Mazas de Lizana', 'Cristian Calderón'],
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    gameSize: {w:undefined,h:undefined},
    hero1: undefined,
    platforms: [],
    FPS:60,
    timerIndex:0,
    jumpCounter:0,
    shootingIndex:0,
    bullets:[],
    bulletDirection:[],
    enemyArr: [],
    enemyBullets:[], // AQUI NO HAY NADA !!


    init(canvasID){
        this.canvasNode=document.querySelector(`#${canvasID}`)
        this.ctx=this.canvasNode.getContext('2d')
        this.setDimensions()
        this.createHero()
        this.createEnemy()
        this.createPlatform()
        this.setEventListeners()
        this.startGame()
        
    },

    setDimensions(){
        this.gameSize={
            w: window.innerWidth,
            h: window.innerHeight
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
        this.canvasNode.setAttribute('height', this.gameSize.h)
    },
    drawRectangle(){
        this.ctx.fillStyle='green'
        this.ctx.fillRect(0,0,this.gameSize.w,this.gameSize.h)
    },
//------------------------------------------------------------------------------------------------------POSX POSY WIDTH HEIGHT------------------------------------------------------------------
    createPlatform(){
        this.platforms.push(
            // PLATAFORMA 3 : 0
            new Platform(this.ctx,this.gameSize.w, this.gameSize.h, this.gameSize.w/3, this.gameSize.h/4 - this.gameSize.h/20,2*this.gameSize.w/3,20),
            // PLATAFORMA 2 : 1
            new Platform(this.ctx,this.gameSize.w, this.gameSize.h, 0, 2*this.gameSize.h/4 - this.gameSize.h/20,2*this.gameSize.w/3,20),
            // PLATAFORMA 1 : 2
            new Platform(this.ctx,this.gameSize.w, this.gameSize.h, this.gameSize.w/3, 3*this.gameSize.h/4 - this.gameSize.h/20,2*this.gameSize.w/3,20),
            //SUELO : 3
            new Platform(this.ctx,this.gameSize.w, this.gameSize.h, 0, this.gameSize.h - this.gameSize.h/20,this.gameSize.w,30),
            //  SNIPER
            new Platform(this.ctx, this.gameSize.w, this.gameSize.h, 0, this.gameSize.h / 4 - this.gameSize.h / 20, 2 * this.gameSize.w / 40, 20),
            // SNIPER 2
            new Platform(this.ctx, this.gameSize.w, this.gameSize.h, this.gameSize.w - 70, 2 * this.gameSize.h / 4 - this.gameSize.h / 20, 2 * this.gameSize.w / 30, 20)
            
            )
    },   
    ///HERO!!!!!!!!!!!!!!!!!!!!!!!!!!   
    createHero(){
        this.hero1=new Hero(this.ctx,this.gameSize.w,this.gameSize.h,3*this.gameSize.w/4,3*this.gameSize.h/20 -80,30,80, 30,0)
    },
    moveRight(){
        
        this.hero1.heroPos.x+=15   //this.hero1.heroSpeed.x
    },
    moveLeft(){
        this.hero1.heroPos.x-=15   //this.hero1.heroSpeed.x
    }
    ,
    moveUp(){
        this.hero1.heroSpeed.y=200
        this.hero1.heroSpeed.y*=this.hero1.heroGravity
        this.hero1.heroPos.y-= this.hero1.heroSpeed.y
    },

    // this.jumpCounter++
        // this.hero1.heroSpeed.y=100
        // if(this.jumpCounter<24){
        // }
    
    
  // ME VAGO EN TOOOOODOO QUE FURULAAAAAA---------------------------------------------------------------

    collisions(){
        this.platforms.forEach((eachPlatform) => {
            if (this.hero1.heroPos.x < eachPlatform.obstaclePos.x + eachPlatform.obstacleSize.w &&
                this.hero1.heroPos.x + this.hero1.heroSize.w > eachPlatform.obstaclePos.x &&
                this.hero1.heroPos.y < eachPlatform.obstaclePos.y + eachPlatform.obstacleSize.h && 
                this.hero1.heroSize.h + this.hero1.heroPos.y > eachPlatform.obstaclePos.y) {
                this.hero1.heroSpeed.y = -5
                this.hero1.heroSpeed.y *= this.hero1.heroGravity
                this.hero1.heroPos.y += this.hero1.heroSpeed.y
            } else {
                this.hero1.heroSpeed.y = 1
                this.hero1.heroSpeed.y *= this.hero1.heroGravity
                this.hero1.heroPos.y += this.hero1.heroSpeed.y
            }
        })
    },
    // BALAS HEROE

    createBullets() {
        this.bullets.push(new Bullet(this.ctx, this.hero1.heroPos.x, this.hero1.heroPos.y, 30, 40, 20))
    },
    shoot() {
        this.bullets.forEach(eachBullet => eachBullet.drawBullet())
    },
    bulletsmove() {
        if (this.bulletDirection[0] === 'L') {
            this.bullets.forEach(eachBullet => {
                eachBullet.moveLeft()
                eachBullet.drawBullet()
            })
        } else if (this.bulletDirection[0] === 'R') {
            this.bullets.forEach(eachBullet => {
                eachBullet.moveRight()
                eachBullet.drawBullet()
            })
        }
    },
    ///ENEMYY!!!!!!!!!!!!!!!!!!!!!!!!!!
    createEnemy() {
        this.enemyArr.push(
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 750, 3*this.gameSize.h/20 -50, 30, 80,),
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 1100, 3*this.gameSize.h/20 -50, 30, 80,),
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 20, 3*this.gameSize.h/20 -50, 30, 80,),
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 400, 2*this.gameSize.h/4 - this.gameSize.h/20 - 80, 30, 80,),
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, this.gameSize.w -40, 2*this.gameSize.h/4 - this.gameSize.h/20 - 80, 30, 80,),
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 1000, 3*this.gameSize.h/4 - this.gameSize.h/20 - 80, 30, 80,),
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 600, 3*this.gameSize.h/4 - this.gameSize.h/20 - 80, 30, 80,),
            new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 250, this.gameSize.h - this.gameSize.h /20 - 80, 30, 80,)
            )
    },
    enemySight() {

        this.enemyArr.forEach(eachEnemy => {
            if (this.hero1.heroPos.y-20 < eachEnemy.enemyPos.y &&
                this.hero1.heroPos.y + this.hero1.heroSize.h+20 > eachEnemy.enemyPos.y + eachEnemy.enemySize.h){
                    if(this.shootingIndex%(Math.floor(Math.random()*(70-20+1)+20))==0){
            eachEnemy.villainShoot()
                    }
        }
    })
    },
    

    moveEnemyBullets() {

        this.enemyArr.forEach(eachEnemy=> {
            eachEnemy.enemyBullets.forEach(eachBullet => {
                eachBullet.moveLeft()

            })
        })
        this.enemyArr[]
        //this.enemyBullets.forEach(eachBullet => eachBullet.moveLeft())

       // this.enemyArr.forEach(eachEnemy => {
            //if (this.hero1.heroPos.x < eachEnemy.enemyPos.x){
                //console.log('esta a la izq')
               // this.enemyBullets.forEach(eachBullet => eachBullet.moveLeft())
           // } else if (this.hero1.heroPos.x > eachEnemy.enemyPos.x){
               // console.log('esta a la der')
           // this.enemyBullets.forEach(eachBullet => eachBullet.moveRight())
        // }


        
    
    },
    

    

    setEventListeners(){
        document.onkeydown=event=> {
            const { key } = event
            if(this.hero1.heroPos.x>=1.5*this.hero1.heroSize.w){
            if (key == 'a') {
                    this.moveLeft()
                    this.bulletDirection[0] = 'L'
                }
                }
            if (key == 'd') {
                if(this.hero1.heroPos.x<=this.gameSize.w-2*this.hero1.heroSize.w){
                    this.moveRight()
                    this.bulletDirection[0] = 'R'
                }
                }
            if (key == 's') this.createBullets()
        }
        document.onkeyup=event=> {
            const { key } = event
                if (key == 'w') {
                    this.moveUp()
                }
        }

    },
    drawAll(){
        this.drawRectangle()
        this.hero1.drawHero()
        this.enemyArr.forEach(eachEnemy=>eachEnemy.drawEnemy())
        this.platforms.forEach(eachPlatform=>eachPlatform.drawPlatform())
        this.collisions()
        this.enemySight()
        this.bulletsmove()
        this.enemyArr.forEach(eachEnemy=> {
            eachEnemy.enemyBullets.forEach(eachBullet => {
                eachBullet.drawEnemyBullet()

            })
        })
        this.moveEnemyBullets()

        
    },
    clearAll(){
        this.ctx.clearRect(0,0,this.gameSize.w, this.gameSize.h)
    },
    startGame(){
        setInterval(()=>{
            this.clearAll()
            this.drawAll()
            this.timerIndex++
            this.jumpCounter++
            this.shootingIndex++
        },1000/this.FPS)
    }
}