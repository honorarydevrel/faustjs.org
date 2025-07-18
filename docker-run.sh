#!/bin/bash

# Docker run script for Faust.js with Gemini Thinking Feature

echo "🚀 Starting Faust.js with Gemini Thinking Feature in Docker..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Please create one based on .env.example"
    echo "📋 Copying .env.example to .env..."
    cp .env.example .env
    echo "✏️  Please edit .env with your actual values before running again."
    exit 1
fi

# Build and run with Docker Compose
echo "🔨 Building Docker image..."
docker-compose build

echo "🏃 Starting container..."
docker-compose up -d

echo "✅ Container started successfully!"
echo "🌐 Application is running at: http://localhost:3000"
echo "🧠 Try the thinking feature in the chat interface!"
echo ""
echo "📊 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down"
echo ""
echo "🔧 To test the thinking feature:"
echo "   1. Open http://localhost:3000"
echo "   2. Click the chat button"
echo "   3. Toggle the 'Thinking' button"
echo "   4. Ask a complex question like 'Solve: 2x + 5 = 15'"
echo "   5. Expand the '🧠 Thinking Process' section to see reasoning"