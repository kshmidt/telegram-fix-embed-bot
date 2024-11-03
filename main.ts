import "@std/dotenv/load";
import {
  Bot,
  InlineQueryResultBuilder,
} from "https://deno.land/x/grammy@v1.31.0/mod.ts";

const tokenVar = "API_TOKEN";
const token = Deno.env.get(tokenVar);

if (!token) {
  console.error(
    `Error: ${tokenVar} is not provided. Please add it to your environment variables or .env file.`,
  );
  Deno.exit(1);
}

const linkReplacementRules: Record<string, string> = {
  "twitter.com": "fxtwitter.com",
  "x.com": "fixupx.com",
  "instagram.com": "ddinstagram.com",
};

function replaceLink(url: string): string {
  for (
    const [originalDomain, newDomain] of Object.entries(linkReplacementRules)
  ) {
    const regex = new RegExp(`https?://(www\\.)?${originalDomain}`);
    if (regex.test(url)) {
      return url.replace(regex, `https://${newDomain}`);
    }
  }
  return url;
}

function extractUrls(text: string): string[] {
  const query = text.trim().split("\n").map((x) => x.trim());

  const urls: string[] = [];

  for (const line of query) {
    let startIndex = 0;

    while (startIndex < line.length) {
      const httpIndex = line.indexOf("http", startIndex);
      if (httpIndex === -1) break;

      let endIndex = line.length;

      const nextHttpIndex = line.indexOf("http", httpIndex + 4);
      const nextWhitespaceIndex = line.indexOf(" ", httpIndex);

      if (nextHttpIndex !== -1 && nextHttpIndex < endIndex) {
        endIndex = nextHttpIndex;
      }

      if (nextWhitespaceIndex !== -1 && nextWhitespaceIndex < endIndex) {
        endIndex = nextWhitespaceIndex;
      }

      const url = line.slice(httpIndex, endIndex);
      urls.push(url);

      startIndex = endIndex;
    }
  }

  return urls;
}

const bot = new Bot(token);

bot.on("message:text", async (ctx) => {
  const messageText = ctx.message.text;

  if (messageText) {
    const urls = extractUrls(messageText);

    for (const url of urls) {
      const modifiedUrl = replaceLink(url);

      if (modifiedUrl !== url) {
        await ctx.reply(modifiedUrl)
          .catch((error) => console.error("Failed to send message:", error));
      }
    }
  }
});

bot.on("inline_query", async (ctx) => {
  const query = ctx.inlineQuery.query.trim();

  if (query) {
    const urls = extractUrls(query);
    console.log(urls);

    const results = urls.map((url, index) => {
      const modifiedUrl = replaceLink(url);

      return InlineQueryResultBuilder
        .article(String(index), "Modified link", {
          description: modifiedUrl,
        }).text(modifiedUrl);
    });

    await ctx.answerInlineQuery(results).catch(
      (error) => {
        console.error("Failed to answer inline query:", error);
      },
    );
  }
});

bot.start({
  onStart: () => console.log("Bot is running..."),
});
