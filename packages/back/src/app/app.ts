import { IoServer } from '@letssummondemons/common/definitions/io.js';
import * as http from 'http';
import { httpServer } from './http/server.js';
import { ioServer } from './io/server.js';

class App {
  http: http.Server;
  io: IoServer;

  constructor() {
    this.http = httpServer;
    this.io = ioServer;
  }

  start(): App {
    console.log('App started');

    this.http.listen(3000);

    return this;
  }
}

// singleton
export const app = new App();
