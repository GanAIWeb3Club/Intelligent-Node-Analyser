## Gaianet API

### API schema from Gaianet doc

```bash
curl -X POST https://0x1dc779a3fe48a325674541ef8394c16c8647486d.us.gaianet.network/v1/chat/completions  -H 'accept: application/json'  -H 'Content-Type: application/json' -d '{"messages":[{"role":"system", "content": "You are a helpful assistant."}, {"role":"user", "content": "Where is Paris?"}]}'
```

### API calls real examples

Check here [gaianet.api.http](/api/gaianet.api.http).

> Node [config.json](/gaianet_config.json) example

## Telegram bot

Created via @BotFather

Done! Congratulations on your new bot. You will find it at [t.me/gaia_check_my_nodes_bot](t.me/gaia_check_my_nodes_bot). You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api

### Retrieve user

https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates

Look for the chat object in the response to get the id.

```json
        "chat": {
           "id": 1920942907,
           "first_name": "Andrii",
           "last_name": "Skrypnychenko",
           "username": "Andrii_Kot",
           "type": "private"
        },
```

### Existing users

```json
  { user:'andrii', chatId: '1920942907' },
  { user: 'sergio', chatId: '1080378216' },
  { user: 'jan', chatId: '575060986' }
```

## Target Nodes

Check API requests in [target.nodes.http](/api/target.nodes.http).

## SQL Lite Database

### Local testing

pnpm rebuild better-sqlite3

### Troubleshooting

Reinstall db in case of ERROR:

```bash
....at initializeDatabase (..../Documents/poland/Intelligent-Node-Analyser/alberta/src/index.ts:210:46) {
  code: 'ERR_DLOPEN_FAILED'
}
 ⛔ ERRORS
   Error starting agents: 
   {"code":"ERR_DLOPEN_FAILED"}
```
