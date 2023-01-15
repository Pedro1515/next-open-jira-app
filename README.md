## Getting Started Next.js OpenJira App

### Running Mongo Database

```bash
docker-compose up
# or
docker-compose up -d
```

- MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

### Configure Environments

Rename **.env.example** to **.env** and set the environment variables.

### Running App

- Intalling Node Modules:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

#### Or

- Building And Running Image With Docker:

```bash
docker build -t openjira-image .
docker run --name=openjira-container -p 3000:3000 openjira-image
```

### Populate Database With Test Information By Running:

```
http://localhost:3000/api/seed
```
