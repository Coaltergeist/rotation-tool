import { Ability, Skill, Status } from './classlogic/interfaces';
import { Player } from './player';

export abstract class Job extends Player {

    constructor(skills: Skill[], abilities: Ability[], statuses: Status[]) {
        super(skills, abilities, statuses);
    }

    public getSkills(): Map<string, Skill> {
        return this.skills;
    }

    public getAbilities(): Map<string, Ability> {
        return this.abilities;
    }

    public getStatus(): Map<string, Status> {
        return this.statuses;
    }
}

export enum jobs {
    GUNBREAKER = 'Gunbreaker',
}

export const currentJob = jobs.GUNBREAKER;
