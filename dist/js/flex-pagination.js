(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=g||self,g.FlexPagination=f());}(this,function(){'use strict';let Helpers = function() {

    this.hasInnerProperty = function(object = {}, path) {
        let nodes = path.split('.');
        if (nodes.length > 1) {
            let firstNode = nodes.shift();
            if (object.hasOwnProperty(firstNode)) {
                return this.hasInnerProperty(object[firstNode], nodes.join('.'))
            }
            return false;
        } else {
            return object.hasOwnProperty(path);
        }
    };

    this.isValidClassName = function(string) {
        return !!string.match(/^[a-zA-Z][a-zA-Z_\-\d.]+$/gi);
    };

    this.rangeToArray = function(start, end) {
        let arrayRange = [];
        for (let i = start; i <= end; i++) {
            arrayRange.push(i);
        }
        return arrayRange;
    };
};

var helpers = new Helpers();let Validator = function() {

    let self = this;

    let hasRequired = function(object, item, name) {
        if (!object.hasOwnProperty(item)) {
            console.error(name + "." + item + " is required.");
            return false;
        }
        return true;
    };

    let isNumber = function(value, name) {
        let isValid = !!value.toString().match(/^[\d.]+$/g);
        if (!isValid) console.error(name + " must be of type Number.");
        return isValid;
    };

    let isBoolean = function(value, name) {
        let isValid = !!(typeof value === "boolean");
        if (!isValid) console.error(name + " must be of type Boolean.");
        return isValid;
    };

    let isValidPage = function(pagination) {
        if (hasRequired(pagination, 'page', 'pagination')) {
            return isNumber(pagination.page);
        }
        return false;
    };

    let isValidTotal = function(pagination) {
        if (hasRequired(pagination, 'total', 'pagination')) {
            return isNumber(pagination.page);
        }
        return false;
    };

    let isValidScrollPrefix = function(string) {
        let isValid = helpers.isValidClassName(string);
        if (!isValid) console.error("scroll prefix must be a valid html id name.");
        return isValid;
    };

    self.isValidPagination = function (pagination = {}) {
        if (typeof pagination === "object") {
            if (isValidPage(pagination) && isValidTotal(pagination)) {
                if (pagination.page <= pagination.total) return true;
                console.error("pagination.page can't be bigger then pagination.total.");
            }
        }
        return false;
    };

    self.isValidRange = function(range) {
        let isValid = true;
        if (range.hasOwnProperty('before')) {
            isValid = isValid && isNumber(range.before, 'range.before');
        }
        if (range.hasOwnProperty('after')) {
            isValid = isValid && isNumber(range.after, 'range.after');
        }
        return isValid;
    };

    self.isValidConfig = function (config = {}) {
        let isValid = true;
        if (helpers.hasInnerProperty(config, 'show.next')) {
            isValid = isValid && isBoolean(config.show.next, 'config.show.next');
        }
        if (helpers.hasInnerProperty(config, 'show.prev')) {
            isValid = isValid && isBoolean(config.show.prev, 'config.show.prev');
        }
        if (helpers.hasInnerProperty(config, 'show.first')) {
            isValid = isValid && isBoolean(config.show.first, 'config.show.first');
        }
        if (helpers.hasInnerProperty(config, 'show.last')) {
            isValid = isValid && isBoolean(config.show.last, 'config.show.last');
        }
        if (helpers.hasInnerProperty(config, 'scroll.prefix')) {
            isValid = isValid && isValidScrollPrefix(config.scroll.prefix.toString());
        }

        return isValid;
    };

};

var validator = new Validator();var script = {
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
                this.$emit('flexp:page', this.pagination.page);
            }
        }

    }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "flexp" }, [
    _c(
      "ul",
      { staticClass: "flexp-nav" },
      [
        _vm.getShow("first")
          ? _c(
              "li",
              {
                staticClass: "flexp-btn flexp-first",
                class: { disabled: !_vm.hasPrev() },
                on: {
                  click: function($event) {
                    return _vm.setPage(1)
                  }
                }
              },
              [
                _vm._t("flexp-first", [
                  _c("div", { staticClass: "flexp-btn-icon" }, [
                    _vm._v("\n                    First\n                ")
                  ])
                ])
              ],
              2
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.getShow("prev")
          ? _c(
              "li",
              {
                staticClass: "flexp-btn flexp-previous",
                class: { disabled: !_vm.hasPrev() },
                on: {
                  click: function($event) {
                    _vm.setPage(_vm.getPrev());
                  }
                }
              },
              [
                _vm._t("flexp-previous", [
                  _c("div", { staticClass: "flexp-btn-icon" }, [
                    _vm._v("\n                    Previous\n                ")
                  ])
                ])
              ],
              2
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._l(_vm.getRangeBefore(), function(iterator) {
          return _c(
            "li",
            {
              staticClass: "flexp-btn flexp-range-before",
              on: {
                click: function($event) {
                  return _vm.setPage(iterator)
                }
              }
            },
            [
              _c("div", { staticClass: "flexp-btn-icon" }, [
                _vm._v(
                  "\n                " + _vm._s(iterator) + "\n            "
                )
              ])
            ]
          )
        }),
        _vm._v(" "),
        _c(
          "li",
          { staticClass: "flexp-btn flexp-page active" },
          [
            _vm._t("flexp-first", [
              _vm._v(
                "\n                " +
                  _vm._s(_vm.normalizedPage) +
                  "\n            "
              )
            ])
          ],
          2
        ),
        _vm._v(" "),
        _vm._l(_vm.getRangeAfter(), function(iterator) {
          return _c(
            "li",
            {
              staticClass: "flexp-btn flexp-range-after",
              on: {
                click: function($event) {
                  return _vm.setPage(iterator)
                }
              }
            },
            [
              _c("div", { staticClass: "flexp-btn-icon" }, [
                _vm._v(
                  "\n                " + _vm._s(iterator) + "\n            "
                )
              ])
            ]
          )
        }),
        _vm._v(" "),
        _vm.getShow("next")
          ? _c(
              "li",
              {
                staticClass: "flexp-btn flexp-next",
                class: { disabled: !_vm.hasNext() },
                on: {
                  click: function($event) {
                    _vm.setPage(_vm.getNext());
                  }
                }
              },
              [
                _vm._t("flexp-next", [
                  _c("div", { staticClass: "flexp-btn-icon" }, [
                    _vm._v("\n                    Next\n                ")
                  ])
                ])
              ],
              2
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.getShow("last")
          ? _c(
              "li",
              {
                staticClass: "flexp-btn flexp-last",
                class: { disabled: !_vm.hasNext() },
                on: {
                  click: function($event) {
                    return _vm.setPage(_vm.pagination.total)
                  }
                }
              },
              [
                _vm._t("flexp-first", [
                  _c("div", { staticClass: "flexp-btn-icon" }, [
                    _vm._v("\n                    Last\n                ")
                  ])
                ])
              ],
              2
            )
          : _vm._e()
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-34f4984b_0", { source: "\n.flexp li, .flexp ul {\n    display: block;\n    padding: 0;\n    margin: 0;\n    list-style: none;\n}\n.flexp li {\n    border: 1px solid #cccccc;\n    cursor: pointer;\n    padding: 3px 11px;\n    background: rgba(255, 255, 255, 1);\n    float: left;\n    margin: 0 2px 0 0;\n}\n.flexp li:hover, .flexp li.active, .flexp li.disabled {\n    background: rgba(0, 0, 0, .08);\n}\n.flexp li.disabled {\n    color: #cccccc;\n    background: #f8f8f8;\n}\n.flexp li.active, .flexp li.disabled {\n    cursor: default;\n}\n", map: {"version":3,"sources":["/home/vagrant/code/flex-pagination/src/js/components/Pagination.vue"],"names":[],"mappings":";AAkLA;IACA,cAAA;IACA,UAAA;IACA,SAAA;IACA,gBAAA;AACA;AAEA;IACA,yBAAA;IACA,eAAA;IACA,iBAAA;IACA,kCAAA;IACA,WAAA;IACA,iBAAA;AACA;AAEA;IACA,8BAAA;AACA;AAEA;IACA,cAAA;IACA,mBAAA;AACA;AAEA;IACA,eAAA;AACA","file":"Pagination.vue","sourcesContent":["<script>\r\n    import validator from '../utils/validator';\r\n    import helpers from '../utils/helpers';\r\n\r\n    export default {\r\n        name: 'flex-pagination',\r\n        props: {\r\n            pagination: {\r\n                type: Object,\r\n                required: true,\r\n                validator: validator.isValidPagination\r\n            },\r\n            range: {\r\n                type: Object,\r\n                required: false,\r\n                validator: validator.isValidRange\r\n            },\r\n            config: {\r\n                type: Object,\r\n                required: false,\r\n                validator: validator.isValidConfig\r\n            }\r\n        },\r\n        data() {\r\n            return {\r\n                default: {\r\n                    range: {\r\n                        before: 5,\r\n                        after: 5\r\n                    },\r\n                    config: {\r\n                        show: {\r\n                            first: true,\r\n                            last: true,\r\n                            next: true,\r\n                            prev: true\r\n                        },\r\n                        scroll: {\r\n                            prefix: null\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        },\r\n        computed: {\r\n\r\n            normalizedPage() {\r\n                return this.pagination.page > this.pagination.total ? this.pagination.total : this.pagination.page;\r\n            }\r\n\r\n        },\r\n        methods: {\r\n\r\n            getShow(to) {\r\n                return helpers.hasInnerProperty(this.config, 'show.' + to) ? this.config.show[to] : this.default.config.show[to];\r\n            },\r\n\r\n            getRangeLength(position) {\r\n                return helpers.hasInnerProperty(this.range, position) ? this.range[position] : this.default.range[position];\r\n            },\r\n\r\n            getRangeBefore() {\r\n                let start = this.pagination.page - this.getRangeLength('before');\r\n                start = start < 1 ? 1 : start;\r\n                let end = this.pagination.page - 1;\r\n                return helpers.rangeToArray(start, end);\r\n            },\r\n\r\n            getRangeAfter() {\r\n                let end = this.pagination.page + this.getRangeLength('after');\r\n                end = end > this.pagination.total ? this.pagination.total : end;\r\n                let start = this.pagination.page + 1;\r\n                start = this.pagination.page >= this.pagination.total ? this.pagination.page + 1 : start;\r\n                return helpers.rangeToArray(start, end);\r\n            },\r\n\r\n            getPrev() {\r\n                return this.hasPrev() ? this.pagination.page - 1 : this.pagination.page;\r\n            },\r\n\r\n            getNext() {\r\n                return this.hasNext() ? this.pagination.page + 1 : this.pagination.total;\r\n            },\r\n\r\n            hasPrev() {\r\n                return this.pagination.page - 1 > 0;\r\n            },\r\n\r\n            hasNext() {\r\n                return this.pagination.page + 1 <= this.pagination.total;\r\n            },\r\n\r\n            setPage(page) {\r\n                if (this.pagination.page !== page) {\r\n                    this.pagination.page = page;\r\n                    this.$emit('flexp:page', this.pagination.page);\r\n                }\r\n            }\r\n\r\n        }\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"flexp\">\r\n        <ul class=\"flexp-nav\">\r\n\r\n            <li class=\"flexp-btn flexp-first\"\r\n                v-if=\"getShow('first')\"\r\n                @click=\"setPage(1)\"\r\n                :class=\"{disabled: !hasPrev()}\">\r\n                <slot name=\"flexp-first\">\r\n                    <div class=\"flexp-btn-icon\">\r\n                        First\r\n                    </div>\r\n                </slot>\r\n            </li>\r\n\r\n            <li class=\"flexp-btn flexp-previous\"\r\n                v-if=\"getShow('prev')\"\r\n                @click=\"setPage(getPrev())\"\r\n                :class=\"{disabled: !hasPrev()}\">\r\n                <slot name=\"flexp-previous\">\r\n                    <div class=\"flexp-btn-icon\">\r\n                        Previous\r\n                    </div>\r\n                </slot>\r\n            </li>\r\n\r\n            <li class=\"flexp-btn flexp-range-before\"\r\n                v-for=\"iterator in getRangeBefore()\"\r\n                @click=\"setPage(iterator)\">\r\n                <div class=\"flexp-btn-icon\">\r\n                    {{ iterator }}\r\n                </div>\r\n            </li>\r\n\r\n            <li class=\"flexp-btn flexp-page active\">\r\n                <slot name=\"flexp-first\">\r\n                    {{ normalizedPage }}\r\n                </slot>\r\n            </li>\r\n\r\n            <li class=\"flexp-btn flexp-range-after\"\r\n                v-for=\"iterator in getRangeAfter()\"\r\n                @click=\"setPage(iterator)\">\r\n                <div class=\"flexp-btn-icon\">\r\n                    {{ iterator }}\r\n                </div>\r\n            </li>\r\n\r\n            <li class=\"flexp-btn flexp-next\"\r\n                v-if=\"getShow('next')\"\r\n                @click=\"setPage(getNext())\"\r\n                :class=\"{disabled: !hasNext()}\">\r\n                <slot name=\"flexp-next\">\r\n                    <div class=\"flexp-btn-icon\">\r\n                        Next\r\n                    </div>\r\n                </slot>\r\n            </li>\r\n\r\n            <li class=\"flexp-btn flexp-last\"\r\n                v-if=\"getShow('last')\"\r\n                @click=\"setPage(pagination.total)\"\r\n                :class=\"{disabled: !hasNext()}\">\r\n                <slot name=\"flexp-first\">\r\n                    <div class=\"flexp-btn-icon\">\r\n                        Last\r\n                    </div>\r\n                </slot>\r\n            </li>\r\n\r\n        </ul>\r\n    </div>\r\n</template>\r\n\r\n<style>\r\n    .flexp li, .flexp ul {\r\n        display: block;\r\n        padding: 0;\r\n        margin: 0;\r\n        list-style: none;\r\n    }\r\n\r\n    .flexp li {\r\n        border: 1px solid #cccccc;\r\n        cursor: pointer;\r\n        padding: 3px 11px;\r\n        background: rgba(255, 255, 255, 1);\r\n        float: left;\r\n        margin: 0 2px 0 0;\r\n    }\r\n\r\n    .flexp li:hover, .flexp li.active, .flexp li.disabled {\r\n        background: rgba(0, 0, 0, .08);\r\n    }\r\n\r\n    .flexp li.disabled {\r\n        color: #cccccc;\r\n        background: #f8f8f8;\r\n    }\r\n\r\n    .flexp li.active, .flexp li.disabled {\r\n        cursor: default;\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var FlexPagination = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );return FlexPagination;}));