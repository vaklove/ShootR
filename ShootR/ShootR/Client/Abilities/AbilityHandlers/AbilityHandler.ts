/// <reference path="../Abstractions/Ability.ts" />

class AbilityHandler {
    private _abilityList: { [s: string]: Ability; } = {};

    constructor (aList: Ability[]) {
        for (var i = aList.length - 1; i >= 0; i--) {
            this._abilityList[aList[i].Name] = aList[i];
        }
    }

    public Abilities(): { [s: string]: Ability; } {
        return this._abilityList;
    }

    public Ability(abilityName: string): Ability {
        return this._abilityList[abilityName];
    }

    public AddAbility(ability: Ability): void {
        this._abilityList[ability.Name] = ability;
    }

    public Activate(abilityName: string): bool {
        if (this._abilityList[abilityName] && !this._abilityList[abilityName].Active) {
            this._abilityList[abilityName].Activate();
            return true;
        }
        return false;
    }

    public Deactivate(abilityName: string): bool {
        if (this._abilityList[abilityName] && this._abilityList[abilityName].Active) {
            this._abilityList[abilityName].Deactivate();
            return true;
        }
        return false;
    }

    public UpdateAbilities(aList: any): void {
        for (var abilityName in aList) {
            var dataActive = aList[abilityName],
                myActive = this._abilityList[abilityName].Active;

            if (dataActive && !myActive) {
                this.Activate(abilityName);
            }
            else if (!dataActive && myActive) {
                this.Deactivate(abilityName);
            }
        }
    }

    public Update(now: Date): void {
        for (var key in this._abilityList) {
            this._abilityList[key].Update(now);
        }
    }
}