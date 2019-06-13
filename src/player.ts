import { Ability, EnemyStatus, Skill, Status } from './classlogic/interfaces';
import { player } from './state';

export abstract class Player {
    public dps: number;
    public enemyNumber: number;
    public totalDamage: number;
    public totalTime: number;
    public damageMultiplier: number;
    public activeStatuses: Map<string, boolean> = new Map<string, boolean>(); // name, isActive
    public started: boolean;
    public gcd: number;
    public startTime: number;
    public currentTime: number;
    public queueTime: number;
    public timers = new Array();
    public nextSkill: string;
    public isAttacking: boolean;
    public isBuffing: boolean;
    public keyBindMode: boolean;
    public bindingAction: string;

    public skills: Map<string, Skill> = new Map<string, Skill>();
    public abilities: Map<string, Ability> = new Map<string, Ability>();
    public statuses: Map<string, Status> = new Map<string, Status>();
    public dots: Map<string, EnemyStatus> = new Map<string, EnemyStatus>();

    private nextCombo: string[] = [];
    private onGcd: boolean;

    constructor(skills: Skill[], abilities: Ability[], statuses: Status[]) {
        skills.forEach((element) => { this.skills.set(element.name, element); });
        abilities.forEach((element) => { this.abilities.set(element.name, element); });
        statuses.forEach((element) => { this.statuses.set(element.name, element); });

        this.totalDamage = 0;
        this.totalTime = 0;
        this.damageMultiplier = 1.0;
        this.onGcd = false;
        this.enemyNumber = 1;
        this.started = false;
        this.dps = 0;
        this.gcd = 2.4;
        this.nextSkill = '';
        this.queueTime = 0;
        this.isAttacking = false;
        this.isBuffing = false;
        this.keyBindMode = false;
        this.bindingAction = '';

        statuses.forEach((element) => {
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
    }

    public applyDot(dotName: string) {
        this.dots.get(dotName).startTime = Date.now();
        this.dots.get(dotName).multSnapshot = this.damageMultiplier;
    }

    public getNextCombo(): string[] {
        return this.nextCombo;
    }

    public setNextCombo(nextCombo: string[]) {
        this.nextCombo = nextCombo;
    }

    public isOnGcd(): boolean {
        return this.onGcd;
    }

    public startGcd() {
        this.onGcd = true;
        setTimeout(() => {
            this.onGcd = false;
        }, 2400);
    }

    public executePotency(amount: number) {
        this.totalDamage += amount * this.damageMultiplier;
        console.log(amount);
    }

    public abstract executeAction(actionName: string): boolean;
    public abstract getJobStacks(): number;
    public abstract startRotation();
    public abstract stopRotation();
    public abstract actionUsable(actionName: string): boolean;
}

// interface NextSkill {
//     name: string;
// }
