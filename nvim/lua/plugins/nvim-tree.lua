return {
	"nvim-tree/nvim-tree.lua",
	event = 'VeryLazy',
	dependencies = {
		"nvim-tree/nvim-web-devicons", -- not strictly required, but recommended
		-- "3rd/image.nvim", -- Optional image support in preview window: See `# Preview Mode` for more information
	},
	opts = function()
		vim.g.loaded_netrw = 1
		vim.g.loaded_netrwPlugin = 1
		return {
			sort = {
				sorter = "case_sensitive",
			},
			view = {
				width = 30,
			},
			renderer = {
				group_empty = true,
			},
			filters = {
				dotfiles = true,
			},
			on_attach = function(bufnr)
				local api = require "nvim-tree.api"
				local function opts(desc)
					return { desc = "nvim-tree: " .. desc, buffer = bufnr, noremap = true, silent = true, nowait = true }
				end
				-- default mappings
				api.config.mappings.default_on_attach(bufnr)
				-- custom mappings
				vim.keymap.set('n', '<C-t>', api.tree.change_root_to_parent,				opts('Up'))
				vim.keymap.set('n', '?',		 api.tree.toggle_help,						opts('Help'))
			end
		}
	end
}
