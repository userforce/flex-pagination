(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=g||self,g.FlexPagination=f());}(this,function(){'use strict';let Helpers = function() {

    this.hasInnerProperty = function(object, path) {
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
        if (!isValid) {
            console.error(name + " must be of type Number.");
        }
        return isValid;
    };

    let isBoolean = function(value, name) {
        let isValid = !!(typeof value === "boolean");
        if (!isValid) {
            console.error(name + " must be of type Boolean.");
        }
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
            return isValidPage(pagination) && isValidTotal(pagination);
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









    self.isValidAnchor = function (anchor = '') {
        return true;
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
    methods: {

    },
    mounted() {

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

var normalizeComponent_1 = normalizeComponent;/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "flexp" }, [
    _c("ul", { staticClass: "flexp-nav" }, [
      _c(
        "li",
        { staticClass: "flexp-btn flexp-first" },
        [
          _vm._t("flexpfirstcontent", [
            _vm._v(
              "\n                    slot default content\n                "
            )
          ])
        ],
        2
      )
    ])
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var FlexPagination = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );return FlexPagination;}));