// class constuctor
class Cricketer {
    constructor(name, role) {
        this.name = name;
        this.role = role;
        this.matchesPlayed  = 0;
        this.stamina = 100;
    }

    introduce() {
        return `${this.name} the ${this.role} | Matches Played: ${this.matchesPlayed} | Stamina: ${this.stamina} `;
    }
    // behind the scene ==> Cricketer.__proto_.introduce = function() {}
    // Above is a method. Is method ko har ek object ke sath share kiya jayega. Is method ko prototype me store kiya jayega(Cricket.__proto__). To memory efficient hoga. Agar hum is method ko constructor ke andar define karte to har ek object ke sath ek naya copy create hota. Jo ki memory waste karta.
}

const player1 = new Cricketer("Virat", "Batsman");
const player2 = new Cricketer("Bumrah", "Bowler");
console.log(player1.introduce());
console.log(player2.introduce());

console.log(player1.hasOwnProperty("name")); // true
console.log(typeof Cricketer);  // function   (this is interview gotcha)


class debutant {
    constructor(name) {
        this.name = name;
        this.walkOut = () => `${this.name} walks out to bat for the first time`
        // this.walkOut = function () {
        //     return `${this.name} walks out to bat for the first time`
        // }
    }
}

const debutant1 = new debutant("Rohit");
const somethingFromLastClass = debutant1.walkOut

console.log(somethingFromLastClass());

const debutant2 = new debutant("Sachin");
console.log(debutant1.walkOut === debutant2.walkOut);  // false