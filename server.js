/*eslint strict: 0 */

(function () {
    'use strict';

    const express = require('express'),
          bodyParser = require('body-parser'),
          cookieParser = require('cookie-parser'),
          errorhandler = require('errorhandler'),
          morgan = require('morgan'),
          cors = require('cors'),
          app = express();

    const router = require('./server/routes/router'),
          logger = require('./server/services/logger.service');

    const logPrefix = '[Server]:',
          port = 3035;


    logger.debug(`${logPrefix} In Server.js file.`);

    //*********************************************
    class Server {

        //=========================================
        //=====          Constructor          =====
        //=========================================
        constructor() {
            logger.debug(`${logPrefix} Constructor(). In function.`);

            this.initExpressMiddleWare();
            this.initCustomMiddleware();
            this.initRoutes();
            this.start();
        }

        //=========================================
        //=====       Server Functions        =====
        //=========================================
        start() {
            logger.debug(`\n${logPrefix} Start(). Starting port: `, port);

            app.listen(port, (err) => {
                logger.debug(`${logPrefix} Start(). [%s] Listening on http://localhost:%d: `, process.env.NODE_ENV, port);
            });
        }

        initExpressMiddleWare() {
            logger.debug(`${logPrefix} InitExpressMiddleWare(). Initializing Express MiddleWare.`);

            app.use(express.static(__dirname));
            app.use(morgan('dev'));
            app.use(cors());
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
            app.use(errorhandler());
            app.use(cookieParser());

            process.on('uncaughtException', (err) => {
                if (err) {
                    logger.error(`${logPrefix} InitExpressMiddleWare(). Error: `, err, err.stack);
                }
            });
        }

        initCustomMiddleware() {
            logger.debug(`${logPrefix} InitCustomMiddleware(). Initializing custom Middleware.`);

            if (process.platform === 'win32') {
                require('readline')
                    .createInterface({
                        input: process.stdin,
                        output: process.stdout
                    })
                    // .on('SIGINT', () => {
                    //     logger.debug(`${logPrefix} InitCustomMiddleware(). SIGINT: Closing connections.`);
                    // });
            }

            // process.on('SIGINT', () => {
            //     logger.debug(`${logPrefix} InitCustomMiddleware(). SIGINT: Closing connections.`);
            // });
        }

        initRoutes() {
            logger.debug(`${logPrefix} InitRoutes(). Initializing Node server rountes.`);

            router.load(app, './server/controllers');
        }
    }


    const server = new Server();
})();