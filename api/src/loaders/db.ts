import sqlite3 from "sqlite3";
import config from "../config";

export default async () => {  
  return (new sqlite3.Database(config.databaseURL, sqlite3.OPEN_READWRITE));
};