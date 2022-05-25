import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';
import { FileTemplateComponent } from './file-template/file-template.component';
import { ListFileTemplatesComponent } from './file-template/list-file-templates/list-file-templates.component';
import { NewFileTemplatesComponent } from './file-template/new-file-templates/new-file-templates.component';
import { HolidayConfigurationComponent } from './holiday-configuration/holiday-configuration.component';
import { ListHolidaysComponent } from './holiday-configuration/list-holidays/list-holidays.component';

const routes: Routes = [
  {
    path: '', component: ConfigurationsComponent,
    children: [
      {
        path: '',
        redirectTo: 'file-template-configuration',
        pathMatch: 'full'
      },
      {
        path: 'holiday-configuration',
        component: HolidayConfigurationComponent,
        children: [
          { path: '', redirectTo: 'list' },
          { path: 'list', component: ListHolidaysComponent },
        ]
      },
      {
        path: 'file-template-configuration',
        component: FileTemplateComponent,
        children: [
          { path: '', redirectTo: 'list' },
          { path: 'list', component: ListFileTemplatesComponent },
          { path: 'new', component: NewFileTemplatesComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
