#!/usr/bin/env bash

# EventHub - Quick Start Script
# This script sets up and runs the entire authentication system

echo "🚀 EventHub - Authentication System Setup"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✓ Node.js $(node --version) found"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server || exit 1
npm install
echo "✓ Backend dependencies installed"
echo ""

# Go back to root
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install
echo "✓ Frontend dependencies installed"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To start the system:"
echo ""
echo "1. Start the backend server (in one terminal):"
echo "   cd server"
echo "   npm start"
echo ""
echo "2. Start the frontend (in another terminal):"
echo "   npm run dev"
echo ""
echo "Then open: http://localhost:8080"
echo ""
echo "Demo Credentials:"
echo "  Email: admin@conference.com"
echo "  Password: admin123"
echo ""
echo "Documentation: See AUTHENTICATION_SETUP.md"
