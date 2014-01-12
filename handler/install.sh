#!/bin/sh

# Install the sway.fm media key handler native messaging client

binaryDir=`pwd`
binaryDir=$binaryDir"/mediakeys"
manifestJson=`cat fm.sway.mediakeys.json-template`
manifestJson=`echo $manifestJson | sed -e "s|%BINARY_PATH%|${binaryDir}|g"`
sudo mkdir -p /Library/Google/Chrome/NativeMessagingHosts
echo $manifestJson | sudo tee /Library/Google/Chrome/NativeMessagingHosts/fm.sway.mediakeys.json > /dev/null
echo "Created Manifest file at /Library/Google/Chrome/NativeMessagingHosts/fm.sway.mediakeys.json"