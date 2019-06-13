import { gunbreakerAbilities, gunbreakerSkills, gunbreakerStatuses } from './classlogic/gunbreaker/action_data';
import { Gunbreaker } from './classlogic/gunbreaker/gunbreaker';
import { Ability, Skill, Status } from './classlogic/interfaces';
import { currentJob, Job, jobs } from './job';
import { Player } from './player';

export let player: Player = new Gunbreaker(gunbreakerSkills, gunbreakerAbilities, gunbreakerStatuses);

export function initialize() {
    // player.timers.forEach((element) => {
    //     clearInterval(element);
    // });


    player = new Gunbreaker(gunbreakerSkills, gunbreakerAbilities, gunbreakerStatuses);

    player.skills.forEach((element) => {
        element.cd = element.recast;
    });

    player.abilities.forEach((element) => {
        element.cd = element.recast;
    });
}
