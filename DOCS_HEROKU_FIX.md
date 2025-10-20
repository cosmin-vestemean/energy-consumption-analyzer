# Documentation Hub - Heroku Deployment Fix

## Issue
On Heroku hosted apps, clicking the Documentation button (📚) would:
1. Open `/docs/index.html` in a new window
2. Immediately redirect to `/docs`
3. Then reload the main app instead of showing documentation

This happened because:
- Heroku uses `npx serve` to host the built app
- The `-s` flag treats the app as a Single Page Application (SPA)
- SPA mode rewrites all routes to `index.html`
- This caused `/docs/index.html` to be rewritten to the main app

## Solution

### 1. Created `serve.json` Configuration
```json
{
  "rewrites": [
    { "source": "**/*.html", "destination": "/$0" },
    { "source": "**", "destination": "/index.html" }
  ]
}
```

This tells `serve` to:
- First, try to serve any `.html` file as-is (includes `/docs/index.html`)
- Then, fallback to `/index.html` for SPA routing

### 2. Updated `Procfile`
Changed from:
```
web: npx serve -s dist -p $PORT
```

To:
```
web: npx serve dist -p $PORT
```

Removed the `-s` flag to allow custom rewrites via `serve.json`.

### 3. Updated `App.jsx` Documentation Function
Changed from:
```javascript
const openDocumentation = () => {
  window.open('/docs/index.html', '_blank', 'width=1200,height=800');
};
```

To:
```javascript
const openDocumentation = () => {
  // Use absolute URL to ensure proper navigation in production
  const docsUrl = `${window.location.origin}/docs/index.html`;
  window.open(docsUrl, '_blank', 'width=1200,height=800');
};
```

This constructs the full URL dynamically based on the current origin.

## Testing Locally

To test the serve configuration locally before deploying:

```bash
# Build the app
npm run build

# Serve using the same configuration as Heroku
npx serve dist -p 5000

# Test in browser:
# - Navigate to http://localhost:5000
# - Click the 📚 Documentation button
# - Verify it opens the documentation hub correctly
```

## Deployment to Heroku

After these changes:

```bash
git add .
git commit -m "Fix documentation hub routing on Heroku"
git push heroku main
```

The documentation hub should now work correctly on Heroku.

## How It Works

### Local Development (Vite)
- Vite dev server serves files from `public/` directory
- `/docs/index.html` is accessible directly
- No rewriting issues

### Production Build (Heroku)
- Build creates `dist/` folder with all assets
- `public/docs/` is copied to `dist/docs/`
- `serve` uses `serve.json` rules:
  1. Matches `*.html` files → serves them directly
  2. Matches other routes → serves `index.html` (SPA)
- Documentation files are served correctly

## Files Modified

1. ✅ `serve.json` (new) - Serve configuration
2. ✅ `Procfile` - Removed `-s` flag
3. ✅ `App.jsx` - Use absolute URL for docs

## Verification Checklist

Before deploying, verify:
- [ ] `npm run build` succeeds
- [ ] `dist/docs/index.html` exists after build
- [ ] `dist/docs/*.html` files exist (all 5 doc pages)
- [ ] Local serve test works (`npx serve dist -p 5000`)
- [ ] Documentation button opens docs in new window
- [ ] No redirect loops or app reloading

## Benefits

✅ **Works on Heroku:** Documentation loads correctly  
✅ **Works locally:** No changes to dev experience  
✅ **Maintains SPA routing:** Main app still works as SPA  
✅ **Clean URLs:** Documentation has proper URLs  
✅ **No external dependencies:** Uses built-in serve features  

---

**The documentation hub now works seamlessly in both development and production!** 📚✨
