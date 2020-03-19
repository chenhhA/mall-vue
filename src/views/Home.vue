<template>
    <div>
        <h1>Hello</h1>
        <router-link to="/login">登陆</router-link>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import Tabbar from "../components/Tabbar/Tabbar";

    export default {
        name: 'Home',
        components: {
            Tabbar,
            HelloWorld
        },
        created:{

        }
    }
</script>
