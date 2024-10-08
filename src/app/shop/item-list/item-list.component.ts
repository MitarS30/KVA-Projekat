import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/user.service';
import { Item, ShopService } from '../shop.service';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ItemCommentsComponent } from '../item-comments/item-comments.component';
import { ShopCartService } from '../shoping-cart/shopingCart.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit{
  constructor(private userService: UserService, private shopService: ShopService,private shopCartService: ShopCartService, public dialog: MatDialog) {
    this.items = ShopService.FinalItemList;
    console.log("listaaa");
    console.log(this.items);

    ShopService.itemListUpdated.subscribe(() => {
      this.items = ShopService.FinalItemList;
      this.getPagedItems(); // Refresh the paged items
    });
  }
  
  checkSize: any = [];
  pagedItems: Item[] = []; // Items to display on the current page
  pageSize = 5; // Default page size
  pageEvent!: PageEvent;

  ngOnInit(): void {
    ShopService.itemListUpdated.subscribe(() => {
      // ShopService.initializeItemList(this.userService);
    });
    this.getPagedItems();
  }

  PassCartData(item: Item) {
    if (this.userService.currentUser != undefined || this.userService.currentUser != null) {
      if (this.checkSize.length != 0) {
        if (this.checkSize[1].id == item.id) {
          this.shopCartService.updateCart(this.userService.currentUser, item, this.checkSize[0])
        }
      }
    }
  }

  initializeItemList(): void {
    ShopService.initializeItemList(this.userService);
  }

  items = ShopService.FinalItemList;
  selectedSizePrice: Array<any>= [null, null];

  getRating(item: Item): number{
    var sum: number;
    sum=0.00;
    item.ratings.forEach(ratingVal => {
      sum += ratingVal.review;
    });
    
    return sum / item.ratings.length;
  }

  formatToTwoDecimal(value: number): string {
    return value.toFixed(2);
  }

  updateSelectedSizePrice(event: MouseEvent, item: Item, size: string): void {
    this.checkSize = [size, item];
    const clickedElement = event.target as HTMLElement;
    const parentCardContent = clickedElement.closest('mat-card-content');
    
    if (parentCardContent) {
      const attrId = parentCardContent.getAttribute('id');
      const selectedPrice = item.prices.find(price => price.size === size)!;
      this.selectedSizePrice[0] = selectedPrice.price;
      this.selectedSizePrice[1] = attrId;
    }
  }

  getPagedItems(): void {
    const startIndex = this.pageEvent ? this.pageEvent.pageIndex * this.pageEvent.pageSize : 0;
    const endIndex = this.pageEvent ? startIndex + this.pageEvent.pageSize : this.pageSize;
    this.pagedItems = this.items.slice(startIndex, endIndex);
  }

  openComments(item: Item){
    const profileDialog = this.dialog.open(ItemCommentsComponent, {
      disableClose: true,
      width: '50vw',
      data: {item: item}
    });
  }
}
