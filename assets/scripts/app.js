const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20; 

let chosenMaxLife = 100;
let currentMonstearHealth = chosenMaxLife;
let currentPLayerHealth = chosenMaxLife;
let HasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function Reset(){
    currentMonstearHealth = chosenMaxLife;
    currentPLayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function AttackMonster(mode_attack){
    let maxDamage;
    if (mode_attack === 'ATTACK'){
        maxDamage =ATTACK_VALUE;
    } else if (mode_attack === 'STRONG_ATTACK'){
        maxDamage=STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonstearHealth -= damage;
    EndRound(maxDamage);
}

function EndRound (){
    const InitialPlayerHealth = currentPLayerHealth;
    const PlayerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentPLayerHealth -= PlayerDamage;

    if (currentPLayerHealth <= 0 && HasBonusLife){
        HasBonusLife = false;
        removeBonusLife();
        currentPLayerHealth = InitialPlayerHealth;
        alert('You would be dead but the bonus life saved you!');
        setPlayerHealth(InitialPlayerHealth);
    }

    if (currentMonstearHealth <= 0 && currentPLayerHealth > 0){
        alert('You won');
    } else if (currentPLayerHealth <= 0 && currentMonstearHealth > 0){
        alert('You lost');
    } else if (currentMonstearHealth <= 0 && currentPLayerHealth <= 0 ){
        alert('You have a draw')
    }

    if (currentMonstearHealth <= 0 || currentPLayerHealth <= 0){
        Reset();
    }
}

function AttackHandler(){
    AttackMonster ('ATTACK');
}

function Strong_AttackHandler(){
    AttackMonster ('STRONG_ATTACK');
}

function HealPLayerHandler(){
    let healValue
    if (currentPLayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert('You can not heal to more than your max initial health.');
        healValue = chosenMaxLife - currentPLayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth (HEAL_VALUE);
    currentPLayerHealth += HEAL_VALUE;
    EndRound();
}

attackBtn.addEventListener('click', AttackHandler);
strongAttackBtn.addEventListener('click', Strong_AttackHandler)
healBtn.addEventListener('click', HealPLayerHandler);