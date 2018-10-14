import { Injectable, InjectionToken, Inject } from '@angular/core'

export let TOASTR_TOKEN: InjectionToken<IClientNotificationService> = new InjectionToken<IClientNotificationService>('toastr');

export interface IClientNotificationService {
    success(message: string, title?: string);
    info(message: string, title?: string);
    warning(message: string, title?: string);
    error(message: string, title?: string);
}

@Injectable()
export class ClientNotificationService implements IClientNotificationService {
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