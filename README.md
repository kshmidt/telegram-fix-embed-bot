# Telegram Fix Embed bot
This bot fixes embed preview for social media links.

You can add it to your group chat by [@FxEmbedBot](https://t.me/FxEmbedBot)

# Link support
- Instagram (via [InstaFix](https://ddinstagram.com/))
- X/Twitter (via [FxTwitter](https://github.com/FixTweet/FxTwitter))
- Reddit (via [fxreddit](https://github.com/MinnDevelopment/fxreddit))

## Prerequisites
- [Deno](https://deno.land/)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/kshmidt/telegram-fx-embed-bot.git
   cd telegram-fx-embed-bot
   ```

2. Create a `.env` file in the root directory and add your Telegram bot API
   token:

   ```properties
   API_TOKEN=your_telegram_bot_api_token
   ```

## Usage

To start the bot in development mode with file watching:

```sh
deno task dev
```

To start the bot in production mode:

```sh
deno task start
```

To compile the bot:

```sh
deno task compile
```