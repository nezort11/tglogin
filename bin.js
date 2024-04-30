#!/usr/bin/env node
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { TelegramClient, sessions } from "telegram";
import process from "process";

const rl = readline.createInterface({ input, output });

const main = async () => {
    const apiId = await rl.question("Please enter API id (got from https://my.telegram.org): ");
    const apiHash = await rl.question("Please enter API hash (got from https://my.telegram.org): ");

    console.log("Logging into telegram account...)");
    const client = new TelegramClient(new sessions.StringSession(""), +apiId, apiHash, {
        connectionRetries: 5,
    });
    await client.start({
      phoneNumber: async () => await rl.question("Please enter your phone number: "),
      password: async () => await rl.question("Please enter your password: "),
      phoneCode: async () => await rl.question("Please enter the code you received: "),
      onError: (error) => console.error(error),
    });
    rl.close();

    console.log("Successfully connected. Here is your session id:");
    console.log(client.session.save());
    process.exit(0);
}

main();

