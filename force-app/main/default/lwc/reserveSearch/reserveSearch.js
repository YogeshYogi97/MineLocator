import { LightningElement, wire } from 'lwc';
import getElements from '@salesforce/apex/OreReserveFinder.getElements';

export default class ReserveSearch extends LightningElement {
    selectedElementType = 'All';
    error = undefined;
    searchOptions;
    
    @wire(getElements)
      getAvailableElements({ error, data }) {
      if (data) {
        console.log(data);
        this.searchOptions = data.map(({Id,Name}) => ({value : Id,label : Name
        }));
        console.log(this.searchOptions);
        this.searchOptions.unshift({ label: 'All Elements', value: 'All' });
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
    }
    

    handleSearchOptionChange(event) {
      this.selectedElementType = event.detail.value;
      const searchEvent = new CustomEvent('selected', { detail: this.selectedElementType });
      this.dispatchEvent(searchEvent);
    }
}