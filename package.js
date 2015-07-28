Package.describe({
    name: 'dropz:facebook-fake',
    version: '0.0.1',
    summary: 'A fake for use in testing. Fakes the oauth calls amongst other APIs.',
    git: 'https://github.com/workflow/meteor-facebook-fake',
    debugOnly: true
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(['facebook@1.2.0']);
    api.use(['xolvio:http-interceptor@0.4.0'], ['server']);
    api.use(['iron:router@1.0.6'], ['server']);
    api.add_files('oauth-fake-client.js', 'client');
    api.add_files('facebook-fake.js', ['server']);
});
