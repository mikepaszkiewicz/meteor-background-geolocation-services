Package.describe({
  name: 'background-geolocation-plus',
  version: '1.0.0',
  summary: 'Swift 3 test of Cordova Background Geolocation For Android and iOS',
  documentation: 'README.md'
});

Cordova.depends({
  "cordova-plugin-geolocation" : "2.1.0",
  "org.flybuy.cordova.background-location-services" : "https://github.com/pmwisdom/cordova-background-geolocation-services.git#9e499cf0e60a9ea77383781ad3b083fa1c1592ae"
});

Package.onUse(function(api) {
  api.versionsFrom('1.4');
  api.addFiles('background-geolocation-plus.js');
  api.export('BackgroundLocation');
});
