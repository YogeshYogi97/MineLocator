import { LightningElement, api } from 'lwc';

export default class MineTile extends LightningElement {

    @api mine;
    @api selectedMineId;
    @api latitude;
    @api longitude;
    
    get richtext(){
        return '<h2>'+ this.mine.Name +'</h2>'
    }
    
    // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() { 
        if(this.selectedMineId == this.mine.Id){
            return 'tile-wrapper selected';
        }
        return 'tile-wrapper';
    }
    
    // Fires event with the Id of the boat that has been selected.
    selectMine() { 
        
        const selectedEvent = new CustomEvent('selected', { detail:{ Id : this.mine.Id, Latitude : this.latitude, Longitude: this.longitude} });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
        console.log('Event Raised');

    }
}