#!/bin/bash

set -eo pipefail

NVM_DIR="/opt/circleci/.nvm"
NODE_VERSION="v16"

curl -o-  https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Installing Node $NODE_VERSION"
nvm install $NODE_VERSION
nvm alias default $NODE_VERSION

# Each step uses the same `$BASH_ENV`, so need to modify it
echo 'export NVM_DIR="/opt/circleci/.nvm"' >> $BASH_ENV
echo "[ -s \"$NVM_DIR/nvm.sh\" ] && . \"$NVM_DIR/nvm.sh\"" >> $BASH_ENV