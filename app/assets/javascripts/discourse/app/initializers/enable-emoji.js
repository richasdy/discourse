import { withPluginApi } from "discourse/lib/plugin-api";
import { registerEmoji } from "pretty-text/emoji";
import PreloadStore from "discourse/lib/preload-store";

export default {
  name: "enable-emoji",

  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    if (!siteSettings.enable_emoji) {
      return;
    }

    withPluginApi("0.1", (api) => {
      api.onToolbarCreate((toolbar) => {
        toolbar.addButton({
          id: "emoji",
          group: "extras",
          icon: "far-smile",
          action: () => toolbar.context.send("emoji"),
          title: "composer.emoji",
          className: "emoji insert-emoji",
        });
      });
    });

    (PreloadStore.get("customEmoji") || []).forEach((emoji) =>
      registerEmoji(emoji.name, emoji.url, emoji.group)
    );
  },
};
