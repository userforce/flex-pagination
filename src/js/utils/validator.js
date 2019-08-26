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
        if (typeof config === "object") {

        }
        return true;
    };

    self.isValidAnchor = function (anchor = '') {
        if (typeof config === "string") {

        }
        return true;
    };

};

export default new Validator();