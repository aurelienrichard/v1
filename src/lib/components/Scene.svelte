<script lang="ts">
	import { T } from '@threlte/core'
	import Block from '$lib/components/Block.svelte'
	import Preview from '$lib/components/Preview.svelte'
	import { useTexture, Grid, interactivity } from '@threlte/extras'
	import { texturePaths, getRandomArrayValue } from '$lib/utils'
	import { PerspectiveCamera, Raycaster, Vector2, Vector3, type Mesh } from 'three'

	const textures = useTexture(texturePaths)
	let pointer = $state(new Vector2())
	let previewPosition = $state(new Vector3())
	$inspect(previewPosition)
	let camera = $state<PerspectiveCamera>()
	let raycaster = $state<Raycaster>()
	let collidableObjects = $state<Mesh[]>([])

	const onpointermove = (event: PointerEvent) => {
		if (!camera || !raycaster) return

		pointer = new Vector2(
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		)

		raycaster.setFromCamera(pointer, camera)

		const intersects = raycaster.intersectObjects(collidableObjects, false)
		if (intersects.length === 0) return

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const intersect = intersects[0]!

		previewPosition = new Vector3(
			...previewPosition
				.copy(intersect.point)
				.divideScalar(50)
				.floor()
				.multiplyScalar(50)
				.addScalar(25)
		)

		previewPosition = new Vector3(
			previewPosition.x,
			Math.max(25, previewPosition.y),
			previewPosition.z
		)
	}
</script>

<svelte:window {onpointermove} />

<T.PerspectiveCamera
	bind:ref={camera}
	makeDefault
	fov={45}
	position={[200, 400, 800]}
	near={1}
	far={10000}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0)
	}}
/>
<T.Raycaster bind:ref={raycaster} />

<!-- Grid -->
<T.GridHelper args={[600, 12]} />
<T.Mesh
	rotation.x={-Math.PI / 2}
	oncreate={(ref) => {
		collidableObjects.push(ref)
	}}
>
	<T.PlaneGeometry args={[600, 600]} />
	<T.MeshBasicMaterial visible={false} />
</T.Mesh>

<Preview position={previewPosition} />

{#await textures then matcaps}
	<!-- <Block position={new Vector3(0, 0, 0)} matcap={getRandomArrayValue(matcaps)} /> -->
{/await}
