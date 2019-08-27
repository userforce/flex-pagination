let Helpers = function() {

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

export default new Helpers();