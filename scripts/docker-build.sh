#!/usr/bin/env bash
set -euo pipefail

# Build production Docker images for WealthWise
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

GIT_SHA=$(git -C "${REPO_ROOT}" rev-parse --short HEAD 2>/dev/null || echo "latest")

echo "Building WealthWise production images (${GIT_SHA})..."

echo ""
echo "==> Building API image..."
docker build \
    -f "${REPO_ROOT}/apps/api/Dockerfile.prod" \
    -t "wealthwise-api:${GIT_SHA}" \
    -t "wealthwise-api:latest" \
    "${REPO_ROOT}"

echo ""
echo "==> Building Web image..."
docker build \
    -f "${REPO_ROOT}/apps/web/Dockerfile.prod" \
    -t "wealthwise-web:${GIT_SHA}" \
    -t "wealthwise-web:latest" \
    "${REPO_ROOT}"

echo ""
echo "Build complete:"
echo "  wealthwise-api:${GIT_SHA}"
echo "  wealthwise-web:${GIT_SHA}"
