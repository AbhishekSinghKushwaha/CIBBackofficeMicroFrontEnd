import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PROVIDER_ICONS, SVG_ICONS } from '../../contansts/custom-icon-list';

@Injectable({
  providedIn: 'root'
})
export class CustomIconsService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  init(): void {
    SVG_ICONS.forEach((icon: string) => {
      const iconName = icon.replace('.svg', '');
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/images/icons/${icon}`
        )
      );
    });

    PROVIDER_ICONS.forEach(icon => {
      const iconName = icon.replace('.svg', '');
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/images/logos/provider/${icon}`
        )
      );
    });
  }
}
