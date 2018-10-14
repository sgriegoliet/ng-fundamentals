import { InjectionToken } from '@angular/core'

export let JQUERY_TOKEN = new InjectionToken<IBrowserUIService>('jquery');

export interface IBrowserUIService {

}


export class BrowserUIService implements IBrowserUIService{

}