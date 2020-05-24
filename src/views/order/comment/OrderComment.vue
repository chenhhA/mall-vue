<template>
    <div class="main-container">
        <comment-card v-for="comment in comments"
                      :comment="comment">

        </comment-card>
    </div>

</template>

<script>
    import {loadCommentByOrderId} from "../../../api/api";
    import CommentCard from "../../../components/CommentCard";

    export default {
        name: "OrderComment",
        components: {CommentCard},
        data(){
          return{
              comments:[],
              orderId:''
          }
        },
        methods: {
            loadData() {
                loadCommentByOrderId(this.orderId).then(resp=>{
                    if (resp) {
                        this.comments = resp;
                    }
                })
            }
        },
        created() {
            this.orderId = this.$route.query.orderId;
            this.loadData();
        }

    }
</script>

<style scoped>

</style>
