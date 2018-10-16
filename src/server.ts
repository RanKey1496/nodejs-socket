import 'reflect-metadata';
import App from './app';

console.info(`
888b    888          888    d8b  .d888 d8b                   888    d8b                        .d8888b.                            d8b
8888b   888          888    Y8P d88P"  Y8P                   888    Y8P                       d88P  Y88b                           Y8P
88888b  888          888        888                          888                              Y88b.
888Y88b 888  .d88b.  888888 888 888888 888  .d8888b  8888b.  888888 888  .d88b.  88888b.       "Y888b.    .d88b.  888d888 888  888 888  .d8888b  .d88b.
888 Y88b888 d88""88b 888    888 888    888 d88P"        "88b 888    888 d88""88b 888 "88b         "Y88b. d8P  Y8b 888P"   888  888 888 d88P"    d8P  Y8b
888  Y88888 888  888 888    888 888    888 888      .d888888 888    888 888  888 888  888           "888 88888888 888     Y88  88P 888 888      88888888
888   Y8888 Y88..88P Y88b.  888 888    888 Y88b.    888  888 Y88b.  888 Y88..88P 888  888     Y88b  d88P Y8b.     888      Y8bd8P  888 Y88b.    Y8b.
888    Y888  "Y88P"   "Y888 888 888    888  "Y8888P "Y888888  "Y888 888  "Y88P"  888  888      "Y8888P"   "Y8888  888       Y88P   888  "Y8888P  "Y8888
`);

process.on('uncaughtException', (err) => {
    console.error(`
    --------------------
    Unhandled Exception:
    ${err.message}
    --------------------
    `);
});

process.on('unhandledRejection', (err) => {
    console.error(`
    --------------------
    Unhandled Rejection:
    ${err.message}
    --------------------
    `);
});

const app: App = new App();
app.start();
module.exports = app;