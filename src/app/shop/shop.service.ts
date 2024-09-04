import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { User, UserService } from "../auth/user.service";
import { ItemFilterComponent } from "./item-filter/item-filter.component";
import { ItemListComponent } from "./item-list/item-list.component";
export interface Review {
    // id: number;
    user: string;
    review: string;
}

export interface Rating {
    // id: number;
    user: string;
    review: number;
}

export interface Prices {
    // id: number;
    size: string;
    price: number;
}

export interface Item {
    id: number;
    name: string;
    type: string;
    sizes: Array<string>;
    imageSrc: string;
    brand: string;
    date: Date;
    prices: Array<Prices>;
    reviews: Array<Review>;
    ratings: Array<Rating>;
}

@Injectable()
export class ShopService implements OnInit{

    static itemListUpdated = new EventEmitter<void>();

    constructor(private userService: UserService) {}

    static brandList: Array<string> = ["Nike", "Adidas", "Zara", "Puma", "Louis Vuitton"];
    static typeList: Array<string> = ["Hoodies", "Pants", "Jackets", "Shorts"];
    static sizeList: Array<string> = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

    static itemList: Array<Item>;
    static FinalItemList: Array<Item>;
    static IsFormClicked: boolean = false;

    

    ngOnInit(): void {
        ShopService.itemListUpdated.subscribe(() => {
            // ShopService.initializeItemList(this.userService);
        });
    }

    passFinalItemList(list: Array<Item>){
        ShopService.FinalItemList = list;
        ShopService.IsFormClicked = true;
        console.log(ShopService.FinalItemList);
        ShopService.itemListUpdated.emit();
    }

    getItemById(id: number): Item{
        var foundItem!: Item;
        ShopService.itemList.forEach((item) => {
            if(item.id == id){
                foundItem = item;
            }
        });
        return foundItem;
    }

    static initializeItemList(userService: UserService): void {
        this.itemList = [
            {
                id: 0,
                name: "Black Nike hoodie",
                type: "Hoodies",
                sizes: ["S", "M", "L", "XL"],
                imageSrc: "assets/itemImages/black-hoodie-nike.jpg",
                brand: "Nike",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "S", price: 2000.00 },
                    { size: "M", price: 3000.00 },
                    { size: "L", price: 4600.00 },
                    { size: "XL", price: 5500.00 },
                ],
                reviews: [
                    { user: userService.getUserById(1).name, review: "10/10 reccomend!!" },
                    { user: userService.getUserById(4).name, review: "Love the color." },
                    { user: userService.getUserById(6).name, review: "Awesome" },
                    { user: userService.getUserById(7).name, review: "Great hoodie!" },
                ],
                ratings: [
                    { user: userService.getUserById(1).email, review: 5 },
                    { user: userService.getUserById(7).email, review: 4 }
                ]
            },
            {
                id: 1,
                name: "Black Nike Pants",
                type: "Pants",
                sizes: ["M", "L", "XL"],
                imageSrc: "assets/itemImages/black-pants-nike.jpg",
                brand: "Nike",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 4000.00 },
                    { size: "L", price: 4600.00 },
                    { size: "XL", price: 5300.00 },
                ],
                reviews: [
                    { user: userService.getUserById(2).name, review: "I dont rly like them" },
                    { user: userService.getUserById(9).name, review: "Rly good pants" }
                ],
                ratings: [
                    { user: userService.getUserById(2).email, review: 5 },
                    { user: userService.getUserById(9).email, review: 4 }
                ]
            },
            {
                id: 2,
                name: "Gray Nike Jacket",
                type: "Jackets",
                sizes: ["L", "XL", "XXL", "XXXL"],
                imageSrc: "assets/itemImages/gray-jacket-nike.jpg",
                brand: "Nike",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "XXXL", price: 12000.00 },
                    { size: "L", price: 5700.00 },
                    { size: "XL", price: 7000.00 },
                    { size: "XXL", price: 9900.00 }
                ],
                reviews: [
                    { user: userService.getUserById(8).name, review: "Nice and warm 10/10" }
                ],
                ratings: [
                    { user: userService.getUserById(7).email, review: 5 },
                    { user: userService.getUserById(6).email, review: 3 }
                ]
            },
            {
                id: 3,
                name: "Pink Adidas Hoodie",
                type: "Hoodies",
                sizes: ["XS", "S", "M", "L"],
                imageSrc: "assets/itemImages/pink-hoodie-jacket.jpg",
                brand: "Adidas",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "XS", price: 3000.00 },
                    { size: "S", price: 4200.00 },
                    { size: "M", price: 6000.00 },
                    { size: "L", price: 7100.00 }
                ],
                reviews: [
                    { user: userService.getUserById(4).name, review: "Cool hoodie" }
                ],
                ratings: [
                    { user: userService.getUserById(4).email, review: 5 },
                    { user: userService.getUserById(8).email, review: 4 },
                    { user: userService.getUserById(9).email, review: 5 }
                ]
            },
            {
                id: 4,
                name: "Black Adidas pants",
                type: "Pants",
                sizes: ["XS", "S", "M"],
                imageSrc: "assets/itemImages/black-pants-adidas.jpg",
                brand: "Adidas",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "XS", price: 4000.00 },
                    { size: "S", price: 5100.00 },
                    { size: "M", price: 5900.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 2 },
                    { user: userService.getUserById(7).email, review: 4 },
                    { user: userService.getUserById(9).email, review: 5 }
                ]
            },
            {
                id: 5,
                name: "Black Adidas Jacket",
                type: "Jackets",
                sizes: ["XS", "S", "M", "L", "XL"],
                imageSrc: "assets/itemImages/black-jacket-adidas.jpg",
                brand: "Adidas",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "XS", price: 5000.00 },
                    { size: "S", price: 6000.00 },
                    { size: "M", price: 7200.00 },
                    { size: "L", price: 8200.00 },
                    { size: "XL", price: 10000.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 2 },
                    { user: userService.getUserById(7).email, review: 4 },
                    { user: userService.getUserById(9).email, review: 1 }
                ]
            },
            {
                id: 6,
                name: "White Zara hoodie",
                type: "Hoodies",
                sizes: ["M", "L", "XL"],
                imageSrc: "assets/itemImages/white-hoodie-zara.jpg",
                brand: "Zara",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 4400.00 },
                    { size: "L", price: 5200.00 },
                    { size: "XL", price: 7200.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 2 },
                    { user: userService.getUserById(7).email, review: 4 },
                    { user: userService.getUserById(1).email, review: 5 },
                    { user: userService.getUserById(9).email, review: 1 }
                ]
            },
            {
                id: 7,
                name: "Brown Zara pants",
                type: "Pants",
                sizes: ["S","M", "L", "XL"],
                imageSrc: "assets/itemImages/brown-pants-zara.jpg",
                brand: "Zara",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 6700.00 },
                    { size: "L", price: 8000.00 },
                    { size: "S", price: 5400.00 },
                    { size: "XL", price: 9900.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 2 },
                    { user: userService.getUserById(7).email, review: 4 },
                    { user: userService.getUserById(1).email, review: 5 },
                    { user: userService.getUserById(9).email, review: 1 }
                ]
            },
            {
                id: 8,
                name: "Olive Zara jacket",
                type: "Jackets",
                sizes: ["S", "M", "L", "XL", "XXL"],
                imageSrc: "assets/itemImages/olive-jacket-zara.jpg",
                brand: "Zara",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 6700.00 },
                    { size: "L", price: 8000.00 },
                    { size: "S", price: 5400.00 },
                    { size: "XXL", price: 11000.00 },
                    { size: "XL", price: 9900.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 3 },
                    { user: userService.getUserById(7).email, review: 4 },
                    { user: userService.getUserById(1).email, review: 5 },
                    { user: userService.getUserById(9).email, review: 5 }
                ]
            },
            {
                id: 9,
                name: "Red Puma hoodie",
                type: "Hoodies",
                sizes: ["S", "M", "L", "XL"],
                imageSrc: "assets/itemImages/red-hoodie-puma.jpg",
                brand: "Puma",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 4700.00 },
                    { size: "L", price: 5800.00 },
                    { size: "S", price: 3500.00 },
                    { size: "XL", price: 7000.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 3 },
                    { user: userService.getUserById(7).email, review: 4 },
                    { user: userService.getUserById(1).email, review: 1 },
                    { user: userService.getUserById(9).email, review: 5 }
                ]
            },
            {
                id: 10,
                name: "Gray Puma jacket",
                type: "Jackets",
                sizes: ["S", "M", "L", "XL"],
                imageSrc: "assets/itemImages/gray-jacket-puma.jpg",
                brand: "Puma",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 7100.00 },
                    { size: "L", price: 8300.00 },
                    { size: "S", price: 6000.00 },
                    { size: "XL", price: 9800.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 5 },
                    { user: userService.getUserById(7).email, review: 5 },
                    { user: userService.getUserById(1).email, review: 1 },
                    { user: userService.getUserById(9).email, review: 5 }
                ]
            },
            {
                id: 11,
                name: "Blue Puma shorts",
                type: "Shorts",
                sizes: ["S", "M", "L", "XL"],
                imageSrc: "assets/itemImages/blue-shorts-puma.jpg",
                brand: "Puma",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 3200.00 },
                    { size: "L", price: 4300.00 },
                    { size: "S", price: 2900.00 },
                    { size: "XL", price: 5000.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 5 },
                    { user: userService.getUserById(7).email, review: 4 },
                    { user: userService.getUserById(1).email, review: 2 },
                    { user: userService.getUserById(9).email, review: 3 }
                ]
            },
            {
                id: 12,
                name: "Gray Louis Vuitton hoodie",
                type: "Hoodies",
                sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
                imageSrc: "assets/itemImages/gray-hoodie-Louis Vuitton.jpg",
                brand: "Louis Vuitton",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 3200.00 },
                    { size: "L", price: 4300.00 },
                    { size: "S", price: 2900.00 },
                    { size: "XXL", price: 7000.00 },
                    { size: "XXXL", price: 9000.00 },
                    { size: "XL", price: 5000.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 5 },
                    { user: userService.getUserById(7).email, review: 3 },
                    { user: userService.getUserById(1).email, review: 2 },
                    { user: userService.getUserById(9).email, review: 3 }
                ]
            },
            {
                id: 13,
                name: "Brown Louis Vuitton pants",
                type: "Pants",
                sizes: ["S", "M", "L", "XL"],
                imageSrc: "assets/itemImages/brown-pants-Louis Vuitton.jpg",
                brand: "Louis Vuitton",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 3200.00 },
                    { size: "L", price: 4300.00 },
                    { size: "S", price: 2900.00 },
                    { size: "XL", price: 5000.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 5 },
                    { user: userService.getUserById(7).email, review: 3 },
                    { user: userService.getUserById(1).email, review: 1 },
                    { user: userService.getUserById(9).email, review: 3 }
                ]
            },
            {
                id: 14,
                name: "Black Louis Vuitton jacket",
                type: "Jackets Louis Vuitton jacket",
                sizes: ["S", "M", "L", "XL"],
                imageSrc: "assets/itemImages/black-jacket-Louis Vuitton.jpg",
                brand: "Louis Vuitton",
                date: new Date("2024-04-18 14:23"),
                prices: [
                    { size: "M", price: 3200.00 },
                    { size: "L", price: 4300.00 },
                    { size: "S", price: 2900.00 },
                    { size: "XL", price: 5000.00 }
                ],
                reviews: [
                ],
                ratings: [
                    { user: userService.getUserById(3).email, review: 5 },
                    { user: userService.getUserById(7).email, review: 5 },
                    { user: userService.getUserById(1).email, review: 2 },
                    { user: userService.getUserById(9).email, review: 3 }
                ]
            },
        ];
        if(!this.IsFormClicked){
            ShopService.FinalItemList = this.itemList;
        }
    }
}