export interface Action {
    description: string;
    isAoe?: boolean;
    isOnSpecialCd?: boolean;
    isUsable: boolean;
    name: string;
    potency?: number;
    recast: number;
    cd: number;
}

export interface Skill extends Action {
    comboActions?: string[];
    comboPotency?: number;
    recastShared: boolean;
}

export interface Ability extends Action {
    currentCharges?: number;
    maxCharges: number;
    isVisible: boolean;
}

export interface Status {
    cd: number;
    description: string;
    duration: number;
    name: string;
    isDot: boolean;
    potency?: number;
}

export interface EnemyStatus {
    dot: Status;
    startTime: number;
    multSnapshot: number;
}

export interface KeyBind {
    isSet: boolean;
    shiftMod: boolean;
    ctrlMod: boolean;
    altMod: boolean;
    key: number;
    name: string;
}
