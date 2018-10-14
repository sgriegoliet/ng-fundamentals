import { Injectable, InjectionToken, Inject } from '@angular/core'

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
        throw new Error("Method not implemented.");
    } 
    info(message: string, title?: string) {
        throw new Error("Method not implemented.");
    }
    warning(message: string, title?: string) {
        throw new Error("Method not implemented.");
    }
    error(message: string, title?: string) {
        throw new Error("Method not implemented.");
    }
}

@Injectable()
export class ToasterNotificationService implements IClientNotificationService {
    constructor(@Inject(TOASTR_TOKEN) private toastr: IClientNotificationService) {
    }

    success(message: string, title?: string) {
        this.toastr.success(message, title);
    }

    info(message: string, title?: string) {
        this.toastr.info(message, title);
    }

    warning(message: string, title?: string) {
        this.toastr.warning(message, title);
    }

    error(message: string, title?: string) {
        this.toastr.error(message, title);
    }
}