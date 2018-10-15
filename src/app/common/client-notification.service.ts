import { InjectionToken } from '@angular/core';

export let TOASTR_TOKEN: InjectionToken<IClientNotificationService> = new InjectionToken<IClientNotificationService>('toastr');

export interface IClientNotificationService {
    success(message: string, title?: string);
    info(message: string, title?: string);
    warning(message: string, title?: string);
    error(message: string, title?: string);
}

// pretend to be an interface
export class ClientNotificationService implements IClientNotificationService {
    success(message: string, title?: string) {
        throw new Error('Method not implemented.');
    }
    info(message: string, title?: string) {
        throw new Error('Method not implemented.');
    }
    warning(message: string, title?: string) {
        throw new Error('Method not implemented.');
    }
    error(message: string, title?: string) {
        throw new Error('Method not implemented.');
    }
}
