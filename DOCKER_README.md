# 🐳 Docker Setup for Faust.js with Gemini Thinking Feature

This guide will help you run the Faust.js application with the new Gemini thinking feature in a Docker container.

## 🚀 Quick Start

### 1. Set up environment variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your actual values
nano .env  # or use your preferred editor
```

### 2. Run the application

```bash
# Make the script executable (if not already)
chmod +x docker-run.sh

# Run the application
./docker-run.sh
```

The application will be available at: **http://localhost:3000**

## 🔧 Environment Variables

You need to configure these environment variables in your `.env` file:

### Required for Gemini Thinking Feature:

- `GOOGLE_VERTEX_PROJECT` - Your Google Cloud Project ID
- `GOOGLE_VERTEX_LOCATION` - Vertex AI location (e.g., `us-central1`)
- `GOOGLE_VERTEX_CLIENT_EMAIL` - Service account email
- `GOOGLE_VERTEX_PRIVATE_KEY` - Service account private key

### Required for Faust.js:

- `FAUST_SECRET_KEY` - Secret key for Faust.js
- `WORDPRESS_URL` - Your WordPress site URL
- `NEXT_PUBLIC_WORDPRESS_URL` - Public WordPress URL

## 🧠 Testing the Thinking Feature

1. **Open the application**: http://localhost:3000
2. **Open the chat**: Click the chat button (usually bottom-right)
3. **Enable thinking mode**: Click the "Thinking" toggle button
4. **Ask a complex question**: Try these examples:
   - "Solve this equation: 3x + 7 = 22"
   - "Write a recursive function to calculate factorial"
   - "Explain the steps to solve a quadratic equation"
5. **View the reasoning**: Expand the "🧠 Thinking Process" section

## 📋 Docker Commands

### Production Build

```bash
# Build and run production container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Development Build (with hot reload)

```bash
# Build and run development container
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop the container
docker-compose -f docker-compose.dev.yml down
```

### Manual Docker Commands

```bash
# Build the image
docker build -t faust-gemini-thinking .

# Run the container
docker run -p 3000:3000 --env-file .env faust-gemini-thinking

# Run with environment variables inline
docker run -p 3000:3000 \
  -e GOOGLE_VERTEX_PROJECT=your-project \
  -e GOOGLE_VERTEX_LOCATION=us-central1 \
  -e GOOGLE_VERTEX_CLIENT_EMAIL=your-email@project.iam.gserviceaccount.com \
  -e GOOGLE_VERTEX_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..." \
  -e FAUST_SECRET_KEY=your-secret \
  -e WORDPRESS_URL=https://your-site.com \
  -e NEXT_PUBLIC_WORDPRESS_URL=https://your-site.com \
  faust-gemini-thinking
```

## 🔍 Troubleshooting

### Container won't start

- Check your environment variables in `.env`
- Ensure Docker is running
- Check logs: `docker-compose logs -f`

### Thinking feature not working

- Verify your Google Vertex AI credentials
- Check that your service account has proper permissions
- Ensure your project has Vertex AI API enabled

### Build fails

- Clear Docker cache: `docker system prune -a`
- Rebuild: `docker-compose build --no-cache`

## 📁 File Structure

```
.
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── docker-compose.yml      # Production compose file
├── docker-compose.dev.yml  # Development compose file
├── .dockerignore           # Files to exclude from Docker build
├── .env.example            # Environment variables template
├── docker-run.sh           # Quick start script
└── DOCKER_README.md        # This file
```

## 🎯 Features Included

- ✅ **Gemini Thinking Toggle** - Enable/disable reasoning mode
- ✅ **Reasoning Display** - View AI's thought process
- ✅ **Visual Indicators** - Active state animations
- ✅ **Cost Control** - Thinking budget management
- ✅ **Vertex AI Integration** - Full compatibility
- ✅ **Production Ready** - Optimized Docker build
- ✅ **Development Mode** - Hot reload support

## 🚀 Performance Notes

- **Production mode**: Optimized build with standalone output
- **Development mode**: Hot reload enabled for faster development
- **Multi-stage build**: Minimal final image size
- **Health checks**: Container health monitoring

## 🔐 Security

- Non-root user in production container
- Secure headers configured
- Environment variables properly isolated
- Private keys handled securely

## 📞 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables
3. Ensure proper Google Cloud permissions
4. Check Docker and Docker Compose versions
