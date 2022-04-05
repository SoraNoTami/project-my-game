// export function spawnLevelUp(levelUp, potion, personnage) {
//     let spawnLevelUp = [Math.round((Math.random() * 9) + 1), Math.round((Math.random() * 9) + 1)];
//     levelUp.x = spawnLevelUp[0]
//     levelUp.y = spawnLevelUp[1]
//     $("#levelUp").css('display', 'block')
//     // la potion spawn toujours a 2 case minimum du personnage
//     let save = 0;
//     if (levelUp.x > personnage.x) {
//         console.log("#A", levelUp.x - personnage.x <= 2, personnage.x, levelUp.x)
//         while ((levelUp.x - personnage.x) <= 2 && save < 100) {
//             levelUp.x = Math.round((Math.random() * 9) + 1)
//             console.log("#1")
//             save++
//         }
//     } else if (levelUp.x < personnage.x) {
//         console.log("#B", personnage.x - levelUp.x <= 2, personnage.x, levelUp.x)
//         while ((personnage.x - levelUp.x) <= 2 && save < 100) {
//             levelUp.x = Math.round((Math.random() * 9) + 1)
//             console.log("#2")
//             save++
//         }
//     } else if (levelUp.x = personnage.x) {
//         console.log("#C", personnage.x - levelUp.x <= 2, personnage.x, levelUp.x)
//         while ((personnage.x - levelUp.x) <= 2 && save < 100) {
//             levelUp.x = Math.round((Math.random() * 9) + 1)
//             console.log("#3")
//             save++
//         }

//     } else {
//         console.log(levelUp.x)
//         console.log(personnage.x)
//         console.error(error)
//     }

//     if (levelUp.y > personnage.y) {
//         console.log("#D", levelUp.y - personnage.y <= 2, personnage.y, levelUp.y)
//         while ((levelUp.y - personnage.y) <= 2 && save < 100) {
//             levelUp.y = Math.round((Math.random() * 9) + 1)
//             console.log("#4")
//             save++
//         }
//     } else if (levelUp.y < personnage.y) {
//         console.log("#E", personnage.y - levelUp.y <= 2, personnage.y, levelUp.y)
//         while ((personnage.y - levelUp.y) <= 2 && save < 100) {
//             levelUp.y = Math.round((Math.random() * 9) + 1)
//             console.log("#5")
//             save++
//         }
//     } else if (levelUp.y = personnage.y) {
//         console.log("#F", personnage.y - levelUp.y <= 2, personnage.y, levelUp.y)
//         while ((personnage.y = levelUp.y) && save < 100) {
//             levelUp.y = Math.round((Math.random() * 9) + 1)
//             console.log("#6")
//             save++
//         }
//     } else {
//         console.log(levelUp.y)
//         console.log(personnage.y)
//         console.error(error)
//     }
//     $("#" + levelUp.x + "-" + levelUp.y).append(potion)
// }