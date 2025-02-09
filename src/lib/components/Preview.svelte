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
	<T.MeshBasicMaterial color="#fff" opacity={0.8} transparent />
</T.Mesh>
