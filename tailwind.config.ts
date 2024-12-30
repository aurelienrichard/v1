import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans Variable', ...fontFamily.sans]
			},
			colors: {
				primary: '#cba6f7',
				secondary: '#f38ba8',
				surface: {
					0: '#27272a',
					1: '#09090b'
				}
			}
		}
	},

	plugins: []
} as Config
