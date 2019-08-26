<script>
    import validator from '../utils/validator';

    export default {
        name: 'flex-pagination',
        components: {

        },
        props: {
            pagination: {
                type: Object,
                // Required
                validator: validator.isValidPagination
            },
            config: {
                type: Object,
                // Not required
                validator: validator.isValidConfig
            },
            anchor: {
                type: String,
                // Not required
                validator: validator.isValidAnchor
            },
        },
        data() {
            return {

            }
        },
        updated() {

        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<template>
    <div class="flexp">

        Hello world!

        {{ pagination.page }}
        {{ pagination.total }}
        {{ pagination.range.afterPage }}
        {{ pagination.range.beforePage }}
    </div>
</template>