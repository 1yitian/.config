return {
	'rcarriga/nvim-notify',
	main = 'notify',
	event = 'VeryLazy',
	opts = function()
		vim.notify = require('notify')
		return {
			minimum_width = 26,
			background_colour = '#000000',
			render = 'minimal',
			stages = 'static',
		}
	end
}
