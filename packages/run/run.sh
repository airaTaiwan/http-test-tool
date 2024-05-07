#!/bin/bash

sudo xattr -rd com.apple.quarantine .

node index.mjs
