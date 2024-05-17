import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';
import e from 'express';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})


export class NewCategoryComponent implements OnInit {

  estadoFormulario = "Agregar Categoria"
  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);



  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [false, Validators.required],
    })
    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar Categoria"
    }
  }

  onSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value,
      status: this.categoryForm.get('status')?.value
    }
    if (this.data != null) {
      //update registry
      this.categoryService.updateCategory(data, this.data.id).subscribe((data: any) => {
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      })
    } else {
      this.categoryService.saveCategory(data).subscribe(data => {
        this.dialogRef.close(1)
      }, (error: any) => {
        this.dialogRef.close(2)
      })
    }

  }
  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      status: [data.status, Validators.required],
    })
  }
}
