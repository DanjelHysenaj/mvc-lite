(function(global) {

    var uid = 0;

    global.App.Injectable('bind-for', {
        getter: function(statement, $scope) {
            var words = statement.split(' '),
                result = {
                    id: uid++
                };
            for(var w = 0; w < words.length; w++) {
                if(words[w] === 'in' && w > 0 && w < (words.length-1)) {
                    try {
                        with($scope) {
                            result.array = eval(words[w+1]);
                        }
                    } catch(err) {
                        throw err;
                    }
                    result.varName = words[w-1];
                }
            }
            return result;
        },
        compare: function(oldVal, newVal) {
            return oldVal.array === newVal.array;
        },
        modifier: function(compNode, value) {
            compNode.self = document.createElement('iterator');
            compNode.self.setAttribute('id_' +  + value.id.toString(), '');
            compNode.multipleNodes = true;
            compNode.iterator = value;
        }
    });

})(Function('return this')());