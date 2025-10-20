#!/bin/bash
# Script to update repository name locally after GitHub rename

# Replace NEW_NAME with your chosen repository name
NEW_NAME="energy-consumption-analyzer"

echo "📝 Updating repository remote URLs..."

# Update origin remote
git remote set-url origin https://github.com/cosmin-vestemean/$NEW_NAME.git

# Update upstream if needed
git remote set-url upstream https://github.com/cosmin-vestemean/$NEW_NAME.git 2>/dev/null || echo "No upstream to update"

# Remove github remote (it's just a template reference)
git remote remove github 2>/dev/null || echo "No github remote to remove"

echo ""
echo "✅ Repository remotes updated!"
echo ""
echo "New remotes:"
git remote -v

echo ""
echo "🔗 Your new repository URL:"
echo "https://github.com/cosmin-vestemean/$NEW_NAME"
echo ""
echo "📚 Update these files manually:"
echo "- DEPLOYMENT_READY.md (update repository URL)"
echo "- HEROKU_DEPLOYMENT.md (update repository name)"
echo "- README.md (if it exists)"
