import { Job } from '../../job';
import { Ability, EnemyStatus, Skill, Status } from '../interfaces';
import { gunbreakerActionNames, gunbreakerDotNames, gunbreakerStatusNames } from './enums';

export class Gunbreaker extends Job {
    public powder: number;

    constructor(skills: Skill[], abilities: Ability[], statuses: Status[]) {
        super(skills, abilities, statuses);
        this.powder = 0;
    }

    // handles changes to the powder gauge and usability of skills that require powder
    public powderGauge(amount: number) {
        this.powder += amount;
        if (this.powder > 2) {
            this.powder = 2;
        } else if (this.powder < 0) {
            this.powder = 0;
        }
    }

    public getJobStacks(): number {
        return this.powder;
    }

    // checks to see if an action is executable, then executes it if possible
    public executeAction(actionName: string): boolean {
        if (this.actionUsable(actionName)) {
            switch (actionName) {
                case gunbreakerActionNames.KEEN_EDGE:
                    this.setNextCombo(this.skills.get(actionName).comboActions);
                    this.executePotency(this.skills.get(actionName).potency);
                    break;
                case gunbreakerActionNames.BRUTAL_SHELL:
                    if (this.getNextCombo().includes(actionName)) {
                        this.setNextCombo(this.skills.get(actionName).comboActions);
                        this.executePotency(this.skills.get(actionName).comboPotency);
                    } else {
                        this.executePotency(this.skills.get(actionName).potency);
                    }
                    break;
                case gunbreakerActionNames.SOLID_BARREL:
                    if (this.getNextCombo().includes(actionName)) {
                        this.setNextCombo([]);
                        this.executePotency(this.skills.get(actionName).comboPotency);
                        this.powderGauge(1);
                    } else {
                        this.executePotency(this.skills.get(actionName).potency);
                    }
                    break;
                case gunbreakerActionNames.GNASHING_FANG:
                    this.setNextCombo(this.skills.get(actionName).comboActions);
                    this.powderGauge(-1);
                    this.executePotency(this.skills.get(actionName).potency);
                    this.setStatus(gunbreakerStatusNames.READY_TO_RIP);
                    break;
                case gunbreakerActionNames.SAVAGE_CLAW:
                    if (this.getNextCombo().includes(actionName)) {
                        this.setNextCombo(this.skills.get(actionName).comboActions);
                        this.executePotency(this.skills.get(actionName).potency);
                        this.setStatus(gunbreakerStatusNames.READY_TO_TEAR);
                    } else {
                        this.executePotency(this.skills.get(actionName).potency);
                    }
                    break;
                case gunbreakerActionNames.WICKED_TALON:
                    if (this.getNextCombo().includes(actionName)) {
                        this.setNextCombo([]);
                        this.executePotency(this.skills.get(actionName).potency);
                        this.setStatus(gunbreakerStatusNames.READY_TO_GOUGE);
                    } else {
                        this.executePotency(this.skills.get(actionName).potency);
                    }
                    break;
                case gunbreakerActionNames.BURST_STRIKE:
                    this.executePotency(this.skills.get(actionName).potency);
                    this.powderGauge(-1);
                    this.setNextCombo([]);
                    break;
                case gunbreakerActionNames.DEMON_SLICE:
                    this.setNextCombo(this.skills.get(actionName).comboActions);
                    this.executePotency((this.skills.get(actionName).potency) * this.enemyNumber);
                    break;
                case gunbreakerActionNames.DEMON_SLAUGHTER:
                    if (this.getNextCombo().includes(actionName)) {
                        this.setNextCombo([]);
                        this.executePotency((this.skills.get(actionName).comboPotency) * this.enemyNumber);
                        this.powderGauge(1);
                    } else {
                        this.executePotency((this.skills.get(actionName).potency) * this.enemyNumber);
                    }
                    break;
                case gunbreakerActionNames.LIGHTNING_SHOT:
                    this.executePotency(this.skills.get(actionName).potency);
                    this.setNextCombo([]);
                    break;
                case gunbreakerActionNames.SONIC_BREAK:
                    this.executePotency(this.skills.get(actionName).potency);
                    this.setDot(gunbreakerDotNames.SONIC_BREAK);
                    this.setNextCombo([]);
                    break;
                case gunbreakerActionNames.FATED_CIRCLE:
                    this.executePotency((this.skills.get(actionName).potency) * this.enemyNumber);
                    this.powderGauge(-1);
                    this.setNextCombo([]);
                    break;
                case gunbreakerActionNames.NO_MERCY:
                    this.setStatus(gunbreakerStatusNames.NO_MERCY);
                    break;
                case gunbreakerActionNames.ROUGH_DIVIDE:
                    this.executePotency(this.abilities.get(actionName).potency);
                    break;
                case gunbreakerActionNames.BOW_SHOCK:
                    this.executePotency(this.abilities.get(actionName).potency);
                    this.setDot(gunbreakerDotNames.BOW_SHOCK);
                    break;
                case gunbreakerActionNames.BLOODFEST:
                    this.powderGauge(2);
                    break;
                case gunbreakerActionNames.BLASTING_ZONE:
                    this.executePotency(this.abilities.get(actionName).potency);
                    break;
                case gunbreakerActionNames.JUGULAR_RIP:
                    this.executePotency(this.abilities.get(actionName).potency);
                    this.activeStatuses.set(gunbreakerStatusNames.READY_TO_RIP, false);
                    actionName = gunbreakerActionNames.CONTINUATION;
                    break;
                case gunbreakerActionNames.ABDOMEN_TEAR:
                    this.executePotency(this.abilities.get(actionName).potency);
                    this.activeStatuses.set(gunbreakerStatusNames.READY_TO_TEAR, false);
                    actionName = gunbreakerActionNames.CONTINUATION;
                    break;
                case gunbreakerActionNames.EYE_GOUGE:
                    this.executePotency(this.abilities.get(actionName).potency);
                    this.activeStatuses.set(gunbreakerStatusNames.READY_TO_GOUGE, false);
                    actionName = gunbreakerActionNames.CONTINUATION;
                    break;
            }
            if (this.abilities.has(actionName)) {
                this.abilities.get(actionName).isOnSpecialCd = true;
                if (actionName === gunbreakerActionNames.CONTINUATION) {
                    this.isAttacking = true;
                    setTimeout(() => {
                        this.isAttacking = false;
                    }, 400);
                } else if (this.abilities.get(actionName).potency === undefined) {
                    this.isBuffing = true;
                    setTimeout(() => {
                        this.isBuffing = false;
                    }, 400);
                } else {
                    this.isAttacking = true;
                    setTimeout(() => {
                        this.isAttacking = false;
                    }, 400);
                }
            } else {
                this.skills.get(actionName).isOnSpecialCd = true;
                this.startGcd();
                this.isAttacking = true;
                setTimeout(() => {
                    this.isAttacking = false;
                }, 400);
            }
            return true;
        }
        return false;
    }

    public startRotation() {
        if (!this.started) {
            this.totalDamage = 0;
            this.started = true;
            this.startTime = Date.now();
            const addTimer = this.timers.length;
            this.timers[addTimer] = setInterval(() => {
                this.totalTime = Date.now() - this.startTime;
                this.dps = this.totalDamage / (this.totalTime / 1000);
                this.currentTime = Date.now();

                this.skills.forEach((skillElement) => {
                    if (!skillElement.isOnSpecialCd) {
                        if (this.isOnGcd()) {
                            skillElement.isUsable = false;
                            if (skillElement.cd > 2.4) {
                                skillElement.cd = 2.4;
                            }
                            skillElement.cd -= .1;
                        } else {
                            skillElement.isUsable = true;
                            skillElement.cd = skillElement.recast;
                        }
                    } else {
                        skillElement.cd -= .1;
                        if (!(skillElement.cd <= 0 || (skillElement.cd < 1 && (!this.isOnGcd())))) {
                            skillElement.isUsable = false;
                        }
                    }
                    if (skillElement.cd <= 0 || (skillElement.cd < 1 && (!this.isOnGcd()))) {
                        skillElement.isUsable = true;
                        skillElement.isOnSpecialCd = false;
                        skillElement.cd = skillElement.recast;
                    }
                });

                this.abilities.forEach((abilityElement) => {
                    if (!abilityElement.isOnSpecialCd) {
                        abilityElement.cd = abilityElement.recast;
                    } else {
                        if (abilityElement.cd <= 0) {
                            abilityElement.cd = abilityElement.recast;
                            abilityElement.isOnSpecialCd = false;
                            abilityElement.isUsable = true;
                        } else {
                            abilityElement.cd -= .1;
                            abilityElement.isUsable = false;
                        }
                    }
                });

                this.statuses.forEach((statusElement) => {
                    if (!statusElement.isDot) {
                        if (this.activeStatuses.get(statusElement.name)) {
                            statusElement.cd -= 100;
                        } else {
                            statusElement.cd = statusElement.duration;
                        }
                        if (statusElement.cd <= 0) {
                            statusElement.cd = statusElement.duration;
                        }
                    } else {
                        if (Date.now() - this.dots.get(statusElement.name).startTime > statusElement.duration) {
                            statusElement.cd = statusElement.duration;
                        } else {
                            statusElement.cd = statusElement.duration -
                            (Date.now() - this.dots.get(statusElement.name).startTime);
                        }
                    }
                })

                if (this.isOnGcd()) {
                    this.gcd -= .1;
                } else {
                    this.gcd = 2.4;
                }

                if (this.queueTime + 500 >= this.currentTime && this.actionUsable(this.nextSkill)) {
                    this.executeAction(this.nextSkill);
                    this.nextSkill = '';
                    this.queueTime = 0;
                }
            }, 100);
        }
    }

    public stopRotation() {
        if (this.started) {
            this.skills.forEach((skillElement) => {
                skillElement.cd = skillElement.recast;
                skillElement.isOnSpecialCd = false;
                skillElement.isUsable = true;
            });

            this.abilities.forEach((abilityElement) => {
                abilityElement.cd = abilityElement.recast;
                abilityElement.isOnSpecialCd = false;
                abilityElement.isUsable = true;
            });

            this.statuses.forEach((statusElement) => {
                statusElement.cd = statusElement.duration;
            });

            this.timers.forEach((timer) => {
                clearInterval(timer);
            });

            this.activeStatuses = new Map<string, boolean>();
            this.dots = new Map<string, EnemyStatus>();

            this.statuses.forEach((element) => {
                if (element.isDot) {
                    this.dots.set(element.name, {
                        dot: element,
                        multSnapshot: this.damageMultiplier,
                        startTime: Date.now() - element.duration,
                    });
                }
            });

            const dotTimer = this.timers.length;
            this.timers[dotTimer] = setInterval(() => {
                const values = Array.from(this.dots.values());
                values.forEach((element) => {
                    if (element.startTime + element.dot.duration > Date.now()) {
                        this.totalDamage += element.dot.potency * element.multSnapshot;
                    }
                });
            }, 3000);

            this.totalTime = 0;
            this.dps = 0;

            this.setNextCombo([]);
            this.powder = 0;

            this.started = false;
        }
    }

    // checks if action is usable
    public actionUsable(actionName: string): boolean {
        if (this.isBuffing || this.isAttacking) {
            return false;
        }
        if (this.skills.has(actionName)) {
            if (actionName === gunbreakerActionNames.GNASHING_FANG ||
                actionName === gunbreakerActionNames.FATED_CIRCLE ||
                actionName === gunbreakerActionNames.BURST_STRIKE) {
                if (this.powder <= 0) {
                    return false;
                }
            }
            if (this.isOnGcd()) {
                return false;
            }
            return this.skills.get(actionName).isUsable;
        } else if (this.abilities.has(actionName)) {
            if (this.abilities.get(actionName).currentCharges < 1) {
                return false;
            }
            return this.abilities.get(actionName).isUsable;
        }
        return false;
    }

    // sets status effects on the player
    private setStatus(statusName: gunbreakerStatusNames) {
        this.activeStatuses.set(statusName, true);
        if (statusName === gunbreakerStatusNames.READY_TO_RIP) {
            this.activeStatuses.set(gunbreakerStatusNames.READY_TO_TEAR, false);
            this.activeStatuses.set(gunbreakerStatusNames.READY_TO_GOUGE, false);
        } else if (statusName === gunbreakerStatusNames.READY_TO_TEAR) {
            this.activeStatuses.set(gunbreakerStatusNames.READY_TO_RIP, false);
            this.activeStatuses.set(gunbreakerStatusNames.READY_TO_GOUGE, false);
        } else if (statusName === gunbreakerStatusNames.READY_TO_GOUGE) {
            this.activeStatuses.set(gunbreakerStatusNames.READY_TO_TEAR, false);
            this.activeStatuses.set(gunbreakerStatusNames.READY_TO_RIP, false);
        } else if (statusName === gunbreakerStatusNames.NO_MERCY) {
            this.damageMultiplier = 1.2;
        }
        setTimeout(() => {
            this.activeStatuses.set(statusName, false);
            if (statusName === gunbreakerStatusNames.NO_MERCY) {
                this.damageMultiplier = 1.0;
            }
        }, this.statuses.get(statusName).duration);
    }

    // sets dots
    private setDot(statusName: gunbreakerDotNames) {
        if (this.statuses.get(statusName).isDot) {
            this.applyDot(statusName);
        }
    }

    // handles the continuation ability
    private continuationHandler(): boolean {
        if (this.activeStatuses.has(gunbreakerStatusNames.READY_TO_RIP)) {
            this.executePotency(this.abilities.get(gunbreakerActionNames.JUGULAR_RIP).potency);
            return true;
        } else if (this.activeStatuses.has(gunbreakerStatusNames.READY_TO_TEAR)) {
            this.executePotency(this.abilities.get(gunbreakerActionNames.ABDOMEN_TEAR).potency);
            return true;
        } else if (this.activeStatuses.has(gunbreakerStatusNames.READY_TO_GOUGE)) {
            this.executePotency(this.abilities.get(gunbreakerActionNames.EYE_GOUGE).potency);
            return true;
        }
    }
}
