<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from '$lib/components/Scene.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
</script>

<Header />
<div
	class="from-surface-0 to-surface-1 fixed left-0 top-0 -z-10 h-screen w-screen bg-gradient-to-b"
>
	<Canvas>
		<Scene />
	</Canvas>
</div>

<Footer />
