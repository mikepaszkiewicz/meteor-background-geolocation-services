if(Meteor.isCordova) {
    Meteor.startup(function () {
      debug = BackgroundLocation.config.debug;
        BackgroundLocation.getPlugin();
        if(!BackgroundLocation.options.fetchLocationOnStart){
          if (debug) console.log('fetchlocationonstart is set to false');
        } else {
          console.log('foreground fetch location on start true');
            navigator.geolocation.getCurrentPosition(function (location) {
            if (debug)  console.log('location is' + location.longitude);
            }, function (err) {
              if(err) {  if (debug) console.log("location error" + err.message);
              }
            });
        }
    });
}

var _options = {
    fetchLocationOnStart : true
};

BackgroundLocation = {
    tag : 'BackgroundLocation',
    plugin : null,
    started : false,
    hasLocationCallback : false,
    options : _options,
    config : {
        desiredAccuracy: 1,
        distanceFilter: 1,
        debug: true,
        interval: 1000,
        //Android Only
        notificationTitle: 'BG Plugin',
        notificationText: 'Tracking',
        fastestInterval: 5000,
        useActivityDetection: false
    },
    getPlugin() {
        this.plugin = window.plugins.backgroundLocationServices;
    },
    havePlugin () {
        if(!this.plugin) {
            throw new Meteor.Error(this.tag, 'Could not find the background location plugin, please run BackgroundLocation.getPlugin');
            return false;
        }
        return true;
    },
    configure(config) {
        if(!this.havePlugin()) return;

        if(_.isObject(config)) {
            this.config = config;
            this.plugin.configure(this.config);
        } else {
            throw new Meteor.Error(this.tag, 'Config parameter must be a object')
        }
    },
    registerForLocationUpdates(success, failure){
        if(!this.havePlugin()) return;

        this.hasLocationCallback = true;
        this.plugin.registerForLocationUpdates(success, failure);
    },
    registerForActivityUpdates(success, failure){
        if(!this.havePlugin()) return;

        this.plugin.registerForActivityUpdates(success, failure);
    },
    start() {
        if(!this.havePlugin()) return;

        if(!this.hasLocationCallback) {
            throw new Meteor.Error(this.tag, 'You must register for location updates before starting background location updates');
        }

        this.plugin.start();

    },
    stop() {
        if(!this.havePlugin()) return;

        this.plugin.stop();
    }
};
