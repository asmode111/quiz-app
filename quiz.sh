#!/usr/bin/env bash

function start() {
    docker-compose up
}

function build() {
    docker-compose up --build
}

function stop() {
    docker-compose stop
}

function app() {
    docker exec -it quiz_app /bin/bash
}

function api() {
    docker exec -it quiz_api /bin/bash
}

"$@"
