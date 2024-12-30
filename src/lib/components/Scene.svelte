<script lang="ts">
	import { T } from '@threlte/core'
	import { OrbitControls, interactivity } from '@threlte/extras'
	import { Spring } from 'svelte/motion'

	interactivity()

	let rotation = new Spring(0)

	const colors = ['#018a46', '#ffe456', '#df2f31', '#f6f9fd', '#2362fd', '#f36726']
</script>

<!-- Camera -->
<T.PerspectiveCamera makeDefault fov={75} position={[-3, 3, 3]}>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<!-- Lights -->
<T.AmbientLight intensity={1} />

<!-- Object -->
<T.Mesh
	rotation.y={rotation.current}
	onclick={() => {
		rotation.target = rotation.current - Math.PI / 2
	}}
>
	<T.BoxGeometry />
	{#each colors as color}
		<T.MeshStandardMaterial
			{color}
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
