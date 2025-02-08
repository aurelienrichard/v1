<script lang="ts">
	import { T } from '@threlte/core'
	import Block from '$lib/components/Block.svelte'
	import Preview from '$lib/components/Preview.svelte'
	import { useTexture } from '@threlte/extras'
	import { texturePaths, getRandomArrayValue } from '$lib/utils'
	import { PerspectiveCamera, Raycaster, Vector2, Vector3, type Mesh } from 'three'

	type xyzCoordinates = [number, number, number]
	type xyCoordinates = [number, number]

	const textures = useTexture(texturePaths)
	let previewPosition = $state<xyzCoordinates>([0, 0, 0])
	let blockPositions = $state<xyzCoordinates[]>([])
	let pointer = $state<xyCoordinates>([0, 0])
	let camera = $state<PerspectiveCamera>()
	let raycaster = $state<Raycaster>()
	let collidableObjects = $state<Mesh[]>([])

	const onpointermove = (event: PointerEvent) => {
		if (!camera || !raycaster) return

		pointer = [
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		]

		raycaster.setFromCamera(new Vector2(...pointer), camera)

		const intersects = raycaster.intersectObjects(collidableObjects, false)
		if (intersects.length === 0) return

		const [intersect] = intersects
		if (!intersect) return

		const newPreviewPosition = new Vector3()
			.copy(intersect.point)
			.divideScalar(50)
			.floor()
			.multiplyScalar(50)
			.addScalar(25)

		newPreviewPosition.y = Math.max(25, newPreviewPosition.y)

		previewPosition = newPreviewPosition.toArray()
	}

	const onpointerdown = (event: PointerEvent) => {
		if (!camera || !raycaster) return

		pointer = [
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		]

		raycaster.setFromCamera(new Vector2(...pointer), camera)

		const intersects = raycaster.intersectObjects(collidableObjects, false)
		if (intersects.length === 0) return

		const [intersect] = intersects
		if (!intersect) return

		const newBlockPosition = new Vector3()
			.copy(intersect.point)
			.divideScalar(50)
			.floor()
			.multiplyScalar(50)
			.addScalar(25)

		newBlockPosition.y = Math.max(25, newBlockPosition.y)

		blockPositions.push(newBlockPosition.toArray())
	}
</script>

<svelte:window {onpointermove} {onpointerdown} />

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
	{#each blockPositions as position}
		<Block
			{position}
			matcap={getRandomArrayValue(matcaps)}
			oncreate={(ref: Mesh) => {
				collidableObjects.push(ref)
			}}
		/>
	{/each}
{/await}
