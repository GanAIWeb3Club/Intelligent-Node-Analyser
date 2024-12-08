## EVM/Chain access

Gateway provider: https://developer.metamask.io/ (ex infura.io)

### Base Sepolia

- HTTP endpoint: <https://base-sepolia.infura.io/v3/0224d8028ef4406aae639f9254db2112>
- WEB socket: wss://base-sepolia.infura.io/ws/v3/0224d8028ef4406aae639f9254db2112

## Gaianet API

### API schema from Gaianet doc

```bash
curl -X POST https://0x1dc779a3fe48a325674541ef8394c16c8647486d.us.gaianet.network/v1/chat/completions  -H 'accept: application/json'  -H 'Content-Type: application/json' -d '{"messages":[{"role":"system", "content": "You are a helpful assistant."}, {"role":"user", "content": "Where is Paris?"}]}'
```

### API calls real examples

Check here [gaianet.api.http](/api/gaianet.api.http).

> Node [config.json](/gaianet_config.json) example

### Node for experiments

Server: ssh root@62.169.21.193  
Password: secret  

Grafana: <http://62.169.21.193:3000/d/rYdddlPWk/node-exporter-full?orgId=1&refresh=1m>  
Creds: admin/3HfebQFrzhM5QgA

Gaianet node: `"address": "0xe81b08d4b69efb83ce47c14de9947d38115187f4"`

## Telegram bot

Created via @BotFather

Done! Congratulations on your new bot. You will find it at [t.me/gaia_check_my_nodes_bot](t.me/gaia_check_my_nodes_bot). You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:

> 7777874250:AAFa_HX0TasMAxRYavtyHs7hcpe0viW7EQs

*Keep your token secure and store it safely, it can be used by anyone to control your bot*

For a description of the Bot API, see this page: https://core.telegram.org/bots/api

### Retrieve user

https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates

Look for the chat object in the response to get the id.

```json
        "chat": {
           "id": 1920962907,
           "first_name": "Andrii",
           "last_name": "Skr",
           "username": "Andrii_Kot",
           "type": "private"
        },
```

### Existing users

```json
  { user:'andrii', chatId: '1920962907' },
  { user: 'sergio', chatId: '1081378216' },
  { user: 'jan', chatId: '575030986' }
```

## Target Nodes

Check API requests in [target.nodes.http](/api/target.nodes.http).