const { App } = require('@slack/bolt');
require('dotenv').config()

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET
});


(async () => {
	// Start your app
	await app.start(process.env.PORT || 3000);

	console.log('⚡️ Bolt app is running on ' + (process.env.PORT || 3000));
})();