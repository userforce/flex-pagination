import helpers from './helpers';

let Validator = function() {

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

export default new Validator();