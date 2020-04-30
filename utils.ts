import { config } from "dotenv";
import sqlite from "better-sqlite3";
import shortid from "shortid";

// Universal Utilies for writing code on the UShortener code base
// created by raizo
// 30/04/2020


config();

export interface URL {
    originalUrl: string,
    newUrl: string,
    createdAt: number,
}




export const db = sqlite(String(process.env.DB));

export async function isShortenedUrlValid(url: string): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
        const result = db.prepare("SELECT NEW_URL FROM logs WHERE NEW_URL=?").all(url);
        if (result === undefined || result.length == 0) {
            return false;
        } else {
            return true;
        }
    })
}

export async function shortenURL(url: string) {
    const shortenedURL = shortid.generate();
}

export async function log(ip: string,originalUrl: string, newUrl: string,current_time=Date.now) {
    db.prepare("INSERT INTO logs (IP, URL, NEW_URL,CREATED_AT) VALUES (?, ?)").run(ip, originalUrl, newUrl, current_time);
}

