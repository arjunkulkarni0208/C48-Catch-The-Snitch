var snitchImage, harryImage, harry, snitch, cloudImage, snitchGroup, cloudGroup,gameOver,gameOverImage
var draco, dracoImage, dementors, dementorsImage, malfoyGroup, dementorsGroup,scoreSnitch
var  ground ,groundImage
var score = 0
var life = true
localStorage["HighestScore"] = 0

function preload(){
    snitchImage = loadImage("snitch_image.png")
    harryImage = loadImage("harry.png")
    groundImage = loadImage("ground.png")
    dracoImage = loadImage("Draco.png")
    cloudImage = loadImage("cloud.png")
    dementorsImage = loadImage("dementors.png")
    gameOverImage = loadImage("gameOver.png")

}

function setup(){
    createCanvas(windowWidth,windowHeight)
    ground = createSprite(width/2,height,width,20)
    ground.addImage("ground",groundImage)
    ground.x = ground.width/2
    harry = createSprite(200, 200, 20, 20)
    harry.addImage("harry",harryImage)
    gameOver = createSprite(width/2,height/2,400,70)
    gameOver.addImage("gameOver",gameOverImage)
    gameOver.visible = false
    scoreSnitch = createSprite(60, 60, 10, 10)
    scoreSnitch.addImage("snitch",snitchImage)

    snitchGroup = new Group()
    malfoyGroup = new Group()
    dementorsGroup = new Group()
    cloudGroup = new Group()
}

function draw(){
    background("lightBlue")
    ground.velocityX = -5
    edges = createEdgeSprites()
    harry.collide(edges)
    if(ground.x < 500){
        ground.x = ground.width/2
    }

    if(keyDown("Up_Arrow") && life === true){
        harry.velocityY = -4
    }
    else if(keyDown("Down_Arrow") && life === true){
        harry.velocityY = 4
    }
    else{
        harry.velocityY = 0
    }

    if (dementorsGroup.isTouching(harry)){
        dementorsGroup.setVelocityXEach(0)
        cloudGroup.setVelocityXEach(0)
        ground.velocityX = 0
        snitchGroup.setVelocityXEach(0)
        malfoyGroup.setVelocityXEach(0)
        life = false
        gameOver.visible = true
    }

    if (malfoyGroup.isTouching(harry)){
        malfoyGroup.setVelocityXEach(0)
        cloudGroup.setVelocityXEach(0)
        ground.velocityX = 0
        snitchGroup.setVelocityXEach(0)
        dementorsGroup.setVelocityXEach(0)
        life = false
        gameOver.visible = true
    }

    if(snitchGroup.isTouching(harry)){
        score += 1
        snitchGroup[0].destroy()
    }
    //harry.debug = true
    harry.setCollider("circle",0,-20,30)
    textSize(30)
    fill("Black")
    text(": " + score, 80, 70)
       spawnCloud()
    if(life === true){
        spawnDementors()
        spawnMalfoy()
        spawnSnitch()
    }
    drawSprites()
}
function spawnCloud(){
    if(frameCount % 100 === 0){
        var cloud = createSprite(1210,random(82,300),40,10)
        cloud.addImage("cloud",cloudImage)
        cloud.velocityX = -5
        cloud.scale = 3
        cloudGroup.add(cloud)
    }
}

function spawnDementors(){
    if(frameCount % 100 === 0){
        dementors = createSprite(1210,random(70,350),20,20)
        dementors.addImage("dementors",dementorsImage)
        dementors.velocityX = -15
        dementorsGroup.add(dementors)
    }
}

function spawnMalfoy(){
    if(frameCount % 250 === 0){
        draco = createSprite(1210,random(70,350),20,20)
        draco.addImage("draco",dracoImage)
        draco.velocityX = -10
        malfoyGroup.add(draco)
    }
}

function spawnSnitch(){
    if(frameCount % 50 === 0){
        snitch = createSprite(1210,random(70,350),20,20)
        snitch.addImage("snitch",snitchImage)
        snitch.velocityX = -13
        snitchGroup.add(snitch)
    }
}