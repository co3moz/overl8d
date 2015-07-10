(function (root, factory) {
    // for asynchronous module definition
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory;
        });
    }

    // for commonjs
    else if (typeof exports !== 'undefined') {
        module.exports = factory
    } 
    
    // for browser
    else {
        root.overl8d = factory;
    }
}(this, function overl8d() {
    // stores function groups like [[String, Number], function...],[[], function...]
    var groups = [];

    // temp array, just stores types to the anonymous function.
    var types = [];

    // for every argument
    for (var p in arguments) {
        // check is this argument is callback or not?
        if (arguments[p].name.length == 0) {
            // if it is callback then push new array that holds types and callback.
            groups.push([types, arguments[p]]);

            // create new array and store address in types
            types = [];

            // continue to next argument
            continue;
        }

        // if it isn't callback then it should be a type. ok please add to types array
        types.push(arguments[p]);
    }

    var temp = function () {
        var next, p, i;

        // for every group in groups
        for (p in groups) {
            next = false;
            var temp = groups[p][0];

            // if argument count is same as group argument count
            if (arguments.length === temp.length) {
                // if argument count is not zero
                if (temp.length != 0) {
                    for (i in temp) {
                        // check every type in given parameter
                        if (arguments[i].constructor != temp[i]) {
                            // if some type is not same as group's types then continue to next group
                            next = true;
                            break;
                        }
                    }
                }
            } else {
                // argument count is not same as the group, it's impossible to be same..
                next = true;
            }

            // if groups is matches with argument then call function.
            if (next == false) {
                return groups[p][1].apply(this, arguments);
            }
        }

        // if no arguments matches with group then throw new error :(
        throw new Error("Invalid function parameters");
    };

    // you can get groups with this function. This function acts like reflection. You can change options runtime
    temp.getGroups = function () {
        return groups;
    };

    // return the prepared function.
    return temp;
}));
