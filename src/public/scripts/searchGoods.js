Vue.component('search-goods', {
    data(){
        return {
            searchline: '',
            products: [],
            filtered: [],
        }
    },

    methods: {
        filterGoods(value, event){
            event.preventDefault();
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));

            if (document.querySelector('.empty-prs-block')){
                document.querySelector('.empty-prs-block').remove();
            }
            this.products.forEach(product => {
                const block = document.querySelector(`.product-item[data-id = "${product.id_product}"]`)
                if (!this.filtered.includes(product)){
                    block.classList.add('invisible')
                }else{
                    block.classList.remove('invisible')
                }
                
            })

            if (this.filtered.length === 0){
                let goods = document.querySelectorAll('.product-item')
                goods.forEach(good => {
                    good.classList.add('invisible')
                })
                this.emptyProducts();
            }
        },

        emptyProducts(){
            let emptyPrs = document.createElement('h2');
            emptyPrs.classList.add('empty-prs-block');
            emptyPrs.insertAdjacentHTML('beforeend', 'Not found');
            document.querySelector('.products').append(emptyPrs);
        },
    },

    mounted(){
        this.$parent._getProducts(`/api/products/`)
            .then(data => {
                for (let product of data){
                    let prod = Object.assign({quantity: 1}, product)
                    this.products.push(prod);
                }
            })
    },

    template: `
        <form action="#" class = "search-form" @submit.prevent="filterGoods(searchline, $event)">
            <input type="text" class="search-field" v-model="searchline">
            <button class = "btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `

})