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

  # Install test dependency on `node-webkit`
  $install_nw = <<SCRIPT
  if ! which nw &> /dev/null; then
    # Install node-webkit deps
    sudo apt-get install -y gconf2 libnotify-bin x11-xserver-utils xdg-utils xvfb
# sudo apt-get install  dconf-gsettings-backend dconf-service indicator-application libappindicator1 libappindicator3-1 libcairo-gobject2 libdbusmenu-gtk3-4 libdconf0 libfile-basedir-perl libfile-desktopentry-perl libfile-mimeinfo-perl libgtk-3-0 libgtk-3-bin libgtk-3-common libindicator3-7 libindicator7 x11-xserver-utils xdg-utils

    # Install node-webkit itself
    /vagrant/test/utils/install-node-webkit.sh "vagrant"
  fi
SCRIPT
  config.vm.provision "shell", inline: $install_nw
end
