
const Artillery = "Artillery";
const Cavalry = "Cavalry";
const Infantry = "Infantry";

COST_TROOP = {
	'Infantry': 1, 'Cavalry': 3, 'Artillery': 5
};

// attackStrengthMatrix[type1][type2] = 
// The number of units of type2 that 1 unit of type 1 can kill
// Currently it is a symmetric matrix

const artilleryKillsCavalry = 2.0;
const artilleryKillsInfantry = 3.0;
const cavalryKillsInfantry = 2.0;
const attackStrengthMatrix = {
	Artillery: {
		Artillery: 1.0, 						  Cavalry: artilleryKillsCavalry,       Infantry: artilleryKillsInfantry
	},
	Cavalry: {
		Artillery: 1.0001/artilleryKillsCavalry,  Cavalry: 1.0,                         Infantry: cavalryKillsInfantry
	},
	Infantry: {
		Artillery: 1.0001/artilleryKillsInfantry, Cavalry: 1.0001/cavalryKillsInfantry, Infantry: 1.0
	}
}


internal_do_attack = (attack_from_territory, attack_to_territory) => {

	const choices = ["Artillery", "Cavalry", "Infantry"];

	for(attack_unit_choice of choices) {
		for(defend_unit_choice of choices) {

			let attacking_units = attack_from_territory[attack_unit_choice];
			let defending_units = attack_to_territory[defend_unit_choice];

			if(attacking_units === 0) continue;

			let defenseStrength = attackStrengthMatrix[defend_unit_choice][attack_unit_choice];
			let attackStrength = attackStrengthMatrix[attack_unit_choice][defend_unit_choice];
			let attackUnitsLeft = Math.max(0, attacking_units - (defending_units * defenseStrength));
			let victimUnitsLeft = Math.max(0, defending_units - (attacking_units * attackStrength));
			let attackResult = attackUnitsLeft > 0;

			// If attackStrengthMatrix[A][B] * attackStrengthMatrix[B][A] >= 1,
			// one of the armies is guaranteed to die completely
			// In our case the attackStrengthMatrix is deliberately defined to make this happen
			// transposed elements  of this matrix multplied together will always >= 1
			
			if(attack_from_territory.totalNumerOfMilitaryUnits() > 1.0) {
				// If this is not last bit of attack, modify the army counts
				attack_from_territory[attack_unit_choice] = 
					(attackUnitsLeft - Math.floor(attackUnitsLeft) > 0.4) 
						? Math.ceil(attackUnitsLeft) 
						: Math.floor(attackUnitsLeft);
				attack_to_territory[defend_unit_choice] = 
					(victimUnitsLeft - Math.floor(victimUnitsLeft) > 0.4) 
						? Math.ceil(victimUnitsLeft) 
						: Math.floor(victimUnitsLeft);victimUnitsLeft;
			}

			if(attackResult) {
				// Defending army has become zero
				// Continue to next defending choice of army
				continue;
			} else {
				// attacking army has become zero
				// Break to next attacking choice of army
				break;
			}
			
		}
	}

	let totalAttackingMilitaryLeft = attack_from_territory.totalNumerOfMilitaryUnits();
	let totalDefendingMilitaryLeft = attack_to_territory.totalNumerOfMilitaryUnits();

	if(totalAttackingMilitaryLeft > 1 && totalDefendingMilitaryLeft < 0.5) {
		// Attack was success
		return true;
	} else {
		// Attack was either failed, or not enough military was left to occupy both territories
		return false;
	}
}


// Returns Message to be displayed don HUD
resolveAttack = (attacker, victim) => {

	// Make calculations attack
	assert(attacker.Infantry >= 0, true, 'attacker.Infantry should be positive');
	assert(attacker.Cavalry >= 0, true, 'attacker.Cavalry should be positive');
	assert(attacker.Artillery >= 0, true, 'attacker.Artillery should be positive');
	assert(victim.Infantry >= 0, true, 'victim.Infantry should be positive');
	assert(victim.Cavalry >= 0, true, 'victim.Cavalry should be positive');
	assert(victim.Artillery >= 0, true, 'victim.Artillery should be positive');

	const defending_gold = victim.Infantry * COST_TROOP["Infantry"] 
		+ victim.Cavalry * COST_TROOP["Cavalry"]
		+ victim.Artillery * COST_TROOP["Artillery"];

	// Resolve Attack
	let attackSuccessFlag = internal_do_attack(attacker, victim);

	// Change Zone properties for victim and attacker
	if(attackSuccessFlag) {
		victim.master.changeNumZonesOwnedBy(- 1);
		attacker.master.changeNumZonesOwnedBy(+ 1);
		victim.master = attacker.master;
		
		// Weakest 1 unit stays behind, every other unit moves forward
		if(attacker.Infantry >= 1) {
			victim.Infantry = attacker.Infantry - 1;
			victim.Cavalry = attacker.Cavalry;
			victim.Artillery = attacker.Artillery;
			attacker.Infantry = attacker.Infantry - victim.Infantry;
			attacker.Cavalry = 0;
			attacker.Artillery = 0;
		} else if (attacker.Cavalry > 1) {
			victim.Cavalry = attacker.Cavalry - 1;
			victim.Artillery = attacker.Artillery;
			attacker.Cavalry = attacker.Cavalry - victim.Cavalry;
			attacker.Artillery = 0;
		} else if (attacker.Artillery > 1) {
			victim.Artillery = attacker.Artillery - 1;
			attacker.Artillery = attacker.Artillery - victim.Artillery;
		} else {
			console.log(attacker);
			console.log(victim);
			throw Error();
		}

		// Add gold to winner's stock pile
		attacker.master.addGold( Math.max(1, Math.round(defending_gold/2.0)) );
	
	} else {
		// Attack failed, nothing happened
		return `Attack failed`
	}


	// Return Message
	return `Your Attack from ${attacker.name} to ${victim.name} with was a success!`;
}