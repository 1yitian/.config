-- options.lua - some configurations

local o = vim.opt

o.clipboard = 'unnamedplus'
o.incsearch = true
o.hlsearch = true
o.smartcase = true

-- Tab
o.tabstop = 4
o.softtabstop = 4
o.shiftwidth = 4
o.autoindent = true
o.smartindent = true

-- UI config
o.mouse = 'a'
o.number = true
o.relativenumber = true
o.cursorline = true
o.wrap = false
o.splitright = true
o.laststatus = 1

vim.cmd('highlight Normal guibg=NONE')
vim.api.nvim_create_autocmd('TextYankPost', {
	callback = function()
		vim.highlight.on_yank({
			higroup = 'IncSearch',
			timeout = 150,
			on_visual = false,
		})
	end
})
