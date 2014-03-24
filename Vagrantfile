# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  # Set up memory since image diffs are CPU intensive
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
  end

  # Update apt-get once
  $update_apt_get = <<SCRIPT
  if ! test -f .updated_apt_get; then
    sudo apt-get update
    touch .updated_apt_get
  fi
SCRIPT
  config.vm.provision "shell", inline: $update_apt_get

  # https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#ubuntu-mint-elementary-os
  $install_node = <<SCRIPT
  if ! which node &> /dev/null; then
    sudo apt-get install -y python-software-properties python g++ make
    sudo add-apt-repository -y ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install -y nodejs
  fi
SCRIPT
  config.vm.provision "shell", inline: $install_node

  # Install test dependency on `imagemagick`
  $install_imagemagick = <<SCRIPT
  if ! which convert &> /dev/null; then
    sudo apt-get install imagemagick -y
  fi
SCRIPT
  config.vm.provision "shell", inline: $install_imagemagick

  # Install test dependency on `phantomjs`
  $install_phantomjs = <<SCRIPT
  if ! which phantomjs &> /dev/null; then
    cd /tmp
    wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.7-linux-x86_64.tar.bz2
    tar xvf phantomjs-1.9.7-linux-x86_64.tar.bz2
    sudo cp phantomjs-1.9.7-linux-x86_64/bin/phantomjs /usr/local/bin/
  fi
SCRIPT
  config.vm.provision "shell", inline: $install_phantomjs
end
