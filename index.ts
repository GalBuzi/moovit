import App from './src/app.js'

(async () => {
    await App.startServer()
})().catch(console.log);