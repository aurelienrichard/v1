<script lang="ts">
	import { T } from '@threlte/core'
	import { interactivity } from '@threlte/extras'
	import { Spring } from 'svelte/motion'
	import type { Texture } from 'three'

	interface Props {
		textures: Texture[]
	}

	let { textures }: Props = $props()

	interactivity()

	let rotation = new Spring(0)
</script>

<T.Mesh
	rotation.y={rotation.current}
	onclick={() => {
		rotation.target = rotation.current - Math.PI / 2
	}}
>
	<T.BoxGeometry />
	{#each textures as texture}
		<T.MeshMatcapMaterial
			matcap={texture}
			attach={({ parent, ref }) => {
				// @ts-expect-error parent is unknown
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				if (Array.isArray(parent.material)) parent.material = [...parent.material, ref]
				// @ts-expect-error parent is unknown
				else parent.material = [ref]
			}}
			}}
		/>
	{/each}
</T.Mesh>
