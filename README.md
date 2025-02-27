# Telegram Fix Embed bot
This bot fixes embed preview for social media links.

You can add it to your group chat by [@FxEmbedBot](https://t.me/FxEmbedBot)

## Link support
- Instagram (via [InstaFix](https://github.com/Wikidepia/InstaFix))
- TikTok (via [vxtiktok](https://github.com/dylanpdx/vxtiktok))
- X/Twitter (via [FxTwitter](https://github.com/FixTweet/FxTwitter))
- Reddit (via [fxreddit](https://github.com/MinnDevelopment/fxreddit))
- 9GAG (via [fx9gag](https://github.com/kxalex/fx9gag))

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

To start in development mode with file watching:

```sh
deno task dev
```

To start in production mode:

```sh
deno task start
```

To compile the executable:

```sh
deno task compile
```