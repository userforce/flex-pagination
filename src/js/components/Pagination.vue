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

            getConfigShow(element) {
                return helpers.hasInnerProperty(this.config, 'show.' + element) ? this.config.show[element] : this.default.config.show[element];
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
                    let event = helpers.hasInnerProperty(this.config, 'event') ? this.config.event : this.default.config.event;
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
                v-if="getConfigShow('first')"
                @click="setPage(1)"
                :class="{disabled: !hasPrev()}">
                <slot name="flexp:first"
                      v-bind:page="1">
                    <div class="flexp-btn-icon">
                        First
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-previous"
                v-if="getConfigShow('prev')"
                @click="setPage(getPrev())"
                :class="{disabled: !hasPrev()}">
                <slot name="flexp:previous"
                      v-bind:page="getPrev()">
                    <div class="flexp-btn-icon">
                        Previous
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-range-before"
                v-for="iterator in getRangeBefore()"
                @click="setPage(iterator)">
                <slot name="flexp:range:before"
                      v-bind:page="iterator">
                    <div class="flexp-btn-icon">
                        {{ iterator }}
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-page active">
                <slot name="flexp:page"
                      v-bind:page="normalizedPage">
                    {{ normalizedPage }}
                </slot>
            </li>

            <li class="flexp-btn flexp-range-after"
                v-for="iterator in getRangeAfter()"
                @click="setPage(iterator)">
                <slot name="flexp:range:after"
                      v-bind:page="iterator">
                    <div class="flexp-btn-icon">
                        {{ iterator }}
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-next"
                v-if="getConfigShow('next')"
                @click="setPage(getNext())"
                :class="{disabled: !hasNext()}">
                <slot name="flexp:next"
                      v-bind:page="getNext()">
                    <div class="flexp-btn-icon">
                        Next
                    </div>
                </slot>
            </li>

            <li class="flexp-btn flexp-last"
                v-if="getConfigShow('last')"
                @click="setPage(pagination.total)"
                :class="{disabled: !hasNext()}">
                <slot name="flexp:last"
                      v-bind:page="pagination.total">
                    <div class="flexp-btn-icon">
                        Last
                    </div>
                </slot>
            </li>

        </ul>
    </div>
</template>

<style>
    .flexp-btn, .flexp-nav {
        display: block;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .flexp-btn {
        border: 1px solid #cccccc;
        cursor: pointer;
        padding: 3px 11px;
        background: rgba(255, 255, 255, 1);
        float: left;
        margin: 0 2px 0 0;
    }

    .flexp-btn:hover,
    .flexp-btn.active,
    .flexp-btn.disabled {
        background: rgba(0, 0, 0, .08);
    }

    .flexp-btn.disabled {
        color: #cccccc;
        background: #f8f8f8;
    }

    .flexp-btn.active,
    .flexp-btn.disabled {
        cursor: default;
    }
</style>