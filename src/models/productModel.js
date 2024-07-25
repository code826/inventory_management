export default class ProductModel{
    constructor(_id,_name,_desc,_prices,_imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.prices = _prices;
        this.imageUrl = _imageUrl;
    }
    static addProduct(prodObj){
        let newProduct = new ProductModel(products.length+1,prodObj.name,prodObj.desc,prodObj.prices,prodObj.imageUrl);
        products.push(newProduct); 
        return true;
    }
    static getProducts(){
        return products;
        //.sort();
    }
}

//in fututre this thing thing from database
var products = [
    new ProductModel(1,'product_1','test',200,'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(2,'product_2','test',200,'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new ProductModel(3,'product_3','test',200,'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(4,'product_4','test',300,'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg')
]