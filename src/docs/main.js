/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

async function fetchEndpoints() {
    const res = await axios.get('/api/endpoints')
    return res.data
}

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        collections: [],
    },
    methods: {
        async fetchEndpoints() {
            const res = await axios.get('/api/endpoints')
            return res.data
        },
    },
    // on mounted
    mounted() {
        this.fetchEndpoints().then((data) => {
            this.collections = data.data.map((item) => item.title)
        })
    },
})
