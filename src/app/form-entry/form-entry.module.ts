import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlService } from './form-factory/form-control.service';
import { ValidationFactory } from './form-factory/validation.factory';
import { FormBuilder } from '@angular/forms';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormRendererComponent],
  providers: [FormBuilder, FormControlService, ValidationFactory],
  exports: [FormRendererComponent]
})
export class FormEntryModule { }
