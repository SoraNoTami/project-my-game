// import { spawnLevelUp } from "./spawnLevelUp.js";


let numTurn = 0

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

let lose = false

function baliseMob(niveau) {
    return ("<img id='" + numTurn + "'class='mob' src='./assets/mob.png'></img> <p id='text" + numTurn + "' class='level'>" + niveau + "</p>")
}
function balise2Mob(niveau, turnSpawn) {
    return ("<img id='" + turnSpawn + "'class='mob' src='./assets/mob.png'></img> <p id='text" + turnSpawn + "' class='level'>" + niveau + "</p>")
}

function spawnLevelUp() {
    let spawnLevelUp = [Math.round((Math.random() * 9) + 1), Math.round((Math.random() * 9) + 1)];
    levelUp.x = spawnLevelUp[0]
    levelUp.y = spawnLevelUp[1]
    $("#levelUp").css('display', 'block')
    $("#" + levelUp.x + "-" + levelUp.y).append(potion)
    console.log(personnage.niveau)
}

function start() {
    let spawnLevelUp = [Math.round((Math.random() * 9) + 1), Math.round((Math.random() * 9) + 1)];
    levelUp.x = spawnLevelUp[0]
    levelUp.y = spawnLevelUp[1]
    $("#levelUp").css('display', 'block')
    $("#" + levelUp.x + "-" + levelUp.y).append(potion)
}

start()

function niveauUp() {
    personnage.niveau++
    spawnLevelUp()
}

function losing() {
    $("#lose").css('display', 'block')
    lose = true
}

function duel(mob, i) {
    console.log("id mob(Duel):", i)
    if (personnage.niveau > mob.niveau) {
        console.log("Duel with the mob:", mob.turnSpawn)
        personnage.niveau++
        $("#" + mob.turnSpawn).remove()
        $("#text" + mob.turnSpawn).remove()
        tableauMob.splice((i), 1)
        console.log("win")
    } else if (personnage.niveau < mob.niveau) {
        console.log("Duel with the mob:", mob.turnSpawn)
        $("#personnage").remove()
        console.log("lose")
        losing()
    } else {
        console.log("Duel with the mob:", mob.turnSpawn)
        personnage.niveau++
        $("#" + mob.turnSpawn).remove()
        $("#text" + mob.turnSpawn).remove()
        tableauMob.splice((i), 1)
        console.log("égale")
    }
}

function turn() {
    numTurn++
    //Apparition des ennemis
    if (numTurn % 2 !== 0) {
        var spawnMob = [Math.round((Math.random() * 3) + 1), Math.round((Math.random() * 9) + 1)]
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
    }

    tableauMob.forEach(function (mob, i) {
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
            duel(mob, i)
        }

        mob.turnUntilLevelup++
        if (mob.turnUntilLevelup - 0 === 0) {
            mob.turnUntilLevelup += 3
            mob.niveau++
        }

        tableauMob.forEach(function (mob2, i2) {
            if (mob.x === mob2.x && mob.y === mob2.y && mob.turnSpawn !== mob2.turnSpawn) {
                if (mob.niveau > mob2.niveau || mob.niveau === mob2.niveau) {
                    $("#" + mob2.turnSpawn).remove()
                    $("#text" + mob2.turnSpawn).remove()
                    tableauMob.splice((i2), 1)
                    mob.niveau++
                } else if (mob.niveau < mob2.niveau) {
                    $("#" + mob.turnSpawn).remove()
                    $("#text" + mob.turnSpawn).remove()
                    tableauMob.splice((i), 1)
                    mob2.niveau++
                }
            }
        })

        if (mob.x === levelUp.x && mob.y === levelUp.y) {
            mob.niveau++
            spawnLevelUp()
        }
    })

    if (numTurn % 2 !== 0) {
        tableauMob.push(
            mob = {
                niveau: Math.round((Math.random() * 1) + 1) + personnage.niveau - 1,
                turnSpawn: numTurn,
                turnUntilLevelup: 3,
                x: spawnMob[0],
                y: spawnMob[1],
                balise: baliseMob(mob.niveau)
            }
        )
    }

    console.log(tableauMob)
    console.log(personnage.niveau)
    // console.log(mob.niveau)
}

function move(event) {
    if (lose !== true) {
        if (event.keyCode === 39) {
            //Droite
            if (personnage.x < 10) {
                personnage.x++;
                tableauMob.forEach(function (mob, i) {
                    if (mob.y === personnage.y && mob.x === personnage.x) {
                        console.log("duel")
                        duel(mob, i)
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
                tableauMob.forEach(function (mob, i) {
                    if (mob.y === personnage.y && mob.x === personnage.x) {
                        console.log("duel")
                        duel(mob, i)
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
                tableauMob.forEach(function (mob, i) {
                    if (mob.y === personnage.y && mob.x === personnage.x) {
                        console.log("duel")
                        duel(mob, i)
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
                tableauMob.forEach(function (mob, i) {
                    if (mob.y === personnage.y && mob.x === personnage.x) {
                        console.log("duel")
                        duel(mob, i)
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
}
document.addEventListener("keydown", move)