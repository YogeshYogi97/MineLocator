import { LightningElement, wire } from 'lwc';

import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import reservesChannel from '@salesforce/messageChannel/ReservesChannel__c';

export default class MineDetails extends LightningElement {
    mineId;
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                reservesChannel,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    handleMessage(message) {
        this.mineId = message.recordId;
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}