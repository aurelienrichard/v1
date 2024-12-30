<script lang="ts">
	import github from '$lib/assets/github.svg'
	import linkedin from '$lib/assets/linkedin.svg'
	import bluesky from '$lib/assets/bluesky.svg'
	import discord from '$lib/assets/discord.svg'
	import reddit from '$lib/assets/reddit.svg'
</script>

<footer class="absolute bottom-6 flex w-full items-center justify-center gap-4 text-white">
	<a
		href="https://github.com/aurelienrichard"
		class="opacity-60 transition-opacity hover:opacity-100"
	>
		<img src={github} alt="GitHub" class="h-5" />
	</a>
	<a
		href="https://www.linkedin.com/in/aurelienrichard"
		class="opacity-60 transition-opacity hover:opacity-100"
	>
		<img src={linkedin} alt="LinkedIn" class="h-5" />
	</a>
	<a
		href="https://bsky.app/profile/aurelienrichard.com"
		class="opacity-60 transition-opacity hover:opacity-100"
	>
		<img src={bluesky} alt="Bluesky" class="h-5" />
	</a>
	<a href="https://discord.gg/SQ5g6XUswr" class="opacity-60 transition-opacity hover:opacity-100">
		<img src={discord} alt="Discord" class="h-5" />
	</a>
	<a
		href="https://www.reddit.com/user/aurelienrichard"
		class="opacity-60 transition-opacity hover:opacity-100"
	>
		<img src={reddit} alt="Reddit" class="h-5" />
	</a>
</footer>
