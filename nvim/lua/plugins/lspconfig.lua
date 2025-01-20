return {
	'neovim/nvim-lspconfig',
	event = { 'BufReadPost', 'BufNewFile' },
	dependencies = {
		'hrsh7th/cmp-nvim-lsp',
		'folke/neodev.nvim'
	},
	config = function()
		vim.api.nvim_create_autocmd('LspAttach', {
			callback = function ()
				map('n','gd',		vim.lsp.buf.definition,		'[g]oto [d]efinition')
				map('n','gy',		vim.lsp.buf.type_definition,'[g]oto t[y]pe references')
				map('n','gr',		vim.lsp.buf.references,		'[g]oto [r]eferences')
				map('n','gi',		vim.lsp.buf.implementation,	'[g]oto [i]mplementation')
				map('n','ge',		vim.lsp.buf.declaration,	'[g]oto d[e]claration')

				map('n','E',		vim.lsp.buf.hover,			'[h]over')
				map('n','<leader>s',vim.lsp.buf.signature_help,	'[s]ignature help')
				map('n','<leader>a',vim.lsp.buf.code_action,	'code [a]ction')
				map('n','<leader>r',vim.lsp.buf.rename,			'[r]ename')
				map('n','<leader>f',vim.lsp.buf.format,			'[f]ormat')
			end
		})
		-- support nvim-cmp
		local capabilities = require('cmp_nvim_lsp').default_capabilities();
		local servers = {'lua_ls', 'clangd'}

		-- Add lsps' path to $PATH
		-- ':' is $PATH seperater for linux
		vim.env.PATH = string.format('%s:%s/mason/bin', vim.env.PATH, vim.fn.stdpath('data'))
		for i = 1, #servers do
			if servers[i] == 'lua_ls' then
				require('neodev').setup()
			end
			require('lspconfig')[servers[i]].setup({
				capabilities = capabilities
			})
		end
	end
}
