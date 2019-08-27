<script>
    import validator from '../utils/validator';

    export default {
        name: 'flex-pagination',
        props: {
            pagination: {
                type: Object,
                required: true,
                validator: validator.isValidPagination
            },
            range: {
                type: Object,
                required: false,
                validator: validator.isValidRange
            },
            config: {
                type: Object,
                required: false,
                validator: validator.isValidConfig
            }
        },
        data() {
            return {
                default: {
                    range: {
                        before: 5,
                        after: 5
                    },
                    config: {
                        show: {
                            first: true,
                            last: true,
                            next: true,
                            prev: true
                        },
                        scroll: {
                            prefix: null
                        }
                    }
                }
            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>

<template>
    <div class="flexp">
        <ul class="flexp-nav">
            <li class="flexp-btn flexp-first">
                <slot name="flexpfirstcontent">
                    slot default content
                </slot>
            </li>
        </ul>




<!--        Hello world!-->

<!--        {{ pagination.page }}-->
<!--        {{ pagination.total }}-->
<!--        {{ pagination.range.afterPage }}-->
<!--        {{ pagination.range.beforePage }}-->
    </div>
</template>