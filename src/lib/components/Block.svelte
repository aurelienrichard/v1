<script lang="ts">
	import { T } from '@threlte/core'
	import { RoundedBoxGeometry } from '@threlte/extras'
	import { Vector3, type Texture } from 'three'

	interface Props {
		matcap: Texture
		position: Vector3
	}

	let { matcap, position }: Props = $props()
</script>

<T.Mesh position={position.toArray()}>
	<RoundedBoxGeometry args={[50, 50, 50]} />
	<T.MeshMatcapMaterial {matcap} />
</T.Mesh>
