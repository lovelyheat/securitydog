const { Listener } = require('@sapphire/framework');
const { blue, gray, green, magenta, magentaBright, white, yellow } = require('colorette');
const { ActivityType } = require('discord.js');

const dev = process.env.NODE_ENV !== 'production';
const style = dev ? yellow : blue;

class UserEvent extends Listener {
	constructor(context, options = {}) {
		super(context, {
			...options,
			once: true
		});
	}

	run(client) {
		client.user.setActivity('ready | ;;help', {
			type: ActivityType.Watching
		});
		this.printStoreDebugInformation();
	}


	printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop();

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	styleStore(store, last) {
		return gray(`${last ? '└─' : '├─'} Loaded ${style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}

module.exports = {
	UserEvent
};
