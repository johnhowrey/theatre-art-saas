#!/bin/bash
# Deploy Theatre Art SaaS to DigitalOcean App Platform
# Run this from your local machine: bash deploy.sh

API_KEY="${DIGITALOCEAN_API_KEY:?Set DIGITALOCEAN_API_KEY env var before running}"

curl -X POST https://api.digitalocean.com/v2/apps \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "spec": {
    "name": "theatre-art-saas",
    "region": "nyc",
    "services": [
      {
        "name": "web",
        "github": {
          "repo": "johnhowrey/theatre-art-saas",
          "branch": "claude/setup-project-1vG2L",
          "deploy_on_push": true
        },
        "build_command": "npx prisma generate && npm run build",
        "run_command": "npm start",
        "environment_slug": "node-js",
        "instance_count": 1,
        "instance_size_slug": "apps-s-1vcpu-0.5gb",
        "http_port": 3000,
        "envs": [
          {
            "key": "DATABASE_URL",
            "scope": "RUN_AND_BUILD_TIME",
            "value": "${db.DATABASE_URL}"
          },
          {
            "key": "AUTH_SECRET",
            "scope": "RUN_AND_BUILD_TIME",
            "type": "SECRET",
            "value": "a3kF9mPxwQ7nR2vL8jT5"
          },
          {
            "key": "NEXT_PUBLIC_APP_URL",
            "scope": "RUN_AND_BUILD_TIME",
            "value": "${APP_URL}"
          }
        ]
      }
    ],
    "databases": [
      {
        "name": "db",
        "engine": "PG",
        "production": false,
        "version": "16"
      }
    ]
  }
}'
