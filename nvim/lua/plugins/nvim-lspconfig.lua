return {
	'neovim/nvim-lspconfig',
	-- event = { 'BufReadPost', 'BufNewFile' },
	ft = { 'c', 'lua' },
	dependencies = 'saghen/blink.cmp',
	config = function()
		vim.api.nvim_create_autocmd('LspAttach', {
			callback = function()
				local map = vim.keymap.set
				local function getopt(desc)
					return { desc = desc, buffer = 0 }
				end
				map('n','gd',		vim.lsp.buf.definition,		getopt('[g]oto [d]efinition'))
				map('n','gy',		vim.lsp.buf.type_definition,getopt('[g]oto t[y]pe references'))
				map('n','gr',		vim.lsp.buf.references,		getopt('[g]oto [r]eferences'))
				map('n','gi',		vim.lsp.buf.implementation,	getopt('[g]oto [i]mplementation'))
				map('n','ge',		vim.lsp.buf.declaration,	getopt('[g]oto d[e]claration'))

				map('n','E',		vim.lsp.buf.hover,			getopt('[h]over'))
				map('n','<leader>s',vim.lsp.buf.signature_help,	getopt('[s]ignature help'))
				map('n','<leader>a',vim.lsp.buf.code_action,	getopt('code [a]ction'))
				map('n','<leader>r',vim.lsp.buf.rename,			getopt('[r]ename'))
				map('n','<leader>f',vim.lsp.buf.format,			getopt('[f]ormat'))
			end
		})

		-- support blink.cmp
		local capabilities = require('blink.cmp').get_lsp_capabilities();
		local servers = {
			'lua_ls',
			'clangd'
		}

		-- Add lsps' path to $PATH
		-- ':' is $PATH seperater for linux
		vim.env.PATH = string.format('%s:%s/mason/bin', vim.env.PATH, vim.fn.stdpath('data'))
		for i = 1, #servers do
			require('lspconfig')[servers[i]].setup({
				capabilities = capabilities
			})
		end
	end
}
