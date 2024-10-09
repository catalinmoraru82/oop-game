
class Character {
  constructor(health, strength, defence, speed, luck) {
    this.health = health;
    this.strength = strength;
    this.defence = defence;
    this.speed = speed;
    this.luck = luck;
  }

  attack()
  {}
}

//Implement Liskov Principle
// class CharacterWithSpecialAbilities extends Character
// {
// }

// class CharacterWithOutSpecialAbilities extends Character
// {
// }

class Hero extends Character {
}

class Beast extends Character {
}

class Game {
  start(attacker, defender) {
    const damage = attacker.strength - defender.defence;
    console.log("-----------------");
    console.log("Game has started");
    while (attacker.health > 0 && defender.health > 0) {
      console.log(`${attacker.constructor.name} attacks and deals ${damage} damage`);
      defender.health -= damage;
      if (defender.health < 0) {
        console.log(`${defender.constructor.name} has lost the battle`);
        console.log(`!!! ${attacker.constructor.name} is the winner !!!`);
        break;
      }
      console.log(`${defender.constructor.name} has ${defender.health} health remaining.`);
      [attacker, defender] = SwitchPlayers.switch([attacker, defender]) //I don't switch the actual players
    }
  }
}

class SwitchPlayers {
  static switch(playerList) {
    console.log("Switching players...");
    const [p1, p2] = playerList;
    console.log(`The attacker is ${p2.constructor.name}`);
    console.log(`The defender is ${p1.constructor.name}`);
    return [p2, p1];
  }
}

//static utility classes
class Stats {
  constructor() {
    throw new Error("GenerateStats class cannot be instantiated")
  }

  static health(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static strength(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static defence(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static speed(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static luck(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

//utility class to switch players, attacker becomes defender and defender becomes attacker



class StartingPlayer {
  constructor(playerList) {
    this.playerList = playerList;
  }

  startingPlayer() {
    //reduce method: https://www.thepoorcoder.com/filter-biggest-value-javascript-object
    return this.playerList.reduce((p1, p2) => {
      return p1.speed > p2.speed ? {attacker: p1, defender: p2} : {attacker: p2, defender: p1}
    })
  }
}

//class used to log players and stats
class Log {
  constructor() {
    throw new Error(`Class ${this.constructor.name} cannot be instantiated.`)
  }

  static players(playerList) {
    console.log(
      `Our players are:`
    )

    for (const player of playerList) {
      console.log(player)
    }
  }

  static attacker(attacker) {
    console.log(`The attacker is the ${attacker.constructor.name}`)
  }

  static defender(defender) {
    console.log(`The defender is the ${defender.constructor.name}`)
  }
}

const hero = new Hero(
  Stats.health(70, 100),
  Stats.strength(70, 80),
  Stats.defence(45, 55),
  Stats.speed(40, 50),
  Stats.luck(0.10, 0.30)
)


const beast = new Beast(
  Stats.health(60, 90),
  Stats.strength(60, 90),
  Stats.defence(40, 60),
  Stats.speed(40, 60),
  Stats.luck(0.25, 0.40)
)

Log.players([hero, beast]);
const sPlayer = new StartingPlayer([hero, beast])
const attacker = sPlayer.startingPlayer().attacker;
const defender = sPlayer.startingPlayer().defender;
Log.attacker(attacker);
Log.defender(defender);
const game = new Game();
game.start(attacker, defender)