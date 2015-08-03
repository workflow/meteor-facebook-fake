# facebook-fake
A stub for use in testing Meteor apps. Stubs the oauth calls and allows you to fake stub more.

## Usage:

If you are using Facebook authentication, add this package like this:

`meteor add dropz:facebook-fake`

Your app will no longer authenticate with Facebook in development mode and will authenticate with
a fake user even if you do not have an internet connection. This package does not affect production
as it is a `debugOnly` package.

### Facebook Login

Will intercept your facebook login call and create a fake user with all standard public facebook api data.


### Intercepting graph calls

Currently, only the call to retrieve your own picture gets intercepted.
 
Here's an example that will get intercepted and populated with a fake Picture.

Extending the registering user with the URL to her profile pic during registration:


```js
Meteor.users.requestAdditionalFacebookData = function(user) {
    // Public Profile Picture
    var facebook = user.services.facebook;
    var pictureData = Meteor.http.get('https://graph.facebook.com/me/picture', {
        params: {
            access_token: facebook.accessToken,
            redirect: false,
            type: 'large'
        }
    });
    facebook.picture_url = pictureData.data.data.url;

    return user;
};


Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.
    if (options.profile) {
        user.profile = options.profile;
    }
   if (Dropz.helpers.server.hasConnectedService(user, 'facebook')) {
        // Facebook
        Meteor.users.requestAdditionalFacebookData(user);
        // Do other stuff such as data normalization
    }

    return user;
});
```

This package is an example of how to use
[xolvio:http-interceptor](https://github.com/xolvio/meteor-http-interceptor) to test your app.

## Thanks
Inspired by and adapted from [xolvio:github-fake](https://github.com/xolvio/meteor-github-stub).
