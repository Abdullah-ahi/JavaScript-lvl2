Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/200x200/258DC8/E0F6FD',
        }
    },

    methods: {
        filter(){
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },

    mounted(){
        this.$parent._getProducts(`/api/products/`)
            .then(data => {
                for (let product of data){
                    let prod = Object.assign({quantity: 1}, product)
                    this.products.push(prod);
                }
            }).catch(() => {
                this.$root.$refs.error.emptyProducts()
            })
    },
    template: `
        <div class="products">
            <product v-for="item of products" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    data(){
        return {
            cartAPI: this.$root.$refs.basket,
        };
    },

    template: `
        <div class="product-item" :data-id = "product.id_product">
            <img class="good_img" :src="img" alt="some img">
            <div class="product_desc">
                <h3 class="good_name">{{product.product_name}}</h3>
                <p class="good_price">{{product.price}} &#x20bd</p>
                <button class="buy-btn" @click="cartAPI.addProduct(product)">Добавить в корзину</button>
            </div>
        </div>
    `
});