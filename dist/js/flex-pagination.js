(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=g||self,g.FlexPagination=f());}(this,function(){'use strict';let Validator = function() {

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
            console.error(name + " must be a number.");
        }
        return isValid;
    };

    let hasRange = function(object) {
        let hasRange = false;
        if (object.hasOwnProperty('range')) {
            hasRange = object.range.hasOwnProperty('before') && object.range.hasOwnProperty('after');
        }
        return hasRange;
    };

    self.isValidPagination = function (pagination = {}) {
        let isValid = false;
        if (typeof pagination === "object") {
            let hasPage = hasRequired(pagination, 'page', 'pagination');
            let hasTotal = hasRequired(pagination, 'total', 'pagination');
            if (hasPage && hasTotal) {
                isValid = isNumber(pagination.page) && isNumber(pagination.total);
            }
            if (hasRange(pagination)) {
                let isValidRangeBefore = isNumber(pagination.range.before, 'pagination.range.before');
                let isValidRangeAfter = isNumber(pagination.range.after, 'pagination.range.after');
                isValid = isValidRangeBefore && isValidRangeAfter;
            }
        }
        return isValid;
    };

    self.isValidConfig = function (config = {}) {
        return true;
    };

    self.isValidAnchor = function (anchor = '') {
        return true;
    };

};

var validator = new Validator();var script = {
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
    _vm._v(
      "\n\n    Hello world!\n\n    " +
        _vm._s(_vm.pagination.page) +
        "\n    " +
        _vm._s(_vm.pagination.total) +
        "\n    " +
        _vm._s(_vm.pagination.range.afterPage) +
        "\n    " +
        _vm._s(_vm.pagination.range.beforePage) +
        "\n"
    )
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