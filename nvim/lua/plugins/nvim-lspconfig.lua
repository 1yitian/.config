return {
	'neovim/nvim-lspconfig',
	event = { 'BufReadPost', 'BufNewFile' },
	dependencies = 'saghen/blink.cmp',
	config = function()
		local servers = {
			lua_ls = {},
			clangd = {},
		}

		-- Add lsps' path to $PATH
		-- ':' is $PATH separator for linux
		vim.env.PATH = string.format('%s:%s/mason/bin', vim.env.PATH, vim.fn.stdpath('data'))

		-- support blink.cmp
		local capabilities = require('blink.cmp').get_lsp_capabilities()

		for server, settings in pairs(servers) do
			require('lspconfig')[server].setup({
				settings = settings,
				capabilities = capabilities
			})
		end
		vim.api.nvim_create_autocmd('LspAttach', {
			callback = function()
				local map = vim.keymap.set
				local function opt(desc)
					return { desc = desc, buffer = 0 }
				end
				map('n','gd',		vim.lsp.buf.definition,		opt('[g]oto [d]efinition'))
				map('n','gy',		vim.lsp.buf.type_definition,opt('[g]oto t[y]pe references'))
				map('n','gr',		vim.lsp.buf.references,		opt('[g]oto [r]eferences'))
				map('n','gi',		vim.lsp.buf.implementation,	opt('[g]oto [i]mplementation'))
				map('n','ge',		vim.lsp.buf.declaration,	opt('[g]oto d[e]claration'))

				map('n','E',		vim.lsp.buf.hover,			opt('[h]over'))
				map('n','<leader>s',vim.lsp.buf.signature_help,	opt('[s]ignature help'))
				map('n','<leader>a',vim.lsp.buf.code_action,	opt('code [a]ction'))
				map('n','<leader>r',vim.lsp.buf.rename,			opt('[r]ename'))
				map('n','<leader>f',vim.lsp.buf.format,			opt('[f]ormat'))
			end
		})
	end
}
