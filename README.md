## Getting Started Next.js OpenJira App

### Running Mongo Database

```bash
docker-compose up
# or
docker-compose up -d
```

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

### Configure Environments
Rename __.env.example__ to __.env__ and set the environment variables.

### Intalling Node Modules And Running App
```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

### Populate Database With Test Information By Running:
```
http://localhost:3000/api/seed
```