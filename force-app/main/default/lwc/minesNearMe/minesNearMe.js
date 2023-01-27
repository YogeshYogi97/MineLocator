import { LightningElement } from 'lwc';
import getNearByMines from '@salesforce/apex/OreReserveFinder.getNearByMines';

export default class MinesNearMe extends LightningElement {

    mapMarkers;

    connectedCallback(){
        this.getLocationFromBrowser();
    }

    getLocationFromBrowser() {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            this.getNearByMines(position.coords.latitude, position.coords.longitude);
        },
        (e) => {}, {
        enableHighAccuracy: true
        }
        );
    }

    getNearByMines(latitude, longitude){
        getNearByMines({lat: ''+latitude, lon: ''+longitude})
        .then((result) => {
          this.mapMarkers = result.map(({Id,Location__Latitude__s, Location__Longitude__s, Name, Ore__c, Ore__r}) => ({location : {Latitude:Location__Latitude__s, Longitude:Location__Longitude__s}, title:Name, description:Ore__r.Name}));
          this.mapMarkers.unshift({
            location: {
                Latitude: latitude,
                Longitude: longitude,
            },
            title: 'You are here!'
        });
        })
        .catch((error) => {
            console.log(error);
        });
    }
}