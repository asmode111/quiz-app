#!/usr/bin/env bash

function start() {
    docker-compose up -d
}

function build() {
    docker-compose up --build
}

function stop() {
    docker-compose stop
}

function app() {
    docker exec -it zend_cert_app /bin/bash
}

function api() {
    docker exec -it zend_cert_api /bin/bash
}

"$@"
