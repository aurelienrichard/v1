<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
</script>

<!-- Camera -->
<T.PerspectiveCamera makeDefault fov={75} position={[-3, 3, 3]}>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<!-- Object -->
<T.Mesh>
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshBasicMaterial color="red" />
</T.Mesh>
