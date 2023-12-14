

// 1 Cavalry kills and dies to 2 Infantry
const InfantryKilledByCavalry = 2;
// 1 Artillery kills and dies to 3 Infantry
const InfantryKilledByArtillery = 3;
// 1 Artillery kills and dies to 2 Cavalry
const CavalryKilledByArtillery = 2;

class BattleResult {
	constructor(successFlag, attackUnitsLeft, victimUnitsLeft) {
		assert(typeof successFlag, "boolean", "Battle success flag should be boolean");
		assert(typeof attackUnitsLeft === 'number' && !isNaN(attackUnitsLeft), true, "Number of attacks unit left should be a number");
		assert(typeof victimUnitsLeft === 'number' && !isNaN(victimUnitsLeft), true, "Number of victim unit left should be a number");
		this.successFlag = successFlag;
		this.attackUnitsLeft = attackUnitsLeft;
		this.victimUnitsLeft = victimUnitsLeft;
	}
}

class BattleTripleResult {
	constructor(successFlag, attackUnitsLeft, victimInfantryLeft, victimCavalryLeft, victimArtilleryLeft) {
		assert(typeof successFlag, "boolean", "BattleTriple success flag should be boolean");
		assert(typeof attackUnitsLeft === 'number' && !isNaN(attackUnitsLeft), true, "Number of attacks unit left should be a number");
		assert(typeof victimInfantryLeft === 'number' && !isNaN(victimInfantryLeft), true, "Number of victim infantry left should be a number");
		assert(typeof victimCavalryLeft === 'number' && !isNaN(victimCavalryLeft), true, "Number of victim cavalry left should be a number");
		assert(typeof victimArtilleryLeft === 'number' && !isNaN(victimArtilleryLeft), true, "Number of victim artillery left should be a number");
		this.successFlag = successFlag;
		this.attackUnitsLeft = attackUnitsLeft;
		this.victimInfantryLeft = victimInfantryLeft;
		this.victimCavalryLeft = victimCavalryLeft;
		this.victimArtilleryLeft = victimArtilleryLeft;
	}
}

// Returns the result of a battle between any two kinds of units
// Attack strength is the number of attack_to units that are equal to attack_from units
// For example, if 1 artillery can beat 3 infantry, this function can be called like this:
// 		internal_do_attack_from(num_artillery, num_infantry, 3)
// In this case artillery is the attacking unit and the result return will determine whether 
// attacking units win or not
internal_do_attack_from = (attack_from, attack_to, attack_strength) => {

	if(attack_from * attack_strength > attack_to) {
		// attack is stronger
		attack_from = attack_from - Math.ceil(attack_to / attack_strength);
		attack_to = 0;
		return new BattleResult(true, attack_from, 0);

	} else if (attack_from * attack_strength === attack_to) {
		// Draw
		// Need 1 extra unit to occupy territory
		return new BattleResult(false, 1, 1 * attack_strength);
	} else {
		return new BattleResult(false, 0, attack_to - (attack_from * attack_strength));
	}
}

internal_do_attack_from_artillery = (attacking_artillery, victim_infantry, victim_cavalry, victim_artillery) => {


	// Artillery attacks first, followed by Cavalry, followed by Infantry
	if(attacking_artillery > 0) {

		let result = internal_do_attack_from(attacking_artillery, victim_artillery, 1);
		
		if(result.successFlag) {
			let result2 = internal_do_attack_from(result.attackUnitsLeft, victim_cavalry, CavalryKilledByArtillery);
			
			if(result2.successFlag) {
				let result3 = internal_do_attack_from(result2.attackUnitsLeft, victim_infantry, InfantryKilledByArtillery);

				if(result3.successFlag) {
					// Attack is overall success
					return new BattleTripleResult(true, result3.attackUnitsLeft, 0, 0, 0);
				}
			}
		}
	}


}


// Returns Message to be displayed don HUD
resolveAttack = (attacker, victim) => {

	// Make calculations attack
	const attacking_infantry = attacker.Infantry;
	const attacking_cavalry = attacker.Cavalry;
	const attacking_artillery = attacker.Artillery;

	const victim_infantry = victim.Infantry;
	const victim_cavalry = victim.Cavalry;
	const victim_artillery = victim.Artillery;
	
	assert(attacking_infantry >= 0, true, 'attacking_infantry should be positive');
	assert(attacking_cavalry >= 0, true, 'attacking_cavalry should be positive');
	assert(attacking_artillery >= 0, true, 'attacking_artillery should be positive');
	assert(victim_infantry >= 0, true, 'victim_infantry should be positive');
	assert(victim_cavalry >= 0, true, 'victim_cavalry should be positive');
	assert(victim_artillery >= 0, true, 'victim_artillery should be positive');

	const attacking_gold = attacking_infantry * COST_TROOP["Infantry"] 
		+ attacking_cavalry * COST_TROOP["Cavalry"]
		+ attacking_artillery * COST_TROOP["Artillery"];

	const defending_gold = victim_infantry * COST_TROOP["Infantry"] 
		+ victim_cavalry * COST_TROOP["Cavalry"]
		+ victim_artillery * COST_TROOP["Artillery"];

	const defense_budget_difference = attacking_gold - defending_gold;

	// Resolve Attack

	// Change Zone properties for victim and attacker



	// Return Message
	return `${attacker.master.color} attacked from ${attacker.name} to ${victim.name} with army constitution ` +
	`(${attacker.Infantry}, ${attacker.Cavalry}, ${attacker.Artillery})`;
}