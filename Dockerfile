FROM node:20-alpine

RUN corepack enable

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN yarn install --immutable

# Copy and setup entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "start"]