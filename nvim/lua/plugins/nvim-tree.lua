return {
	'nvim-tree/nvim-tree.lua',
	keys = { ';t', '<cmd>NvimTreeToggle<CR>', 'Toggle nvim-[t]ree', mode = 'n'},
	dependencies = {
		'nvim-tree/nvim-web-devicons', -- not strictly required, but recommended
		-- '3rd/image.nvim', -- Optional image support in preview window: See `# Preview Mode` for more information
	},
	opts = function()
		vim.g.loaded_netrw = 1
		vim.g.loaded_netrwPlugin = 1
		return {
			sort = {
				sorter = 'case_sensitive',
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
				local api = require('nvim-tree.api')
				local function opts(desc)
					return { desc = 'nvim-tree: ' .. desc, buffer = bufnr, noremap = true, silent = true, nowait = true }
				end
				vim.keymap.set('n', '<Tab>',	api.node.show_info_popup,		opts('Open Preview'))
				vim.keymap.set('n', 'o',		api.node.open.edit,				opts('Open'))
				vim.keymap.set('n', 'a',		api.fs.create,					opts('Create File Or Directory'))
				vim.keymap.set('n', 'd',		api.fs.trash,					opts('Trash'))
				vim.keymap.set('n', 'D',		api.fs.remove,					opts('Delete'))
				vim.keymap.set('n', 'c',		api.fs.rename,					opts('Rename'))
				vim.keymap.set('n', 'C',		api.fs.rename_basename,			opts('Rename: Basename'))
				vim.keymap.set('n', 'r',		api.tree.reload,				opts('Refresh'))
				vim.keymap.set('n', 'U',		api.tree.change_root_to_parent,	opts('Up'))
				vim.keymap.set('n', 'O',		api.tree.change_root_to_node,	opts('Change root Directory'))
				vim.keymap.set('n', '?',		api.tree.toggle_help,			opts('Toggle Help'))
				vim.keymap.set('n', '.',		api.tree.toggle_hidden_filter,	opts('Toggle Filter: Dotfiles'))
			end
		}
	end
}
