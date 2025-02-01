return {
	'saghen/blink.cmp',
	build = 'cargo build --release',
	event = { 'InsertEnter', 'CmdlineEnter' },
	dependencies = {
		'rafamadriz/friendly-snippets',
		-- optional: provides snippets for the snippet source
	},
	opts = {
		-- TODO 了解清楚为什么它的keymap set为什么一会儿没问题一会儿有问题 ？
		keymap = {
			['<C-n>'] = { 'select_next', 'fallback' },
			['<C-e>'] = { 'select_prev', 'fallback' },
			['<C-E>'] = { 'scroll_documentation_up', 'fallback' },
			['<C-N>'] = { 'scroll_documentation_down', 'fallback' },
			['<C-i>'] = { 'snippet_forward', 'fallback' },
			['<C-h>'] = { 'snippet_backward', 'fallback' },
			['<Tab>'] = { 'accept', 'fallback' },
			['<S-Tab>'] = { 'hide', 'fallback' },
		},

		completion = {
			-- NOTE:some LSPs may add auto brackets themselves anyway
			accept = { auto_brackets = { enabled = true } },
			list = { selection = { preselect = true, auto_insert = false } },

			menu = {
				min_width = 6,
				-- auto_show = false,
				draw = {
					columns = {
						{ "label", "label_description" },
						{ "kind_icon" },
					},
					treesitter = { 'lsp' }
				}
			},
			documentation = { auto_show = true, auto_show_delay_ms = 500 },
		},
		appearance = {
			-- Set to 'mono' for 'Nerd Font Mono' or 'normal' for 'Nerd Font'
			-- Adjusts spacing to ensure icons are aligned
			nerd_font_variant = 'mono'
		},

		-- Default list of enabled providers defined so that you can extend it
		-- elsewhere in your config, without redefining it, due to `opts_extend`
		sources = {
			default = { 'lsp', 'path' },
		},
		signature = { enabled = true }
	},
	opts_extend = { "sources.default" }
}
