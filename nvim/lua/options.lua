-- options.lua - some configurations

local o = vim.opt

o.clipboard = 'unnamedplus'
o.incsearch = true
o.hlsearch = true
o.smartcase = true
o.spell = true
o.spelllang:prepend('cjk')

-- Tab
o.tabstop = 4
o.softtabstop = 4
o.shiftwidth = 4
o.autoindent = true
o.smartindent = true

-- UI
o.mouse = 'a'
o.number = true
o.relativenumber = true
o.cursorline = true
o.wrap = false
o.splitright = true
o.laststatus = 1

vim.cmd('hi Normal guibg=NONE')

vim.api.nvim_create_autocmd('TextYankPost', {
	callback = function()
		vim.highlight.on_yank({
			higroup = 'IncSearch',
			timeout = 150,
			on_visual = false,
		})
	end
})
