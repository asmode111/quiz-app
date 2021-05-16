import sqlite3 from "sqlite3";
import { Service } from "typedi";

import config from "../config";

@Service()
class DbConnection {  
  public getConnection() {
    return (new sqlite3.Database(config.databaseURL, sqlite3.OPEN_READWRITE));
  }
}

export { DbConnection };