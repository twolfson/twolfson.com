#!/usr/bin/env bash
# Load our arguments
user="$1"
if test "$user" = ""; then
  echo "Expected \"user\" to be provided but it wasn't" 1>&2
  echo "Usage: ./install-node-webkit.sh <user>" 1>&2
  exit 1
fi

# Download and extract the file
cd /tmp
wget http://dl.node-webkit.org/v0.10.5/node-webkit-v0.10.5-linux-x64.tar.gz
tar xvf node-webkit-v0.10.5-linux-x64.tar.gz

# Copy over the files
sudo cp node-webkit-v0.10.5-linux-x64 /usr/local/lib/node-webkit/ -R
sudo ln -s /usr/local/lib/node-webkit/nw /usr/local/bin/nw

# Adjust permissions
sudo chown "$user" -R /usr/local/lib/node-webkit/ -R
