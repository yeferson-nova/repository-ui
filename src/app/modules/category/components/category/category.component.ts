import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryElement } from './category-interface';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  private categoryServices = inject(CategoryService);

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
}

