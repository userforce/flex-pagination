<script>
    import validator from '../utils/validator';
    import helpers from '../utils/helpers';

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
        computed: {
            normalizedPage() {
                return this.pagination.page > this.pagination.total ? this.pagination.total : this.pagination.page;
            }
        },
        methods: {
            getShow(to) {
                return helpers.hasInnerProperty(this.config, 'show.'+to) ? this.config.show[to] : this.default.config.show[to];
            },
            getRangeLength(position) {
                return helpers.hasInnerProperty(this.range, position) ? this.range[position] : this.default.range[position];
            },
            getRangeBefore() {
                let start = this.pagination.page - this.getRangeLength('before');
                start = start < 1 ? 1 : start;
                let end = this.pagination.page - 1;
                return helpers.rangeToArray(start, end);
            },
            getRangeAfter() {
                let end = this.pagination.page + this.getRangeLength('after');
                end = end > this.pagination.total ? this.pagination.total : end;
                let start = this.pagination.page + 1;
                start = this.pagination.page >= this.pagination.total ? this.pagination.page + 1 : start;
                return helpers.rangeToArray(start, end);
            }
        }
    }
</script>

<template>
    <div class="flexp">
        <ul class="flexp-nav">

            <li class="flexp-btn flexp-first"
                v-if="getShow('first')">
                <slot name="flexp-first">
                    <div class="flexp-btn-icon">
                        First
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-previous"
                v-if="getShow('prev')">
                <slot name="flexp-previous">
                    <div class="flexp-btn-icon">
                        Previous
                    </div>
                </slot>
            </li>

            <li class="flexp-btn"
                v-for="iterator in getRangeBefore()">
                <div class="flexp-btn-icon">
                    {{ iterator }}
                </div>
            </li>

            <li class="flexp-btn flexp-page active">
                <slot name="flexp-first">
                    {{ normalizedPage }}
                </slot>
            </li>

            <li class="flexp-btn"
                v-for="iterator in getRangeAfter()">
                <div class="flexp-btn-icon">
                    {{ iterator }}
                </div>
            </li>

            <li class="flexp-btn flexp-next"
                v-if="getShow('next')">
                <slot name="flexp-next">
                    <div class="flexp-btn-icon">
                        Next
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-last"
                v-if="getShow('last')">
                <slot name="flexp-first">
                    <div class="flexp-btn-icon">
                        Last
                    </div>
                </slot>
            </li>

        </ul>
    </div>
</template>

<style>
    .flexp li, .flexp ul {
        display: block;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .flexp li {
        border: 1px solid #cccccc;
        cursor: pointer;
        padding: 3px 11px;
        background: rgba(255,255,255,1);
        float: left;
        margin: 0 2px 0 0;
    }

    .flexp li:hover, .flexp li.active {
        color: #777777;
        background: rgba(0,0,0,.08);
    }

    .flexp li.active {
        cursor: default;
    }
</style>