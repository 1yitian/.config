return {
	'saghen/blink.cmp',
	version = '*',
	event = { 'InsertEnter', 'CmdlineEnter' },
	dependencies = {
		'rafamadriz/friendly-snippets',
		-- optional: provides snippets for the snippet source
	},
	opts = {
		keymap = {
			['<C-E>'] = { 'scroll_documentation_up', 'fallback' },
			['<C-N>'] = { 'scroll_documentation_down', 'fallback' },
			['<C-n>'] = { 'select_next', 'fallback' },
			['<C-e>'] = { 'select_prev', 'fallback' },
			['<C-h>'] = { 'snippet_forward', 'fallback' },
			['<C-i>'] = { 'snippet_backward', 'fallback' },
			['<Tab>'] = { 'accept', 'fallback' },
			['<S-Tab>'] = { 'hide', 'fallback' },
		},

		completion = {
			trigger = {
				-- show on characters
				-- show_on_keyword = true,
				-- show on trigger characters. In rust or java, it is '.'.
				-- show_on_trigger_word = false,
				-- show_on_insert_on_trigger_character = false
			},
			-- NOTE: some LSPs may add auto brackets themselves anyway
			accept = { auto_brackets = { enabled = true } },
			list = { selection = { preselect = true, auto_insert = false } },

			menu = {
				min_width = 6,
				-- auto_show = false,
				draw = {
					columns = {
						{ "label",    "label_description" },
						{ "kind_icon" },
					},
					treesitter = { 'lsp' }
				}
			},

			documentation = { auto_show = true, auto_show_delay_ms = 500 },
		},

		appearance = {
			-- Sets the fallback highlight groups to nvim-cmp's highlight groups
			-- Useful for when your theme doesn't support blink.cmp
			-- Will be removed in a future release
			use_nvim_cmp_as_default = false,
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
