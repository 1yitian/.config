return {
	'hrsh7th/nvim-cmp',
	event = { 'InsertEnter', 'CmdlineEnter' },
	dependencies = {
		'hrsh7th/cmp-nvim-lsp',
		'hrsh7th/cmp-path',
		'hrsh7th/cmp-cmdline',
		'hrsh7th/cmp-buffer',
	},
	opts = function()
		local cmp = require('cmp')
		vim.opt.wildmenu = false
		cmp.setup.cmdline({'/', '?', ':%s'}, {
			sources = {
				{ name = 'buffer' }
			}
		})
		cmp.setup.cmdline(':', {
			sources = cmp.config.sources({
				{ name = 'path' },
				{ name = 'cmdline',
					--[[option = {
					ignore_cmds = { 'Man' }
					}]]
				}
			})
		})
		return {
			window = {
				--completion = cmp.config.window.bordered(),
				documentation = cmp.config.window.bordered(),
			},
			mapping = {
				['<C-U>'] = cmp.mapping.scroll_docs(-4),
				['<C-F>'] = cmp.mapping.scroll_docs(4),
				['<C-u>'] = cmp.mapping(function()
					if cmp.visible() then
						cmp.select_prev_item({ behavior = cmp.SelectBehavior.Select })
					end
				end, {'i', 'c'}),
				['<C-e>'] = cmp.mapping(function()
					if cmp.visible() then
						cmp.select_next_item({ behavior = cmp.SelectBehavior.Select })
					end
				end, {'i', 'c'}),
				['<C-Space>'] = cmp.mapping(function()
					if cmp.visible() then
						cmp.abort()
					else
						cmp.complete()
					end
				end, {'i', 'c'}),
				['<Tab>'] = cmp.mapping(function(fallback)
					if cmp.visible() then
						cmp.confirm({ select = true })
					else
						fallback()
					end
				end, {'i', 'c'}),
				['<S-Tab>'] = cmp.mapping(function(fallback)
					if cmp.visible() then
						cmp.abort()
					end
					fallback()
				end, {'i', 'c'})
			},
			sources = cmp.config.sources({
				{ name = 'nvim_lsp' },
				{ name = 'path' },
				-- { name = 'buffer' },
			}),
		}
	end
}
