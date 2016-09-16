/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    /*
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // Check to see if there's an updated version of service-worker.js with
      // new files to cache:
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
      if (typeof registration.update === 'function') {
        registration.update();
      }

      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
    */
  }

      function showSocialsAndInit(){

        var dialog = document.querySelector('dialog');
        var showDialogButton = document.querySelector('#show-connect');
        var showDialogButton2 = document.querySelector('#show-connect2');
        var disconnectButton = document.querySelector('#show-disconnect');
        var disconnectButton2 = document.querySelector('#show-disconnect2');
        if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog);
        }
        showDialogButton.addEventListener('click', function() {
          dialog.showModal();
        });
        showDialogButton2.addEventListener('click', function() {
          dialog.showModal();
        });
        dialog.querySelector('.close').addEventListener('click', function() {
          dialog.close();
        });

        
        var socialConnectBtns = document.querySelectorAll('.btn-connect-social');
        for (var index = 0 ; index < socialConnectBtns.length; index++){          
          socialConnectBtns[index].addEventListener('click', function(event){
              var network = event.target.parentElement.getAttribute('data-social');              
              hello(network).login(network, {}, function(auth){
                  hello(auth.network).api('/me').then(function(r) {
                      //console.info(network, r, r.id);
                      localStorage['userid'] = r.id;
                      localStorage['provider'] = network;
                      location.reload();
                  });
              });
          });
        }

        document.querySelector('.btn-disconnect-social').addEventListener('click', function(event){
          if (localStorage['provider']){            
            hello(localStorage['provider']).logout().then(function() {
            	console.log('Signed out');
              localStorage['userid'] = '';
              localStorage.removeItem('provider');
              location.reload();
            });
          }
        });

        var userid = localStorage['userid'];
        if (userid) {
          showDialogButton.style.display = "none";
          showDialogButton2.style.display = "none";
        } else {
          disconnectButton.style.display = "none";
          disconnectButton2.style.display = "none";
        }

        var creds = {
            google : "312903486392-eu80fphua3j2t4jfahejoq6l9u6p2399.apps.googleusercontent.com",
            twitter : "w3A1eTHDRNs52iQwvbCPyE8H7",
            github : "c558cf728b4e60a65b15",
            facebook : "315143975507418"
        };
        var config = {
            redirect_uri : 'redirect.html',
            scope:'email'
        }

        hello.init(creds,config);

    }

    showSocialsAndInit();



  // Your custom JavaScript goes here
})();
