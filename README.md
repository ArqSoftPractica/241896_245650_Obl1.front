# ASP-Secinaro-RodriguezSotto

Obl 1 ASP frontend

## Instrucciones para levantar el proyecto

### Produccion

#### Simular build de produccion mediante docker

```bash
# Mediante yarn
yarn drb

# Mediante docker puro
docker build -t aspfront . -f docker/Dockerfile
docker run --name aspfront -p 3000:3000 aspfront --env-file ./env
```

### Desarrollo

#### Local

```bash
yarn # El equipo utilizo yarn pero es posible tambien utilizar 'npm install'

yarn dev # npm run dev
```

### Docker

```bash
yarn d:dev # Lanzar el contenedor de desarrollo mediante el script de npm

docker-compose -f docker/docker-compose.yaml up # Lanzar el contenedor de desarrollo mediante docker-compose directo
```
