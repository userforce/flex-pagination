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
                        event: 'flexp:page'
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
                return helpers.hasInnerProperty(this.config, 'show.' + to) ? this.config.show[to] : this.default.config.show[to];
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
            },

            getPrev() {
                return this.hasPrev() ? this.pagination.page - 1 : this.pagination.page;
            },

            getNext() {
                return this.hasNext() ? this.pagination.page + 1 : this.pagination.total;
            },

            hasPrev() {
                return this.pagination.page - 1 > 0;
            },

            hasNext() {
                return this.pagination.page + 1 <= this.pagination.total;
            },

            setPage(page) {
                if (this.pagination.page !== page) {
                    this.pagination.page = page;
                    let event = this.config.event ? this.config.event : this.default.config.event;
                    this.$emit(event, this.pagination.page);
                }
            }
        }
    }
</script>

<template>
    <div class="flexp">
        <ul class="flexp-nav">

            <li class="flexp-btn flexp-first"
                v-if="getShow('first')"
                @click="setPage(1)"
                :class="{disabled: !hasPrev()}">
                <slot name="flexp-first">
                    <div class="flexp-btn-icon">
                        First
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-previous"
                v-if="getShow('prev')"
                @click="setPage(getPrev())"
                :class="{disabled: !hasPrev()}">
                <slot name="flexp-previous">
                    <div class="flexp-btn-icon">
                        Previous
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-range-before"
                v-for="iterator in getRangeBefore()"
                @click="setPage(iterator)">
                <div class="flexp-btn-icon">
                    {{ iterator }}
                </div>
            </li>

            <li class="flexp-btn flexp-page active">
                <slot name="flexp-first">
                    {{ normalizedPage }}
                </slot>
            </li>

            <li class="flexp-btn flexp-range-after"
                v-for="iterator in getRangeAfter()"
                @click="setPage(iterator)">
                <div class="flexp-btn-icon">
                    {{ iterator }}
                </div>
            </li>

            <li class="flexp-btn flexp-next"
                v-if="getShow('next')"
                @click="setPage(getNext())"
                :class="{disabled: !hasNext()}">
                <slot name="flexp-next">
                    <div class="flexp-btn-icon">
                        Next
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-last"
                v-if="getShow('last')"
                @click="setPage(pagination.total)"
                :class="{disabled: !hasNext()}">
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
        background: rgba(255, 255, 255, 1);
        float: left;
        margin: 0 2px 0 0;
    }

    .flexp li:hover, .flexp li.active, .flexp li.disabled {
        background: rgba(0, 0, 0, .08);
    }

    .flexp li.disabled {
        color: #cccccc;
        background: #f8f8f8;
    }

    .flexp li.active, .flexp li.disabled {
        cursor: default;
    }
</style>