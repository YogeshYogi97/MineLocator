import { LightningElement } from 'lwc';

export default class ReserveSearchForm extends LightningElement {
    selectedElement;

    updateSelectedElement(event){
        this.selectedElement = event.detail;
        console.log(this.selectedElement);
    }
}