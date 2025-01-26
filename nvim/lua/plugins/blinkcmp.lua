return {
	'saghen/blink.cmp',
	event = { 'InsertEnter', 'CmdlineEnter' },
	build = ':!cargo build --release',
	-- optional: provides snippets for the snippet source
	dependencies = {
		'rafamadriz/friendly-snippets',
		-- 'hrsh7th/cmp-nvim-lsp',
		-- 'hrsh7th/nvim-cmp',
		-- 'hrsh7th/cmp-path',
	},
	opts = {
		-- 'default' for mappings similar to built-in completion
		-- 'super-tab' for mappings similar to vscode (tab to accept, arrow keys to navigate)
		-- 'enter' for mappings similar to 'super-tab' but with 'enter' to accept
		-- See the full "keymap" documentation for information on defining your own keymap.
		keymap = {
			preset = 'default',
			['<C-e>'] = { 'select_prev', 'fallback' },
			['<C-E>'] = { 'scroll_documentation_up', 'fallback' },
			['<C-N>'] = { 'scroll_documentation_down', 'fallback' },
			['<C-n>'] = { 'select_next', 'fallback' },
			['<Tab>'] = { 'accept', 'fallback' },
		},

		completion = {
			trigger = {
				-- show on characters
				show_on_keyword = true,
				-- show on trigger characters. In rust or java, it is '.'.
				-- show_on_trigger_word = false,
				-- show_on_insert_on_trigger_character = false
			},
			-- NOTE: some LSPs may add auto brackets themselves anyway
			accept = { auto_brackets = { enabled = true } },
			list = { selection = { preselect = true, auto_insert = false } },

			menu = {
				-- auto_show = false,
				draw = {
					columns = {
						{ "label", "label_description", gap = 1 },
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
			use_nvim_cmp_as_default = true,
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
