# Repository Rename Guide

## 📋 Current Name
`codespaces-react-1`

## 💡 Suggested New Names

Choose a name that reflects what your app does:

1. **`energy-consumption-analyzer`** ⭐ RECOMMENDED
   - Clear and professional
   - Describes the main function
   - Good for SEO and discoverability

2. **`pv-system-calculator`**
   - Focused on photovoltaic systems
   - Technical but clear
   - Good for engineering audience

3. **`solar-energy-analyzer`**
   - Emphasizes solar/renewable energy
   - Broader appeal
   - Marketing-friendly

4. **`electric-consumption-pv-designer`**
   - Most comprehensive
   - Describes both functions
   - Slightly longer but very descriptive

5. **`energy-analyzer-solar`**
   - Short and descriptive
   - Good balance
   - Easy to remember

## 🔄 Step-by-Step Rename Process

### Step 1: Rename on GitHub (2 minutes)

1. **Navigate to your repository:**
   ```
   https://github.com/cosmin-vestemean/codespaces-react-1
   ```

2. **Click the "Settings" tab** (top right, next to Insights)

3. **Scroll to "Repository name"** (first section)

4. **Type your new name** (e.g., `energy-consumption-analyzer`)

5. **Click "Rename" button**

6. **Confirm the rename**

✅ GitHub will:
- Automatically redirect the old URL to new URL
- Update all links and references
- Keep all issues, PRs, and history intact

### Step 2: Update Local Repository (1 minute)

After renaming on GitHub, run the update script:

```bash
# Edit the script to set your chosen name
nano update-repo-name.sh

# Or edit directly:
# Change NEW_NAME="energy-consumption-analyzer" to your chosen name

# Run the script
./update-repo-name.sh
```

**Manual alternative:**

```bash
# Replace NEW_NAME with your chosen name
NEW_NAME="energy-consumption-analyzer"

# Update origin remote
git remote set-url origin https://github.com/cosmin-vestemean/$NEW_NAME.git

# Verify
git remote -v
```

### Step 3: Update Documentation (5 minutes)

Update the repository name in these files:

1. **DEPLOYMENT_READY.md**
   - Line 5: Update repository URL

2. **HEROKU_DEPLOYMENT.md**
   - Line 26: Update search term for repository
   - Line 239: Update repository reference

3. **TECHNICAL_ANALYSIS_FORMULAS.md**
   - Last line: Update repository name

4. **DOCUMENTATION_INDEX.md**
   - Repository references

5. **CLIENT_SUMMARY.md**
   - Repository references (if any)

### Step 4: Commit Changes (1 minute)

```bash
git add .
git commit -m "Update repository name references in documentation"
git push origin main
```

### Step 5: Update Heroku (if already deployed)

If you've already deployed to Heroku:

1. **Via Heroku Dashboard:**
   - Go to your app → Deploy tab
   - Disconnect and reconnect GitHub
   - Search for new repository name
   - Connect to new name

2. **Via CLI:**
   ```bash
   # No action needed - Heroku follows GitHub redirects
   # Your existing deployment will continue working
   ```

## 🔗 What Happens After Rename

### ✅ Automatically Updated
- Repository URL (with redirect from old URL)
- Clone/push/pull URLs
- GitHub Pages (if enabled)
- Webhooks
- GitHub Actions
- All internal references

### ⚠️ Manually Update
- Local repository remotes
- Documentation files
- External links (bookmarks, websites)
- README references
- Heroku connection (if deployed)

## 🌐 New URLs After Rename

If you choose `energy-consumption-analyzer`:

**Repository:**
```
https://github.com/cosmin-vestemean/energy-consumption-analyzer
```

**Clone URL:**
```
git clone https://github.com/cosmin-vestemean/energy-consumption-analyzer.git
```

**Old URL (redirects automatically):**
```
https://github.com/cosmin-vestemean/codespaces-react-1
→ Redirects to new URL
```

## 💡 Recommendation

**I recommend:** `energy-consumption-analyzer`

**Why?**
- ✅ Clear and professional
- ✅ Describes the application purpose
- ✅ Good for SEO and discoverability
- ✅ Easy to remember and type
- ✅ Professional for client presentation
- ✅ Works well for Heroku app name too

## 📝 Quick Rename Checklist

- [ ] Decide on new name
- [ ] Go to GitHub Settings
- [ ] Rename repository
- [ ] Update local git remote (`./update-repo-name.sh`)
- [ ] Update DEPLOYMENT_READY.md
- [ ] Update HEROKU_DEPLOYMENT.md
- [ ] Update other documentation files
- [ ] Commit and push changes
- [ ] Update Heroku connection (if deployed)
- [ ] Test that everything works

## 🚨 Important Notes

**GitHub automatically:**
- Creates permanent redirect from old name
- Updates all repository references
- Keeps all history and data

**You need to:**
- Update local repository remotes
- Update documentation references
- Tell collaborators about the new name

**Old name still works:**
- GitHub redirects old URL to new URL
- No broken links
- Existing clones still work (but should be updated)

## 🎯 After Renaming

1. **Test the new URL:**
   ```bash
   git remote -v
   git fetch origin
   git pull origin main
   ```

2. **Update Heroku app name** (optional but recommended):
   - In Heroku Dashboard → Settings
   - Scroll to "App Information"
   - Click "Rename app"
   - Use same name as repository

3. **Verify documentation:**
   - Check all MD files for old name references
   - Update as needed

4. **Share new URL:**
   - Update bookmarks
   - Inform team/clients
   - Update any external documentation

## 📞 Support

If you have issues after renaming:

1. Check git remotes: `git remote -v`
2. Update remote if needed: `git remote set-url origin NEW_URL`
3. Test connection: `git fetch origin`
4. GitHub help: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository

---

**Ready to rename?** Go to:
https://github.com/cosmin-vestemean/codespaces-react-1/settings

Choose your new name and click "Rename"! 🚀
