var superagent = require('./');

var request = superagent.get('/')
request.set('foo', 'bar')
//> r.set({foo: 'bar'})
