<script lang="ts">
	import { T } from '@threlte/core'
	import Block from '$lib/components/Block.svelte'
	import BlockPreview from '$lib/components/BlockPreview.svelte'
	import { useTexture, Grid } from '@threlte/extras'
	import { texturePaths, getRandomArrayValue } from '$lib/utils'
	import { Vector3 } from 'three'

	const textures = useTexture(texturePaths)
</script>

<!-- Camera -->
<T.PerspectiveCamera
	makeDefault
	fov={45}
	position={[4, 8, 16]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0)
	}}
/>

{#await textures then matcaps}
	<Grid gridSize={12} cellColor="#fff" sectionColor="#fff" />
	<Block position={new Vector3(0, 0, 0)} matcap={getRandomArrayValue(matcaps)} />
	<BlockPreview position={new Vector3(0, 0, 0)} />
{/await}
