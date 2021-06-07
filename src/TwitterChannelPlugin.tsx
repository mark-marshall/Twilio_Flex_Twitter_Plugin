import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'TwitterChannelPlugin';

export default class TwitterChannelPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager) {
    this.registerReducers(manager);
    const twitterDMChannel = flex.DefaultTaskChannels.createChatTaskChannel("twitterDMChannel",
    (task) => task.attributes.detailedChannel && task.attributes.detailedChannel === 'Twitter');
    twitterDMChannel.colors = { main: '#062030' }
    twitterDMChannel.icons = { main: <img src='https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo-700x394.png'/>, list: <img src='https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png'/>, active: <img src='https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png'/> }
    flex.TaskChannels.register(twitterDMChannel);
  }
  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // tslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
