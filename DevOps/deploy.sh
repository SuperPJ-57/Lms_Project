#!/usr/bin/env bash
set -e

REPO=superpj57
TAG=latest
SERVICES=(frontend backend nginx)

echo "Logging into Docker Hub..."
docker login

for SERVICE in "${SERVICES[@]}"; do
  IMG="$REPO/$SERVICE:$TAG"
  if [ "$SERVICE" = "nginx" ]; then
    DOCKERFILE_PATH="DevOps/nginx/Dockerfile.nginx"
    CONTEXT_PATH="DevOps/nginx"
  else
    DOCKERFILE_PATH="DevOps/Dockerfile.$SERVICE"
    CONTEXT_PATH="."
  fi

  echo "Building and pushing $IMG..."
  docker build -t "$IMG" -f "$DOCKERFILE_PATH" "$CONTEXT_PATH"
  docker push "$IMG"
done

echo "Deploying with docker-compose..."
docker compose -f DevOps/docker-compose.yml pull
docker compose -f DevOps/docker-compose.yml up -d

echo "Cleaning up unused Docker resources..."
docker system prune -f

echo "Deployment complete."
