#!/bin/sh
# Restart contract: on hibernate/revive the platform runs this to bring the
# preview back up. Idempotent and non-blocking — probes first, exits fast.
#
# `cd` is derived from this script's own location rather than a hard-coded
# /workspace path, so the project works from any checkout root.
set -eu
cd "$(dirname "$0")"

if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi

npm run dev >>/tmp/app-startup.log 2>&1 &
