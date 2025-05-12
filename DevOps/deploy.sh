#!/usr/bin/env bash
set -e

REPO=superpj57
TAG=latest
SERVICES=(frontend backend)

echo "Logging into Docker Hub..."
docker login

for SERVICE in "${SERVICES[@]}"; do
  IMG="$REPO/$SERVICE:$TAG"
  echo "Processing $SERVICE..."
  if docker image inspect "$IMG" > /dev/null 2>&1; then
    docker rmi -f "$IMG"
  fi
  docker build -t "$IMG" -f DevOps/Dockerfile.$SERVICE ./$SERVICE
  docker push "$IMG"
done

echo "Pulling images and deploying containers..."
docker compose -f DevOps/docker-compose.yml pull
docker compose -f DevOps/docker-compose.yml up -d

echo "Pruning unused resources..."
docker system prune -f

echo "Deployment complete."
