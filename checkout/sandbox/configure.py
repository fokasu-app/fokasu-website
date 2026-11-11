#!/usr/bin/env python3
"""Write the sandbox's PUBLIC client token from deployment environment; no API keys."""
import json
import os
import re
from pathlib import Path

if os.environ.get("PADDLE_ENVIRONMENT") != "sandbox":
    raise SystemExit("This page requires PADDLE_ENVIRONMENT=sandbox.")
token = os.environ.get("PADDLE_CLIENT_TOKEN", "")
if not re.fullmatch(r"test_[A-Za-z0-9]+", token):
    raise SystemExit("A sandbox Paddle client-side token is required.")
Path(__file__).with_name("config.js").write_text(
    "// Public sandbox client-side token. Generated for this deployment.\n"
    + "window.FOKASU_CHECKOUT = Object.freeze("
    + json.dumps({"environment": "sandbox", "clientToken": token}) + ");\n"
)
print("Sandbox checkout public configuration prepared.")
