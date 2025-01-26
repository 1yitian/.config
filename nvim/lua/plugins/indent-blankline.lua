return {
	'lukas-reineke/indent-blankline.nvim',
	main = 'ibl',
	event = 'UIEnter',
	opts = function()
		-- create the highlight groups in the highlight setup hook, so they are reset
		-- every time the colorscheme changes
		local hooks = require('ibl.hooks')
		hooks.register(hooks.type.HIGHLIGHT_SETUP, function()
			vim.api.nvim_set_hl(0, 'RainbowRed', { fg = '#E06C75' })
			vim.api.nvim_set_hl(0, 'RainbowOrange', { fg = '#D19A66' })
			vim.api.nvim_set_hl(0, 'RainbowYellow', { fg = '#E5C07B' })
			vim.api.nvim_set_hl(0, 'RainbowGreen', { fg = '#98C379' })
			vim.api.nvim_set_hl(0, 'RainbowCyan', { fg = '#56B6C2' })
			vim.api.nvim_set_hl(0, 'RainbowBlue', { fg = '#61AFEF' })
			vim.api.nvim_set_hl(0, 'RainbowViolet', { fg = '#C678DD' })
		end)

		return {
			indent = {
				highlight = {
				'RainbowRed',
				'RainbowOrange',
				'RainbowYellow',
				'RainbowGreen',
				'RainbowCyan',
				'RainbowBlue',
				'RainbowViolet',
				}
			}
		}
	end
}
