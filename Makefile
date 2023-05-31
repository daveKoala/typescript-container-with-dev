up:
	docker-compose --project-name core -f ./app/docker-compose.yml up --build 

up-prod:
	docker-compose --project-name core -f ./app/docker-compose.yml -f ./app/docker-compose.prod.yml up --build -d

down:
	docker-compose down

dev:
	npm run dev --prefix ./app
