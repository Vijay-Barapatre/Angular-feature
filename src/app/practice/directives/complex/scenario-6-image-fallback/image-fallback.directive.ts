import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
    selector: 'img[appImageFallback]', // Note: specific to img tags
    standalone: true
})
export class ImageFallbackDirective {
    private el = inject(ElementRef);

    // TODO: Define an input for the custom fallback URL

    // TODO: Listen for the 'error' event
    // Hint: Use @HostListener
    onError() {
        // TODO: Logic to replace the src attribute with the fallback URL
    }
}
