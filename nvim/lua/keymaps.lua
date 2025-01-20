-- keymaps.lua - keymaps

vim.g.mapleader = ' '

local n = {'n', 'v'}
local nv = {'n', 'v'}
local nvo = {'n', 'v', 'o'}

function map(mode, lhs, rhs, desc, noremap)
	vim.keymap.set(mode, lhs, rhs, {desc = desc, noremap = noremap})
end

map(nvo,	'h',			'h',			'move left',							true)
map(nvo,	'n',			'j',			'move down',							true)
map(nvo,	'e',			'k',			'move up',								true)
map(nvo,	'i',			'l',			'move right',							true)

map(nvo,	'u',			'i',			'[i]nsert mode',						true)
map(nvo,	'U',			'I',			'[I]nsert mode in the begin of line',	true)

map(nv,		'k',			'n',			'search [n]ext',						true)
map(nv,		'K',			'N',			'search previous',						true)

map(nv,		'l',			'u',			'[u]ndo',								true)
map(nv,		'L',			'<C-r>',		'redo',									true)

map(nv,		'f',			'e',			'to the [e]nd of the word',				true)
map(nv,		'F',			'E',			'to the [E]nd of the word',				true)
map(nv,		'j',			't',			'[t]ill',				true)
map(nv,		'J',			'T',			'back [T]ill',				true)
map(nv,		't',			'f',			'[f]ind char',				true)
map(nv,		'T',			'F',			'[F]ind back char',				true)

map(n,		'<leader>h',	'<C-w>h',		'focus to left window')
map(n,		'<leader>n',	'<C-w>j',		'focus to below window')
map(n,		'<leader>e',	'<C-w>k',		'focus to above window')
map(n,		'<leader>i',	'<C-w>l',		'focus to right window')
map(n,		'<leader>w',	':w<CR>',		'[w]rite current buffer')
map(n,		'<leader>q',	':q<CR>',		'[q]uit current buffer')
map(n,		'<leader>m',	':%s/    /	/g','<space> to <tab>')
map(n,		'<leader>tt',	':tabnew<CR>',	'new [t]ab')
map(n,		'<leader>tn',	':tabNext<CR>',	'[n]ext [t]ab')
map(n,		'<leader>ti',	':tabnext<CR>',	'previous [t]ab')
