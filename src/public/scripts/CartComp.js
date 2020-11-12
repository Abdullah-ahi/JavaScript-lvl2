
Vue.component('basket', {
    data(){
        return{
            imgCart: 'https://via.placeholder.com/200x200/258DC8/E0F6FD',
            cartUrl: '/getBasket.json',
            basketProducts: [],
            isVisibleCart: false,
        }
    },

    methods: {
        addProduct(product){
            this.removeBasketBg();
            let find = this.basketProducts.find(good => good.id_product === product.id_product);
            if (find){
                this.$parent._postProducts(`/api/statistics/${find.id_product}`, {
                    action: "add",
                    productName: find.product_name,
                    date: new Date
                })
                this.$parent._putProducts(`/api/cart/${find.id_product}`);
                this.increasePrsCount(product);
            }else{
                this.$parent._postProducts(`/api/statistics/${product.id_product}`, {
                    action: "add",
                    product_name: product.product_name,
                    date: new Date
                })
                this.$parent._postProducts(`/api/cart/`, product)
                .then(data => {
                    if (data.result === 1){
                        this.basketProducts.push(product)
                        this.renderBasketProductsSum()
                    }
                })
            }
        },

        removeBasketBg(){
            document.querySelector('.basketBlock').style.backgroundImage = 'none';
        },

        increasePrsCount(good){
            let count = ++good.quantity;
            const block = document.querySelector(`.basket-product-item[data-id = "${good.id_product}"]`)
            block.querySelector('.count-of-good').textContent = count;

            this.renderBasketProductsSum();
    
        },

        renderBasketProductsSum(){
            document.querySelector('#basket-products-sum').innerHTML = `${this.getBasketProductsSum()} &#x20bd`;
        },
        getBasketProductsSum(){
            let basketProductsSum = this.basketProducts.reduce((sum, item) => sum += item.price*item.quantity, 0);
            return basketProductsSum;
        },

        deleteProduct(product){
            
            let basketPrs = document.querySelectorAll('.basket-product-item');
            if (basketPrs){
                this.$parent._postProducts(`/api/statistics/${product.id_product}`, {
                    action: "remove",
                    product_name: product.product_name,
                    date: new Date
                })
                this.$parent._deleteProducts(`/api/cart/${product.id_product}`)
                basketPrs.forEach(good => {
                    if (document.querySelector(`.basket-product-item[data-id = "${product.id_product}"]`)){
                        const block = document.querySelector(`.basket-product-item[data-id = "${product.id_product}"]`)
    
                        if (good.dataset.id == product.id_product){
                            if (product.quantity > 1){
                                product.quantity --;
                                block.querySelector('.count-of-good').textContent = product.quantity;
                            }else{
                                let b_idx = this.basketProducts.indexOf(product)
                                this.basketProducts.splice(b_idx, 1);
                                this.isBasketEmpty();
                                
                            }
    
                        }
                    }
                })
                this.renderBasketProductsSum();
            }
                  
        },

        clearBasket(){
            let basketPrs = document.querySelectorAll('.basket-product-item')
            for (let good of basketPrs){
                good.remove();
            }
            this.basketProducts.splice(0, this.basketProducts.length);
            document.querySelector('#basket-products-sum').innerHTML = `0 &#x20bd`;
    
            this.isBasketEmpty();
        },

        isBasketEmpty(){
            if (this.basketProducts.length === 0){
                document.querySelector('.basketBlock').style.backgroundImage = 'url(images/emptyBasket.png)';
            }
        },

        
    },

    mounted(){
        // // this.$parent._getProducts(`/api/products/`)
        // //     .then(data => {
        // //         // for (let product of data){
        // //         //     let prod = Object.assign({quantity: 1}, product)
        // //         //     this.basketProducts.push(prod)
        // //         // }
        //         this.renderBasketProductsSum();
        //         this.isBasketEmpty();
        //     })
        this.renderBasketProductsSum();
        this.isBasketEmpty();
    },

    template: `
        <div>
            <div class="basketBlock invisible">
                <div class="basket-info">
                    <button class="clear_basket" @click="clearBasket()">Очистить корзину</button>
                    <label class = 'total-sum' for="basket-products-sum">
                        <span>Общая сумма товаров в корзине</span>
                        <div id="basket-products-sum">0 &#x20bd</div>
                    </label>
                </div>
                <basket-product-item v-for="product of basketProducts" :key="product.id_product" :basketProductItem = "product" :img="imgCart" @remove="deleteProduct(product)"> 
                </basket-product-item>
            </div>
        </div>
        `
});

Vue.component('basket-product-item', {
    props: ['basketProductItem', 'img'],
    template: `
        <div class = 'basket-product-item' :data-id = 'basketProductItem.id_product'>
            <img class = 'basket-good_img' :src ="img" alt = 'Some img'>
            <i class="fas fa-times" @click="$emit('remove', basketProductItem)"></i>
            <div class = 'basket-product-desc'>
                <h3 class = 'good_name'>{{basketProductItem.product_name}}</h3>
                <p class = 'good_price'>{{basketProductItem.price}} &#x20bd</p>
                <button class = 'buy-btn'>Оформить заказ</button>
                <span class = 'count-of-good'>{{basketProductItem.quantity}}</span>
                <span>шт</span>
            </div>
        </div>
    `
});
