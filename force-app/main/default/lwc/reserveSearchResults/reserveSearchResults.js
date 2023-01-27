import { api, LightningElement, wire } from 'lwc';
import getAllMines from '@salesforce/apex/OreReserveFinder.getAllMines';
import { publish, MessageContext } from 'lightning/messageService';
import reservesChannel from '@salesforce/messageChannel/ReservesChannel__c';
export default class ReserveSearchResults extends LightningElement {

    minesSearchResults;
    selectedMineId;
    selectedMineLatitude;
    selectedMineLongitude;

    @api
    recordId;

    @wire(MessageContext)
    messageContext;

    @wire(getAllMines, { recordId: '$recordId'})
      getAvailableElements({ error, data }) {
      if (data) {  
        this.minesSearchResults = data;
      } else if (error) {
        this.minesSearchResults = undefined;
      }
    }

    connectedCallback() {
      this.populateMineSearchResults();
    }

    populateMineSearchResults(){
      getAllMines({recordId: 'All'})
      .then((result) => {
        this.minesSearchResults = result;
      })
      .catch((error) => {
        this.minesSearchResults = undefined;
      });
    }

    updateSelectedTile(event) { 
        this.selectedMineId = event.detail.Id;
        this.selectedMineLatitude = event.detail.Latitude;
        this.selectedMineLongitude = event.detail.Longitude;
        this.publishMineIdToChannel();
    }

    publishMineIdToChannel(){
      const payload = { recordId: this.selectedMineId, latitude: this.selectedMineLatitude, longitude: this.selectedMineLongitude };
      publish(this.messageContext, reservesChannel, payload);
    }
}