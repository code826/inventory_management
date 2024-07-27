export default class ProductModel{
    constructor(_id,_name,_desc,_prices,_imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _prices;
        this.imageUrl = _imageUrl;
    }
    getName(){
        return this.name;
    }
    setName(_name){
        this.name = _name;
    }

    getPrice(){
        return this.price;

    }
    setPrice(_price){
        this.price = _price;
    }
    getDesc(){
        return this.desc;
    }
    setDesc(_desc){
        this.desc = _desc;
    }
    getImageUrl(){
        return this.imageUrl;
    }
    setImageUrl(_imageUrl){
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

    static getPrdouctFromId(_id){
       let resp = null;
       for(let i =0;i<products.length;i++){
        if(products[i].id == _id){
            resp = products[i];
            break;
        }
       }
       return resp;
    }
    
    static isValidId(_id){
        let idFound = false;
        for(let i =0;i<products.length;i++){
            if(products[i].id == _id){
                idFound = true;
                break;
        } 
        return idFound;
    }
}
}

//in fututre this thing thing from database
var products = [
    new ProductModel(1,'product_1','test',200,'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(2,'product_2','test',200,'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new ProductModel(3,'product_3','test',200,'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(4,'product_4','test',300,'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg')
]