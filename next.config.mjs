/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next's dev server blocks HMR/asset requests from origins other than localhost by default.
  // Without this, opening the site from a phone on the same Wi-Fi via the machine's LAN IP
  // (e.g. http://192.168.88.2:3000) loads the page but silently breaks all interactivity
  // (steppers, menu) because the HMR websocket handshake gets rejected.
  // [TODO: update/add your machine's LAN IP here if it changes, e.g. after reconnecting to Wi-Fi]
  allowedDevOrigins: ["192.168.88.2", "192.168.88.12"],
};

export default nextConfig;
