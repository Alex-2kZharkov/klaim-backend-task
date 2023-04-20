# DB deployment using Prisma
- Create local .env file (see .env.example file) and provide the `DATABASE_URL` variable with the correct connection string to your Postgresql DB
- Run the `npx prisma generate` command to generate prisma client
- Run the `npx prisma migrate dev` command to apply existing migrations to your DB

# # Install certificates to enable https locally
- Install mkcert https://github.com/FiloSottile/mkcert#installation
- Run `mkcert -install`
- Run `mkcert -key-file key.pem -cert-file cert.pem localhost` to generate local https certificates
