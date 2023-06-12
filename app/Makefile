.PHONY: help up up-prod down dev build push all test

#vars
IMAGENAME=core
REPO=my.core.app
IMAGEFULLNAME=${REPO}/${IMAGENAME}

up:
	docker-compose --project-name ${IMAGENAME} -f docker-compose.yml up --build 

up-prod:
	docker-compose --project-name ${IMAGENAME} -f docker-compose.yml -f docker-compose.prod.yml up --build -d

down:
	docker-compose down

dev:
	npm run dev

build:
	@docker build -f Dockerfile --no-cache --progress=plain --pull -t ${IMAGEFULLNAME}:latest .

push:
	@docker push ${IMAGEFULLNAME}

all: build push

test:
	npm run test:local -- --grep "${description}"

help:
	@echo ""
	@echo "Makefile"
	@echo ""
	@echo "From the project root run the following"
	@echo ""
	@echo "up      --  Start a development container"
	@echo ""
	@echo "up-prod --  Build and run compiled script 'production'"
	@echo ""
	@echo "down    --  Docker compose down"
	@echo ""
	@echo "dev     --  Run project in 'development' mode without container"
	@echo ""
	@echo "build   -- Docker build and tag with ${IMAGEFULLNAME}"
	@echo ""
	@echo "push    -- Push image"
	@echo ""
	@echo "all     -- Build, tag and push"
	@echo ""
	@echo "test    -- Run specific unit test using grep to find the test. Takes a value 'description"
	@echo ""
