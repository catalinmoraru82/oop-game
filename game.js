
class Character {
  name;
  constructor(health, strength, defence, speed, luck) {
    this.health = health;
    this.strength = strength;
    this.defence = defence;
    this.speed = speed;
    this.luck = luck;
  }

  specialAbilities()
  {
    throw new Error("This method should be overrinden");
  }
}

//Liskov Principle
class CharacterWithSpecialAbilities extends Character
{
  name = "Hero";

  specialAbilities()
  {
    this.rapidStrike()
    this.magicShield()
  }
  
  rapidStrike()
  {
    console.log("This is a rapidStrike")
  }

  magicShield()
  {
    console.log("This is the masgic Shield")
  }
}

class CharacterWithOutSpecialAbilities extends Character
{
  name = "Beast";
  specialAbilities()
  {
    throw new Error("This method should be overrinden");
  }
}

class Hero extends Character {
}

class Beast extends Character {
}

class SwitchPlayers {
  static switch(playerList) {
    console.log("Switching players...");
    const [p1, p2] = playerList;
    console.log(`The attacker is ${p2.name}`);
    console.log(`The defender is ${p1.name}`);
    return [p2, p1];
  }
}

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
    throw new Error(`Class ${this.name} cannot be instantiated.`)
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
    console.log(`The attacker is the ${attacker.name}`)
  }

  static defender(defender) {
    console.log(`The defender is the ${defender.name}`)
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


class Game {
  start(attacker, defender) {
    const damage = attacker.strength - defender.defence;
    console.log("-----------------");
    console.log("Game has started");
    while (attacker.health > 0 && defender.health > 0) {
      console.log(`${attacker.name} attacks and deals ${damage} damage`);
      defender.health -= damage;
      if (defender.health < 0) {
        console.log(`${defender.name} has lost the battle`);
        console.log(`!!! ${attacker.name} is the winner !!!`);
        break;
      }
      console.log(`${defender.name} has ${defender.health} health remaining.`);
      [attacker, defender] = SwitchPlayers.switch([attacker, defender]) //I don't switch the actual players
    }
  }
}



const hero = new CharacterWithSpecialAbilities(
  Stats.health(70, 100),
  Stats.strength(70, 80),
  Stats.defence(45, 55),
  Stats.speed(40, 50),
  Stats.luck(0.10, 0.30)
)


const beast = new CharacterWithOutSpecialAbilities(
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