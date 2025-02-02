local ZDATADIR=~/.local/share/zsh
[[ ! -d $ZDATADIR ]] && mkdir -p $ZDATADIR
## History
HISTFILE=$ZDATADIR/zsh_history
HISTSIZE=1000
SAVEHIST=1000
## Prompt
# PROMPT='%n@%m %~ %# '
prompt='%F{cyan}%1~%f '
## Options
setopt autocd correct\
	incappendhistory histignorealldups histignorespace extendedhistory

## Aliases & Custom Commands
alias cpt='cp --preserve=timestamps'
alias diff='diff --color=auto'
alias du='du -h'
envset() {
	case $1 {
		(editor)
			export EDITOR=$2
			;;
		(fcitx5)
			export XMODIFIERS=@im=fcitx
			export GTK_IM_MODULE=fcitx
			export QT_IM_MODULE=fcitx
			export GLFW_IM_MODULE=ibus
		(go)
			# [[ ! which go ]] && print Hey! Can not find go in $PATH.
			export GO111MODULE=on
			export GOPROXY=https://goproxy.cn
			go env -w GO111MODULE=on
			go env -w GOPROXY=https://goproxy.cn,direct
			;;
		(rustup)
			export RUSTUP_UPDATE_ROOT=https://mirrors.tuna.tsinghua.edu.cn/rustup/rustup
			export RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup
			;;
		(*)
			print editor '[program]': set default EDITOR
			print fcitx5: Input Method Environment Varible
			print go: setup go proxy
			print rustup: setup rust proxy
			print '*': display this help and exit
			;;
	}
}
alias free='free -h'
alias grep='grep --color=auto'
alias hibernate='systemctl hibernate'
alias icat='kitten icat'
alias ls='ls --color=auto -h'
man() {
	if (( $# == 1 )) {
		nvim "+hide Man $1"
	}
}
alias musicfox='local MFWP=$(pwd);cd ~;musicfox;cd $MFWP'
alias reset=' reset'
alias rm='rm -Iv'
alias zrc="source $ZDOTDIR/.zshrc"
alias vimconf='cd ~/.config && file=$(fzf) && cd $file:h && vim $file:t'

## Keymaps -- vi mode
bindkey -v
# movement
bindkey -a 'h' vi-backward-char
bindkey -a 'n' down-line-or-history
bindkey -a 'e' up-line-or-history
bindkey -a 'i' vi-forward-char
bindkey -a 'b' vi-backward-word
bindkey -a 'B' vi-backward-blank-word
# command
bindkey -a 'u' vi-insert
bindkey -a 'U' vi-insert-bol
bindkey -a 'l' undo
bindkey -a 'L' redo
## Completion
autoload -Uz compinit
# fpath=($fpath ~/.local/share/zsh/completions)
compinit -d $ZDATADIR/zcompdump
# zstyle ':completion:*' rehash true
# zstyle ':completion:*' menu select
# zstyle ':completion:*' file-sort time
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
zstyle ':completion:*' add-space false
## Path Variable
[[ -d ~/Projects/scripts ]] && path=($path ~/Projects/scripts)
