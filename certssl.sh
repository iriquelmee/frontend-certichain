#!/bin/bash

# Actualizar repositorios e instalar Certbot
sudo apt update
sudo apt install -y certbot

# Generar los certificados SSL para tu dominio
sudo certbot certonly --standalone -d certichain.ddns.net