<script lang="ts">
	import { T } from '@threlte/core'
	import { RoundedBoxGeometry } from '@threlte/extras'
	import type { Texture, Mesh } from 'three'

	interface Props {
		matcap: Texture
		position: [number, number, number]
		oncreate: (ref: Mesh) => void
	}

	let { matcap, position, oncreate }: Props = $props()
</script>

<T.Mesh {position} {oncreate}>
	<RoundedBoxGeometry args={[1, 1, 1]} />
	<T.MeshMatcapMaterial {matcap} />
</T.Mesh>
