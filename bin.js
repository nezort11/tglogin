#!/usr/bin/env node
import process from "process";
import { read } from "read";
import { TelegramClient, sessions } from "telegram";

const main = async () => {
  const apiId = await read({
    prompt: "⚙️  Please enter API id (got from https://my.telegram.org): ",
    silent: true,
    replace: "*",
  });

  const apiHash = await read({
    prompt: "⚙️  Please enter API hash (got from https://my.telegram.org): ",
    silent: true,
    replace: "*",
  });

  console.log("⏳ Logging into telegram account...");
  const client = new TelegramClient(
    new sessions.StringSession(""),
    +apiId,
    apiHash,
    {
      connectionRetries: 5,
    }
  );
  await client.start({
    phoneNumber: async () =>
      await read({ prompt: "📞 Please enter your phone number: " }),
    password: async () =>
      await read({
        prompt: "🔒 Please enter your password: ",
        silent: true,
        replace: "*",
      }),
    phoneCode: async () =>
      await read({ prompt: "💬 Please enter the code you received: " }),
    onError: (error) => console.error(error),
  });

  console.log("✅ Successfully connected. Here is your session id:");
  console.log(client.session.save());
  process.exit(0);
};

main();
