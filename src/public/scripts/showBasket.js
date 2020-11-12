Vue.component('show-basket', {
    data(){
        return {
            isVisibleCart: false,
        }
    },

    methods: {
        checkBasketStatus(){
            if (!this.isVisibleCart){
                this.openBasket()
            }else{
                this.closeBasket()
            }
        },

        openBasket(){
            document.querySelector('.basketBlock').classList.remove('invisible');
            this.isVisibleCart = true;
        },
        closeBasket(){
            document.querySelector('.basketBlock').classList.add('invisible');
            this.isVisibleCart = false;
        },
    },

    template: `
        <button class="btn-cart basket" @click="checkBasketStatus">Корзина</button>
    `
})