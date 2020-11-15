const { App } = require('@slack/bolt');
require('dotenv').config()

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event('message', async ({ event, client }) => {
	try {
		const bitmojiURL = process.env.BITMOJI_EXAMPLE_URL;

		if (
			event.channel_type === 'im' &&
			event.user !== process.env.SLACK_USER_ID &&
			!event.bot_id
		) {
			const { presence } = await client.users.getPresence({ user: process.env.SLACK_USER_ID });

			if (presence === 'away') {
				client.chat.postMessage({
					token: process.env.SLACK_USER_TOKEN,
					channel: event.channel,
					blocks: [
						{
							"type": "header",
							"text": {
								"type": "plain_text",
								"text": "I am offline!",
								"emoji": true
							}
						},
						{
							"type": "image",
							"image_url": bitmojiURL,
							"alt_text": "Bitmoji"
						}
					]
				})
			}

		}
	}
	catch (error) {
		console.error(error);
	}
});

(async () => {
	// Start your app
	await app.start(process.env.PORT || 3000);

	console.log('⚡️ Bolt app is running on ' + (process.env.PORT || 3000));
})();