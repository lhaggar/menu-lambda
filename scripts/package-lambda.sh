#!/usr/bin/env bash

set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
package_dir=$(mktemp -d)
output_dir="$repo_root/build"
output_file="$output_dir/menu-lambda.zip"

cleanup() {
  rm -rf "$package_dir"
}
trap cleanup EXIT

cp "$repo_root/package.json" "$repo_root/package-lock.json" "$package_dir/"
npm ci --omit=dev --ignore-scripts --prefix "$package_dir"
cp "$repo_root/handler.js" "$package_dir/"
cp -R "$repo_root/src" "$package_dir/"

mkdir -p "$output_dir"
rm -f "$output_file"
(
  cd "$package_dir"
  zip -q -r "$output_file" handler.js src node_modules package.json package-lock.json
)

printf 'Created %s\n' "$output_file"
