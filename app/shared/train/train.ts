export class Train {
    id: string;

    name: string;
    description: string;
    comment: string;

    departureTime: string;

    routeId: string;
    routeName: string;

    currentLocationId: string;
    currentLocation: string;

    departLocationName: string;
    terminateLocationName: string;

    status: string;
    statusCode: number;

    length: number;
    weight: number;

    leadEngine: string;

    locations: any;

    get trainStatus():string {
        switch(this.statusCode){
            case 128:
                return 'Terminated'
            case 20:
                return 'Built';
            default:
                return 'Ready';
        }
    }

    getTrainStatusClass(appendClass: string): string {
        var cssClass = '';
        switch(this.trainStatus.toLowerCase()) {
            case 'terminated':
                cssClass = 'train-status-term';
                break;
            case 'built':
                cssClass = 'train-status-built';
                break;
            default:
                cssClass = '';
                break;
        }

        if (appendClass){
            cssClass = appendClass + ' ' + cssClass;
        }

        return cssClass;
    }

    getLocationNames():string {
        let locationNames = [];
        if (!this.locations || this.locations.length === 0) {
            return '';
        }
        
        this.locations.forEach(loc => {
            locationNames.push(loc.name);
        });

        var result = locationNames.join(', ');
        return result;
    }
}