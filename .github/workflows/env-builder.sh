#!/bin/bash

if [ ${#1} -gt 0 ]
then
  ENVS="VITE_DEFAULT_CONFIG_URL=$1"
fi

echo $ENVS
