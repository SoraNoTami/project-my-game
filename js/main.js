// import { spawnLevelUp } from "./spawnLevelUp.js";


let numTurn = 1

let personnage = {
    niveau: 1,
    x: 5,
    y: 5,
    travelLog: []
}
let caracter = $("#personnage");

let levelUp = {
    x: 0,
    y: 0,
    travelLog: []
}
let potion = $("#levelUp");

let mob = {
    niveau: 0,
    x: 0,
    y: 0,
    travelLog: [],
}

let tableauMob = [];
function baliseMob(niveau) {
    return ("<img id='" + numTurn + "'class='mob' src='./assets/mob.png'></img> <p id='text" + numTurn + "' class='level'>" + niveau + "</p>")
}
function balise2Mob(niveau, Turn) {
    return ("<img id='" + Turn + "'class='mob' src='./assets/mob.png'></img> <p id='text" + Turn + "' class='level'>" + niveau + "</p>")
}

function start() {
    let spawnLevelUp = [Math.round((Math.random() * 9) + 1), Math.round((Math.random() * 9) + 1)];
    levelUp.x = spawnLevelUp[0]
    levelUp.y = spawnLevelUp[1]
    $("#levelUp").css('display', 'block')
    $("#" + levelUp.x + "-" + levelUp.y).append(potion)
}

start()

function spawnLevelUp() {
    let spawnLevelUp = [Math.round((Math.random() * 9) + 1), Math.round((Math.random() * 9) + 1)];
    levelUp.x = spawnLevelUp[0]
    levelUp.y = spawnLevelUp[1]
    $("#levelUp").css('display', 'block')
    if (!(levelUp.x === personnage.x && levelUp.y === personnage.y)) {
        $("#" + levelUp.x + "-" + levelUp.y).append(potion)
        console.log(personnage.niveau)
    } else {
        spawnLevelUp()
    }
}

function niveauUp() {
    personnage.niveau++
    spawnLevelUp()
}

function duel(mob) {
    if (personnage.niveau > mob.niveau) {
        personnage.niveau++
        console.log("Duel:" , mob.turnSpawn)
        $("#" + mob.turnSpawn).remove()
        $("#text" + mob.turnSpawn).remove()
        tableauMob.splice((mob.turnSpawn - 1), 1)
        console.log("win")
    } else if (personnage.niveau < mob.niveau) {
        $("#personnage").remove()
        console.log("lose")
        debugger;
    } else {
        personnage.niveau++
        console.log(mob.turnSpawn)
        $("#" + mob.turnSpawn).remove()
        $("#text" + mob.turnSpawn).remove()
        tableauMob.slice((mob.turnSpawn - 1), mob.turnSpawn)
        console.log("égale")
    }
}



function turn() {
    numTurn++
    //Apparition des ennemis
    let spawnMob = [Math.round((Math.random() * 3) + 1), Math.round((Math.random() * 9) + 1)]
    if (spawnMob[0] === 1) {
        spawnMob = [10, spawnMob[1]]
    } else if (spawnMob[0] === 2) {
        spawnMob = [spawnMob[1], 10]
    } else if (spawnMob[0] === 3) {
        spawnMob = [0, spawnMob[1]]
    } else if (spawnMob[0] === 4) {
        spawnMob = [spawnMob[1], 0]
    } else {
        console.error("error")
    }
    $("#" + spawnMob[0] + "-" + spawnMob[1]).append(baliseMob("?"))
    tableauMob.forEach(function (mob) {
        let mobX = 0
        let mobY = 0
        $("#" + mob.turnSpawn).remove()
        $("#text" + mob.turnSpawn).remove()
        if (mob.x > personnage.x) {
            mobX = mob.x - personnage.x
        } else if (mob.x < personnage.x) {
            mobX = personnage.x - mob.x
        }

        if (mob.y > personnage.y) {
            mobY = mob.y - personnage.y
        } else if (mob.y < personnage.y) {
            mobY = personnage.y - mob.y
        }

        if (mobX === mobY) {
            if (mob.x < personnage.x) {
                mob.x++
            } else if (mob.x > personnage.x) {
                mob.x--
            } else if (mob.y > personnage.y) {
                mob.y--
            } else if (mob.y < personnage.y) {
                mob.y++
            }
        } else if (mobX > mobY) {
            if (mob.x > personnage.x) {
                mob.x--
            } else if (mob.x < personnage.x) {
                mob.x++
            } else {
                console.error("error")
            }
        } else if (mobX < mobY) {
            if (mob.y > personnage.y) {
                mob.y--
            } else if (mob.y < personnage.y) {
                mob.y++
            } else {
                console.error("error")
            }
        } else {
            console.error("error")
        }

        $("#" + mob.x + "-" + mob.y).append(balise2Mob(mob.niveau, mob.turnSpawn))
        if (mob.y === personnage.y && mob.x === personnage.x) {
            console.log("duel")
            duel(mob)
        }
        

        
        mob.levelupTurnMob++
        if (mob.levelupTurnMob - 3 === 0) {
            mob.levelupTurnMob -= 3
            mob.niveau++
        }
    })


    tableauMob.push(
        mob = {
            niveau: Math.round((Math.random() * 2)) + personnage.niveau - 1,
            turnSpawn: numTurn - 1,
            levelupTurnMob: 0,
            x: spawnMob[0],
            y: spawnMob[1],
            balise: baliseMob(mob.niveau)
        }
    )

    console.log(tableauMob)
    console.log(personnage.niveau)
    // console.log(mob.niveau)
}

function move(event) {
    if (event.keyCode === 39) {
        //Droite
        if (personnage.x < 10) {
            personnage.x++;
            tableauMob.forEach(function (mob) {
                if (mob.y === personnage.y && mob.x === personnage.x) {
                    console.log("duel")
                    duel(mob)
                }
            })
            $("#" + personnage.x + "-" + personnage.y).append(caracter)
            turn()
        } else {
            turn()
        }
    } else if (event.keyCode === 37) {
        //Gauche
        if (personnage.x > 0) {
            personnage.x--
            tableauMob.forEach(function (mob) {
                if (mob.y === personnage.y && mob.x === personnage.x) {
                    console.log("duel")
                    duel(mob)
                }
            })
            $("#" + personnage.x + "-" + personnage.y).append(caracter)
            turn()
        } else {
            turn()
        }
    } else if (event.keyCode === 38) {
        //Haut
        if (personnage.y > 0) {
            personnage.y--;
            tableauMob.forEach(function (mob) {
                if (mob.y === personnage.y && mob.x === personnage.x) {
                    console.log("duel")
                    duel(mob)
                }
            })
            $("#" + personnage.x + "-" + personnage.y).append(caracter)
            turn()
        } else {
            turn()
        }
    } else if (event.keyCode === 40) {
        //Bas
        if (personnage.y < 10) {
            personnage.y++;
            tableauMob.forEach(function (mob) {
                if (mob.y === personnage.y && mob.x === personnage.x) {
                    console.log("duel")
                    duel(mob)
                }
            })
            $("#" + personnage.x + "-" + personnage.y).append(caracter)
            turn()
        } else {
            turn()
        }
    } else {
        console.log(event.keyCode)
        console.log("Move with arrows")
    }
    // console.log(personnage.x, personnage.y, levelUp.x, levelUp.y)
    if (personnage.x === levelUp.x && personnage.y === levelUp.y) {
        console.log("level up")
        niveauUp()
    }
}
document.addEventListener("keydown", move)