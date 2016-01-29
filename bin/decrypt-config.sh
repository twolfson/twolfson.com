#!/usr/bin/env bash
# Exit on first error and echo commands
set -e

# If there is no config directory, then create one
if ! test -d config; then
  mkdir config
fi

# For each of our files in our encrypted config
for file in $(ls config.enc); do
  # If the file is our secret, then decrypt it
  src_file="config.enc/$file"
  target_file="config/$file"
  if test "$file" = "secret.json"; then
    sops --decrypt "$file" > "$target_file"
  # Otherwise, copy it with a backup
  else
    cp --backup --suffix "bak" "$src_file" "$target_file"
  fi
done
