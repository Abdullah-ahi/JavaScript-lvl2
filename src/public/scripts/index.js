const app = new Vue({
    el: '#app',
    data: {
        searchline: '',
    },

    methods: {

        _getProducts(url){
            return fetch(url)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
        },

        _postProducts(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
              .catch(error => {
                console.log(error);
              })
        },

        _putProducts(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
              .catch(error => {
                  console.log(error);
              });
        },

        _deleteProducts(url, data){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
              .catch(error => {
                  console.log(error);
              });
        },

    },

    mounted(){
        console.log(this.$root.$refs)
    },
})