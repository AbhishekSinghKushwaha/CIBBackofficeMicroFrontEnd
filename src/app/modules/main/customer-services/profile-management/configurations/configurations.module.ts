import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ConfigurationsComponent } from './configurations.component';
import { HolidayConfigurationComponent } from './holiday-configuration/holiday-configuration.component';
import { FileTemplateComponent } from './file-template/file-template.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ListFileTemplatesComponent } from './file-template/list-file-templates/list-file-templates.component';
import { NewFileTemplatesComponent } from './file-template/new-file-templates/new-file-templates.component';
import { SharedModalsModule } from 'src/app/shared/modals/shared-modals.module';
import { ConfirmationCompletionComponent } from 'src/app/shared/components/confirmation-completion/confirmation-completion.component';


@NgModule({
  declarations: [
    ConfigurationsComponent,
    HolidayConfigurationComponent,
    FileTemplateComponent,
    ListFileTemplatesComponent,
    NewFileTemplatesComponent,
    ConfirmationCompletionComponent,
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    MatStyleModule,
    SharedModalsModule,
  ],
})
export class ConfigurationsModule { }
