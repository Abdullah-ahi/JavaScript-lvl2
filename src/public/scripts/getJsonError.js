Vue.component('error', {
    data(){
        return {
            
        }
    },

    methods: {
        emptyProducts(){
            let emptyPrs = document.createElement('h2');
            emptyPrs.classList.add('empty-prs-block');
            emptyPrs.insertAdjacentHTML('beforeend', 'Нет данных');
            document.querySelector('.products').append(emptyPrs);
        },
    },


    template: `
        
    `
})

