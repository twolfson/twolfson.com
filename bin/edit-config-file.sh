#!/usr/bin/env bash
# Exit on first error
set -e

# Look up our file
filepath="$1"
if test "$filepath" = ""; then
  echo "Expected \`filepath\` but received nothing" 1>&2
  echo "Usage: $0 <filepath>" 1>&2
  exit 1
fi

# If our file is a secret, then load it into SOPS
filename="$(basename "$filepath")"
if test "$filename" = "secret.json"; then
  sops "$filepath"
# Otherwise, edit it normally
else
  "$EDITOR" "$filepath"
fi

# Run our sync scripts
bin/decrypt-config.sh
