import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import * as config from 'config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const dbURI = process.env.db ? process.env.db: config.get('db').uri;
    console.log(`Connected to: ${dbURI}`);
    return {
      uri: `${dbURI}`,
      useNewUrlParser: true,
      useFindAndModify: false,
      autoIndex: true,
      reconnectTries: 100,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0
    };
  }
}