import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Item, ShopService } from "../shop.service";
import { User, UserService } from "../../auth/user.service";


export interface ItemArrival {
    order: Cart;
    time: Date;
}

export interface CartItem {
    item: Item;
    size: string;
    price: number;
    quantity: number;
}

export interface Cart {
    id: number;
    user: User;
    list: CartItem[];
    state: string;
}

@Injectable()
export class ShopCartService implements OnInit{

    constructor(private shopService: ShopService, private userService: UserService) { 
        this.ItemArrivalListUpdated.emit(ShopCartService.itemArrivalList);
        console.log("ItemArrival list u shoping servisu "+ShopCartService.itemArrivalList);
    }

    ngOnInit(): void {
        console.log("ItemArrival list u shoping servisu "+ShopCartService.itemArrivalList);
    }

    cartListUpdated = new EventEmitter<Array<Cart>>();
    ItemArrivalListUpdated = new EventEmitter<Array<ItemArrival>>();
    ItemListUpdated = new EventEmitter<Array<Item>>();

    addToCartList(cart: Cart, time: Date): void {
        ShopCartService.cartList.push(cart);
        let item: ItemArrival = { order: cart, time: time};
        ShopCartService.itemArrivalList.push(item);
        this.ItemArrivalListUpdated.emit(ShopCartService.itemArrivalList);
        this.cartListUpdated.emit(ShopCartService.cartList);
        // console.log("lista glupa: " + this.itemArrivalList);
        setTimeout(() => {
            const index = ShopCartService.cartList.findIndex(c => c.id === cart.id && cart.state=="sending");
            if (index !== -1) {
                ShopCartService.cartList.splice(index, 1);
                cart.state="sent";
                ShopCartService.cartList.push(cart);
                this.cartListUpdated.emit(ShopCartService.cartList);
                this.ItemArrivalListUpdated.emit(ShopCartService.itemArrivalList);
                this.cartListUpdated.emit(ShopCartService.cartList);
            }
        }, 15000);
    }

    emitCanceled(index: number){
        this.cartListUpdated.emit(ShopCartService.cartList);
    }

    emitItemList(){
        this.ItemListUpdated.emit(ShopService.itemList);
    }

    // updateitemArrivalList(){
    //     this.ItemArrivalListUpdated.emit(ShopCartService.itemArrivalList);
    // }

    static itemArrivalList: Array<ItemArrival> =[]
    states: Array<string> = ["sent", "sending", "canceled", "temp"];
    // static cartList: Array<Cart>;

    updateCart(user: User, item: Item, size: string): void {
        var name: string = user.email;
        var stringCart: string | null = localStorage.getItem(`${name}`);
        if (!stringCart) {
            let quantity: number = 1;
            let price: number = this.findPrice(item, size);
            let locCartItem: CartItem = { item, size, price, quantity };
            let list: Array<CartItem> = [];
            list.push(locCartItem);
            let state: string = this.states[3];
            var id: number = 0;
            let locCart: Cart = { id, user, list, state };
            localStorage.removeItem(`${name}`);
            localStorage.setItem(`${name}`, JSON.stringify(locCart));
        }
        else {
            const cart: Cart = JSON.parse(stringCart);
            let foundItem = cart.list.find((cartItem: CartItem) => cartItem.item.id == item.id && cartItem.size == size);
            if (foundItem) {
                cart.list.forEach((cartItem: CartItem) => {
                    if (cartItem.item.id == item.id && cartItem.size == size) {
                        cartItem.quantity++;
                    }
                });
                localStorage.removeItem(`${name}`);
                localStorage.setItem(`${name}`, JSON.stringify(cart));
            } else {
                let quantity: number = 1;
                let price: number = this.findPrice(item, size);
                let locCartItem: CartItem = { item, size, price, quantity };
                cart.list.push(locCartItem);
                localStorage.removeItem(`${name}`);
                localStorage.setItem(`${name}`, JSON.stringify(cart));
            }
        }
        var test: string | null = localStorage.getItem(`${name}`)!;
        console.log(JSON.parse(test));
    }

    // findPrice(item: CartItem): number{
    //     let price!: number;
    //     item.item.prices.forEach(obj => {if(obj.size == item.size){ price = obj.price}});
    //     return price*item.quantity;
    //   }

    findPrice(item: Item, size: string): number {
        let price!: number;
        item.prices.forEach(obj => { if (obj.size == size) { price = obj.price } });
        return price;
    }
    // fullPriceCart(cart: Cart): number{
    //     var fullPrice: number = 0;
    //     cart.list.forEach(item => {
    //       const price = this.findPrice(item);

    //       if (price) {
    //         fullPrice += (price * item.quantity);
    //       }
    //     });
    //     return fullPrice;
    //   }

    static cartList: Array<Cart> = [
        // {
        //     user: this.userService.currentUser,
        //     list: [
        //         {item: this.shopService.getItemById(3), size: this.shopService.getItemById(3).sizes[0], quantity:1},
        //         {item: this.shopService.getItemById(6), size: this.shopService.getItemById(6).sizes[2], quantity:3}
        //     ],
        //     state: "sent"
        // },
        // {
        //     user: this.userService.currentUser,
        //     list: [
        //         {item: this.shopService.getItemById(2), size: this.shopService.getItemById(2).sizes[0], quantity:3}
        //     ],
        //     state: "sending"
        // }
    ];
}