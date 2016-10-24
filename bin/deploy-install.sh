#!/usr/bin/env bash
# Exit on first error and echo commands
set -e
set -x

# Install our Node.js dependencies
# DEV: This automatically builds assets
npm install
