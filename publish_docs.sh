yarn docs
cd docs
git init .
git remote add origin git://github.com/gamestdio/mathf.git
git checkout -b docs
git add .
git commit -m "update docs"
git push origin docs:gh-pages
