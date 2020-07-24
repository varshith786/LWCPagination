import { LightningElement ,api} from 'lwc';

export default class PaginatorComponent extends LightningElement {

    @api previousDisabled = false;
    @api nextDisabled = false;
    previousHandler() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler() {
        this.dispatchEvent(new CustomEvent('next'));
    }

    lastHandler()
    {
        console.log('lastDispatch');
        this.dispatchEvent(new CustomEvent('last'));
    }

    firstHandler()
    {
        this.dispatchEvent(new CustomEvent('first'));
    }
}