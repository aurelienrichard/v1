<script lang="ts">
	import { T } from '@threlte/core'
	import { RoundedBoxGeometry } from '@threlte/extras'

	interface Props {
		position: [number, number, number]
	}

	let { position }: Props = $props()
</script>

<T.Mesh {position}>
	<RoundedBoxGeometry args={[1, 1, 1]} />
	<T.MeshBasicMaterial color="#000" opacity={0.5} transparent />
</T.Mesh>
