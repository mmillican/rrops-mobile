import { Engine, Car, RosterItem } from "../roster/rosterItem";


export class Manifest {
    name: string;
    description: string;

    manifestLocations: ManifestLocation[] = [];

    constructor(name: string) {
        this.name = name;
    }
}

export class ManifestLocation {
    id: string;

    name: string;
    comment: string;

    departureTime: string;

    trainDirection: number;

    length: number;
    weight: number;

    addCars: RosterItemMove<Car>[];
    removeCars: RosterItemMove<Car>[];

    addEngines: RosterItemMove<Engine>[];
    removeEngines: RosterItemMove<Engine>[];

    // totalCount: number;
    // loadCount: number;
    // emptyCount: number;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

// TODO: Restrict T to RosterItem?
export class RosterItemMove<T extends RosterItem> {
    item: T;

    location: LocationTrack;
    destination: LocationTrack;
}

export class LocationTrack {
    locationId: string;
    locationName: string;

    trackId: string;
    trackName: string;
}