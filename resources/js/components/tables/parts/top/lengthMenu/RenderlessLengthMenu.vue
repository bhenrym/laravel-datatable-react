<script>
export default {
    props: {
        query: {
            type: String,
            default: null
        },
        lengthMenu: {
            type: Array,
            default: []
        }
        
    },

    render () {
        return this.$scopedSlots.default({
            query: this.query,
            lengthMenu:this.lengthMenu
        });
    }
}
</script>
