#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# Publish the latest website from GitHub. Run on the server, as `amco`:
#
#   bash /srv/amco-website/deploy/deploy.sh
#
# Pulls main, builds, then copies out/ into live/ (what nginx serves).
# The live site keeps working during the build; only the final copy swaps it.
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

ROOT=/srv/amco-website
cd "$ROOT"

echo "1/4  Pulling the latest code"
git pull --ff-only origin main

echo "2/4  Installing packages"
npm ci --no-audit --no-fund

echo "3/4  Building the site"
npm run build

echo "4/4  Publishing out/ to live/"
mkdir -p live
# Files that disappeared from the build are removed only AFTER the new ones
# are in place, so a visitor mid-page never asks for a file that is gone.
rsync -a --delete-after out/ live/

echo
echo "Done — commit $(git rev-parse --short HEAD) is live."
for path in / /explore/ /demo/ /ur/; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --resolve amcoconsultants.tech:443:127.0.0.1 "https://amcoconsultants.tech${path}" || true)
  echo "  ${path}  ${code}"
done
