#!/bin/sh
# name='chromium_backup_'$(date +'%Y_%m_%d_%H:%M:%S')
rm -rf $(find ~/.config/chromium/Default -name "*cache*" -type d)
rm -rf $(find ~/.config/chromium/Default -name "*.old")
rm -rf $(find ~/.config/chromium/Default -name "*.log")
tar -czvf ~/.config/chromium_profile.tar.gz ~/.config/chromium/Default/
echo -e '\n\n~/.config/chromium_profile.tar.gz'
