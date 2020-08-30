new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },

    // normal Attack for each player
    attack() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
				text : `The player had damaged monster by ${damage}`
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
      this.checkWin();

    },
        // special Attack for just human user with more power
        specialAttack() {
			    var damage = this.calculateDamage(10, 20);
          this.monsterHealth -= damage ;
          this.turns.unshift({
            isPlayer: true,
            text : `The player had damaged monster by ${damage}`
          });
          if (this.checkWin()) {
            return;
          }
          this.monsterAttacks();
          this.checkWin();
        },
        // healing human
        heal() {
          if (this.playerHealth <= 90) {
            this.playerHealth += 10;
            this.turns.unshift({
              isPlayer: true,
              text : `The player had healed by 10`
          })
            this.monsterAttacks();
          } else {
            this.playerHealth = 100;
          }
        },
        givUp() {
          this.gameIsRunning = false;
        },
        calculateDamage(min, max) {
          return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
          if (this.playerHealth <= 0) {
            this.playerHealth = 0;
            alert("You lost!");
            this.gameIsRunning = false;
          } else if (this.monsterHealth <= 0) {
            this.monsterHealth = 0;
            alert("You won!");
            this.gameIsRunning = false;
          }
        },
        monsterAttacks() {
          var damage = this.calculateDamage(5, 12);
          this.playerHealth -= damage;
          console.log(this.turns)
    
          this.turns.unshift({
            isPlayer: false,
            text : `The monster had damaged player by ${damage}`

        })}
      
	

  }, //end Methods
});
