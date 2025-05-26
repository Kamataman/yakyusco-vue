# やきゅスコ フロントエンド

### デプロイ方法

```sh
npm run build
aws s3 sync dist/ s3://yakyusco-vue --delete
```

### Vite PWA

[Guide](https://vite-pwa-org.netlify.app/guide/)

```sh
npm install -D vite-plugin-pwa
```

### Quasar

[Guide](https://quasar.dev/start/vite-plugin)

```sh
npm install --save quasar @quasar/extras
npm install --save-dev @quasar/vite-plugin sass-embedded@^1.80.2
```

### Router

[Guide](https://router.vuejs.org/installation.html)

```sh
npm install vue-router@4
```

### Pinia

[Guide](https://pinia.vuejs.org/getting-started.html)

```sh
npm install pinia
```
