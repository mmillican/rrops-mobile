export class RosterItem {
    id: string;

    road: string;
    number: string;

    type: string;

    length: string;

    color: string;

    owner: string;

    comment: string;
}

export class Engine extends RosterItem {
    
    model: string;
    consist: string;
}

export class Car extends RosterItem {
    load: string;

    hazardous: boolean;
    utility: boolean;

    kernel: string;
}