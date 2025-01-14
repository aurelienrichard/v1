<script lang="ts">
	import { T } from '@threlte/core'
	import { RoundedBoxGeometry } from '@threlte/extras'
	import { Vector3 } from 'three'

	interface Props {
		position: Vector3
	}

	let { position }: Props = $props()
</script>

<T.Mesh position={position.toArray()}>
	<RoundedBoxGeometry args={[50, 50, 50]} />
	<T.MeshBasicMaterial color="#000" opacity={0.5} transparent />
</T.Mesh>
