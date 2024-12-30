import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "codia.advensya",
  appName: "advensya",
  webDir: ".output/public",
  server: {
    androidScheme: "https",
  },
  plugins: {
    // Keyboard: {
    //   resize: KeyboardResize.Body,
    //   // style: KeyboardStyle.Dark,
    //   resizeOnFullScreen: true,
    // },
  },
};

export default config;
