/*eslint strict: 0,
         no-console: 0 */

(function () {
    'use strict';

    const fs = require('fs'),
          path = require('path'),
          express = require('express');

    const logPrefix = '[Router]:';

    console.log(`\n${logPrefix} In file.`);


    //*********************************************
    class Router {

        //=========================================
        //=====          Constructor          =====
        //=========================================
        constructor() {
            this.startFolder = null;
        }

        //=========================================
        //=====       Router Functions        =====
        //=========================================
        load(app, folderName) {
            // This function is called once during
            // initial server startup

            if (!this.startFolder) {
                this.startFolder = path.basename(folderName);
            }

            fs.readdirSync(folderName)
              .forEach(file => {

                  let fullName = path.join(folderName, file);
                  const stat = fs.lstatSync(fullName);

                  if (stat.isDirectory()) {
                      // Recursively walk-through folders
                      this.load(app, fullName);
                  }
                  else if (file.toLowerCase().indexOf('.js')) {
                      // Grab path to JavaScript file and use it to construct the route
                      const dirs = path.dirname(fullName).split(path.sep);

                      // Remove preceding folders
                      if (dirs[0].toLowerCase() === 'server') {
                          dirs.splice(0, 1);
                          fullName = fullName.replace('server\\', '');
                      }
                      else if (dirs[0].toLowerCase() === 'src' && dirs[1].toLowerCase() === 'server') {
                          dirs.splice(0, 2);
                          fullName = fullName.replace('src\\server\\', '');
                      }

                      if (dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
                          dirs.splice(0, 1);
                      }

                      const router = express.Router(),
                            baseRoute = `/${dirs.join('/')}`; //Generate the route

                      console.log(`${logPrefix} Load(). Route: ${baseRoute} [${fullName}]`);

                      // Load the JavaScript file ("controller") and pass the router to it
                      const ControllerClass = require(`../${fullName.replace('server/', '')}`);
                      const controller = new ControllerClass(router);

                      // Associate the route with the router
                      app.use(baseRoute, router);
                  }
              });
        }
    }


    module.exports = new Router();
})();