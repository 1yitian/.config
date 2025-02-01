-- keymaps.lua - keymaps

vim.g.mapleader = ' '

local n = {'n', 'v'}
local nv = {'n', 'v'}
local nvo = {'n', 'v', 'o'}

local function map(mode, lhs, rhs, desc, noremap)
	vim.keymap.set(mode, lhs, rhs, {desc = desc, noremap = noremap})
end

map(nvo,	'h',			'h',					'move left',							true)
map(nvo,	'n',			'j',					'move down',							true)
map(nvo,	'e',			'k',					'move up',								true)
-- For ft-man-plugin. See :help :Man for help
map(nvo,	'E',			'K',					'open manual',								false)
map(nvo,	'i',			'l',					'move right',							true)

map(nvo,	'u',			'i',					'[i]nsert mode',						true)
map(nvo,	'U',			'I',					'[I]nsert mode in the begin of line',	true)

map(nv,		'k',			'n',					'search [n]ext',						true)
map(nv,		'K',			'N',					'search previous',						true)

map(nv,		'l',			'u',					'[u]ndo',								true)
map(nv,		'L',			'<C-r>',				'redo',									true)

map(nv,		'f',			'e',					'to the [e]nd of the word',				true)
map(nv,		'F',			'E',					'to the [E]nd of the word',				true)
map(nvo,	't',			't',					'[t]ill',								true)
map(nvo,	'T',			'T',					'back [T]ill',				true)
map(nvo,	'j',			'f',					'[f]ind char',				true)
map(nvo,	'J',			'F',					'[F]ind back char',				true)
map(nv,		'<up>',			'<Cmd>resize +1<CR>',	'Inceace current window height by 1',	true)
map(nv,		'<down>',		'<Cmd>resize -1<CR>',	'Deceace current window height by 1',	true)
map(nv,		'<right>',		'<Cmd>vertical resize +1<CR>',	'Inceace current window width by 1',	true)
map(nv,		'<left>',		'<Cmd>vertical resize -1<CR>',	'Deceace current window width by 1',	true)

map(n,		'<leader>h',	'<C-w>h',				'focus to left window')
map(n,		'<leader>n',	'<C-w>j',				'focus to below window')
map(n,		'<leader>e',	'<C-w>k',				'focus to above window')
map(n,		'<leader>i',	'<C-w>l',				'focus to right window')
map(n,		';w',			'<Cmd>w<CR>',			'[w]rite current buffer')
map(n,		';q',			'<Cmd>q<CR>',			'[q]uit current buffer')
map(n,		'<leader>m',	':%s/    /	/g',		'<space> to <tab>')
map(n,		'<leader>tt',	'<Cmd>tabnew<CR>',		'new [t]ab')
map(n,		'<leader>tn',	'<Cmd>tabNext<CR>',		'[n]ext [t]ab')
map(n,		'<leader>ti',	'<Cmd>tabnext<CR>',		'previous [t]ab')
