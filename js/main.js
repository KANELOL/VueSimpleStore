Vue.component('product', {
    props:{
        premium: {
            required:true
        }
    },
    template:`
    <div class="product">
    <div class="product-image">
       <img :src='image'>
    </div>
    <div class="product-info">
        <h1>{{title}}</h1>
        <p v-if="inventory > 10">In Stock:{{inventory}}</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock: <b>{{inventory}}</b> left</p>
        <p v-else>Out of Stock:{{inventory}}</p>
        <p>Shipping: {{shipping}}</p>
        <div>
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    </div>

        <div v-for="(variant, index) in variants" 
        :key="variant.variantId" 
        class="color-box" 
        :style="{backgroundColor:variant.variantColor}"
        @mouseover="updateProduct(index)">
        </div>
        <ul>
            <li v-for="size in variants.sizes">{{size}}</li>
        </ul>
        <button v-on:click="addToCart"
        :disabled="(inventory < 1)"
        :class="{disabledButton: (inventory < 1)}">Add to cart</button>
    </div>
</div>`,
data(){
    return {
        brand: 'KæshTen',
    product: 'Robust Socks',
    selectedVariant: 0,
    details:["80% Cotton","20% polyester"],
    inStock: true,
    variants:[{
        variantId: 1,
        variantColor: "green",
        sizes:["Small", "Medium", "Large", "XL", ">9000"],
        variantImage: "assets/vmSocks-green-onWhite.jpg",
        variantInventory: 10
    },
    {
        variantId:2,
        variantColor:"blue",
        sizes:["Small", "Medium", "Large", "XL", ">9000"],
        variantImage:"assets/vmSocks-blue-onWhite.jpg",
        variantInventory: 0
}]
}},
methods: {
    addToCart: function () {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    // removeFromCart: function() {
    //     this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    // },
    updateProduct: function(index) {
        this.selectedVariant = index
    }
},
computed: {
    title() {
        return this.brand + ' ' + this.product
    },
    image(){
        return this.variants[this.selectedVariant].variantImage
    },
    inventory(){
        return this.variants[this.selectedVariant].variantInventory
    },
    shipping() {
        if(this.premium) {
        return "Free"
    }
    return "9.99 kr"
}
}
}),

new Vue({
    el: '#app',
    data: {
        premium:false,
        cart: []
    },
    methods: {
        updateCart(id) {
            console.log(id)
            this.cart.push(id)
        },
        // removeFromCart() {
        //     this.cart -=1
        // }
    }
})