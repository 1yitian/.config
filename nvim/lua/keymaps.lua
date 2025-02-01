-- keymaps.lua - keymaps

vim.g.mapleader = ' '

local function map(mode, lhs, rhs, desc, noremap)
	vim.keymap.set(mode, lhs, rhs, {desc = desc, noremap = noremap})
end
local function mode(modes)
	local m = {}
	for i=1,string.len(modes) do
		m[i] = string.sub(modes, i, i)
	end
	return m
end

map(mode('nvo'),	'h',			'h',							'move left',							true)
map(mode('nvo'),	'n',			'j',							'move down',							true)
map(mode('nvo'),	'e',			'k',							'move up',								true)
-- For ft-man-plugin. See :help :Man for help
map(mode('nvo'),	'E',			'K',							'open manual',							false)
map(mode('nvo'),	'i',			'l',							'move right',							true)

map(mode('nvo'),	'u',			'i',							'[i]nsert mode',						true)
map(mode('nvo'),	'U',			'I',							'[I]nsert mode in the begin of line',	true)

map(mode('nv'),		'k',			'n',							'search [n]ext',						true)
map(mode('nv'),		'K',			'N',							'search previous',						true)

map(mode('nv'),		'l',			'u',							'[u]ndo',								true)
map(mode('nv'),		'L',			'<C-r>',						'redo',									true)

map(mode('nv'),		'f',			'e',							'to the [e]nd of the word',				true)
map(mode('nv'),		'F',			'E',							'to the [E]nd of the word',				true)
map(mode('nvo'),	't',			't',							'[t]ill',								true)
map(mode('nvo'),	'T',			'T',							'back [T]ill',				true)
map(mode('nvo'),	'j',			'f',							'[f]ind char',				true)
map(mode('nvo'),	'J',			'F',							'[F]ind back char',				true)
map(mode('nv'),		'<up>',			'<Cmd>resize +1<CR>',			'Inceace current window height by 1',	true)
map(mode('nv'),		'<down>',		'<Cmd>resize -1<CR>',			'Deceace current window height by 1',	true)
map(mode('nv'),		'<right>',		'<Cmd>vertical resize +1<CR>',	'Inceace current window width by 1',	true)
map(mode('nv'),		'<left>',		'<Cmd>vertical resize -1<CR>',	'Deceace current window width by 1',	true)

map(mode('n'),		'<leader>h',	'<C-w>h',						'focus to left window')
map(mode('n'),		'<leader>n',	'<C-w>j',						'focus to below window')
map(mode('n'),		'<leader>e',	'<C-w>k',						'focus to above window')
map(mode('n'),		'<leader>i',	'<C-w>l',						'focus to right window')
map(mode('n'),		'<leader>m',	':%s/    /	/g',				'<space> to <tab>')
map(mode('n'),		'<leader>tt',	'<Cmd>tabnew<CR>',				'new [t]ab')
map(mode('n'),		'<leader>tn',	'<Cmd>tabNext<CR>',				'[n]ext [t]ab')
map(mode('n'),		'<leader>ti',	'<Cmd>tabnext<CR>',				'previous [t]ab')
map(mode('n'),		';w',			'<Cmd>w<CR>',					'[w]rite current buffer')
map(mode('n'),		';q',			'<Cmd>q<CR>',					'[q]uit current buffer')
map(mode('nv'),		'm',			'gc',							'toggle [c]ommit')
map(mode('nv'),		';cc',			'gcc',							'toggle [c]ommit')
