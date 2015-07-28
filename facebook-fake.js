HttpInterceptor = Package['xolvio:http-interceptor'].HttpInterceptor;
HttpInterceptor.registerInterceptor('https://www.facebook.com', Meteor.absoluteUrl('fake.www.facebook.com'));
HttpInterceptor.registerInterceptor('https://graph.facebook.com', Meteor.absoluteUrl('fake.graph.facebook.com'));

var querystring = Npm.require('querystring');


Router.route('fake.www.facebook.com/v2.2/dialog/oauth', function() {
    var parameters = _fixIronRouterBug(this.request.query);
    this.response.writeHead(301, {'Location': parameters.redirect_uri + '?code=a1b2c3d4e5f6g7h8i9j0' + '&state=' + parameters.state});
    this.response.end();
}, {where: 'server'});

Router.route('fake.graph.facebook.com/v2.2/oauth/access_token', function() {
    var cannedResponse = {
        'access_token': 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0'
    };
    this.response.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    this.response.end(querystring.stringify(cannedResponse));
}, {where: 'server'});

Router.route('fake.graph.facebook.com/v2.2/me', function() {
    var cannedResponse = {
        'id': 1234567,
        'name': 'Frodo Baggins',
        'first_name': 'Frodo',
        'last_name': 'Baggins',
        'email': 'frodo@bag.end',
        'link': 'https://www.facebook.com/app_scoped_user_id/1234567/',
        'gender': 'male',
        'locale': 'en_NZ'
    };
    this.response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    this.response.end(JSON.stringify(cannedResponse));
}, {where: 'server'});

Router.route('fake.graph.facebook.com/me/picture', function() {
    var cannedResponse = {
        'data': {
            'url': 'http://images2.fanpop.com/images/photos/7800000/Frodo-Baggins-frodo-7808556-400-300.jpg'
        }
    };
    this.response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    this.response.end(JSON.stringify(cannedResponse));
}, {where: 'server'});


_fixIronRouterBug = function(query) {
    if (query.redirect_uri.indexOf('http:/') !== -1 && query.redirect_uri.indexOf('http://') === -1) {
        query.redirect_uri = query.redirect_uri.replace('http:/', 'http://')
    }
    return query;
};
