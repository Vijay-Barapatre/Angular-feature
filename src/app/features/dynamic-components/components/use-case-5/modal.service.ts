import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable, Type } from '@angular/core';
import { DynamicModalComponent } from './modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modalRef: ComponentRef<DynamicModalComponent> | null = null;
    private contentRef: ComponentRef<any> | null = null;

    constructor(
        private appRef: ApplicationRef,
        private injector: EnvironmentInjector
    ) { }

    open<T>(contentComponent: Type<T>, data?: any) {
        // 1. If a modal is already open, close it first
        this.close();

        // 2. Create the Modal Shell (The backdrop and container)
        // We use createComponent which is a standalone API in Angular 14+
        this.modalRef = createComponent(DynamicModalComponent, {
            environmentInjector: this.injector
        });

        // 3. Create the Content Component (The user's component)
        this.contentRef = createComponent(contentComponent, {
            environmentInjector: this.injector
        });

        // 4. Pass data to the content component (simulating Inputs)
        if (data && this.contentRef.instance) {
            Object.assign(this.contentRef.instance, data);
        }

        // 5. Project the content into the modal
        // This is the tricky part. DynamicModalComponent uses <ng-content>, but programmatically projecting nodes is hard.
        // simpler approach for this demo: Append content's DOM node to Modal's DOM node manually.
        // A more advanced way uses projectableNodes in createComponent options.

        // Improved Approach: Projectable Nodes
        // We recreate the modalRef, passing the content's root nodes as projectable nodes
        this.modalRef.destroy(); // Destroy the empty shell we made above

        this.modalRef = createComponent(DynamicModalComponent, {
            environmentInjector: this.injector,
            projectableNodes: [[this.contentRef.location.nativeElement]] // This maps to <ng-content>
        });


        // 6. Attach to the Application (for Change Detection)
        this.appRef.attachView(this.contentRef.hostView);
        this.appRef.attachView(this.modalRef.hostView);

        // 7. Append to DOM (Body)
        document.body.appendChild(this.modalRef.location.nativeElement);

        // 8. Handle Close
        this.modalRef.instance.closeEvent.subscribe(() => this.close());
    }

    close() {
        if (this.modalRef) {
            this.appRef.detachView(this.modalRef.hostView);
            this.modalRef.destroy();
            this.modalRef = null;
        }

        if (this.contentRef) {
            this.appRef.detachView(this.contentRef.hostView);
            this.contentRef.destroy();
            this.contentRef = null;
        }
    }
}
