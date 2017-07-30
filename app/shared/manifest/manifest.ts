import { Engine, Car, RosterItem } from "../roster/rosterItem";


export class Manifest {
    name: string;
    description: string;

    manifestLocations: ManifestLocation[] = [];

    constructor(name: string) {
        this.name = name;

        this.manifestLocations = [];
    }
}

export class ManifestLocation {
    id: string;

    name: string;
    description: string;

    departureTime: string;

    trainDirection: number;

    length: string;
    weight: number;

    setOuts: RosterItemMove<RosterItem>[] = [];
    pickUps: RosterItemMove<RosterItem>[] = [];

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

    // getSetOuts(): RosterItemMove<RosterItem>[] { 
    //     var setOuts = this.removeEngines.concat(this.removeCars);
    // }
}

// TODO: Restrict T to RosterItem?
export class RosterItemMove<T extends RosterItem> {
    item: T;

    location: LocationTrack;
    destination: LocationTrack;

    get itemDesc():string {
        if (!this.item){
            return '';
        }

        let desc = this.item.road + ' ' + this.item.number + ' ' + this.item.length + '\' ' + 
            this.item.color + ' ' + this.item.type;

        return desc;
    }
}

export class LocationTrack {
    locationId: string;
    locationName: string;

    trackId: string;
    trackName: string;
}