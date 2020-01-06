<script>
    import {InertiaLink} from '@inertiajs/inertia-svelte';
    import Icon from '@/Shared/Icon.svelte';

    export let icon;
    export let link;
    export let text;

    const route = window.route;
    let isActive = route().current(link + '*');
</script>

<div class="mb-4">
    <InertiaLink href={route(link)} class="flex items-center group py-3">
        <Icon name={icon} className="w-4 h-4 mr-2 {isActive ? 'text-white fill-current' : 'text-indigo-400 group-hover:text-white fill-current'}" />
        <div class={isActive ? 'text-white' : 'text-indigo-200 group-hover:text-white'}>{text}</div>
    </InertiaLink>
</div>
