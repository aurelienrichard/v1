<script lang="ts">
	import { T } from '@threlte/core'
	import Block from '$lib/components/Block.svelte'
	import { OrbitControls, useTexture } from '@threlte/extras'

	const textures = useTexture([
		'/textures/1.png',
		'/textures/2.png',
		'/textures/3.png',
		'/textures/4.png',
		'/textures/5.png',
		'/textures/6.png'
	])
</script>

<!-- Camera -->
<T.PerspectiveCamera makeDefault fov={75} position={[-3, 3, 3]}>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

{#if $textures}
	<Block textures={$textures} />
{/if}
