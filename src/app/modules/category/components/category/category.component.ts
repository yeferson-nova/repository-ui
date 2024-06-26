import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryElement } from './category-interface';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  private categoryServices = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getCategoriesStatus(true);
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'actions'];

  dataSource = new MatTableDataSource<CategoryElement>();

  getCategoriesStatus(status: boolean): void {
    this.categoryServices.getCategoriesStatus(status).subscribe(
      (data: any) => {
        this.processCategoriesResponse(data);
      },
      (error: any) => {
        console.log("error: ", error);
      }
    );
  }

  processCategoriesResponse(resp: any) {
    const dataCategory: CategoryElement[] = [];
    if (resp && resp.length > 0) {
      resp.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }
  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Categoria Agregada", "Exitosa");
        this.getCategoriesStatus(true);
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar la categoria ", "Error")
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}


