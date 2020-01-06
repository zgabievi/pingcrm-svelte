import { InertiaApp } from '@inertiajs/inertia-svelte';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: process.env.MIX_SENTRY_LARAVEL_DSN
});

const app = document.getElementById('app');

new InertiaApp({
  target: app,
  props: {
    initialPage: JSON.parse(app.dataset.page),
    resolveComponent: name =>
      import(`./Pages/${name}.svelte`).then(module => module.default)
  }
});
