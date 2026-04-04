#!/bin/bash
# Script to install and run the backend server

echo "Installing backend dependencies..."
cd server
npm install

echo "Starting server..."
npm start
