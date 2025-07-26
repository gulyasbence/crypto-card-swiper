#!/bin/bash

echo "🚀 Setting up GitHub repository for Crypto Card Swiper"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required"
    exit 1
fi

echo ""
echo "📋 Please follow these steps:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: crypto-card-swiper"
echo "3. Make it Public"
echo "4. DO NOT initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""

read -p "Press Enter when you've created the repository..."

# Add remote and push
echo "🔗 Adding remote origin..."
git remote add origin https://github.com/$GITHUB_USERNAME/crypto-card-swiper.git

echo "🌿 Setting branch to main..."
git branch -M main

echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Repository setup complete!"
echo "🌐 Your app will be available at: https://$GITHUB_USERNAME.github.io/crypto-card-swiper/"
echo ""
echo "📝 Next steps:"
echo "1. Go to your repository settings"
echo "2. Navigate to Pages"
echo "3. Set source to 'Deploy from a branch'"
echo "4. Set branch to 'gh-pages' and folder to '/'"
echo "5. Save and wait for deployment" 