# message

body
sender_id
receipient_id
conversation_id

# message

userid
socketid

      {[0].map((message, index) => {
        return (
          <div
            className={`message-row ${
              message.isMyMessage ? "you-message" : "other-message"
            }`}
          >
            <div className="message-content">
              {/* {imageThumbnail} */}
              {message.isMyMessage ? null : (
                <img
                  src={`/images/profiles/${message.imageUrl}`}
                  alt={message.imageAlt}
                />
              )}
              <div className="message-text">{message.messageText}</div>
              <div className="message-time">{message.createdAt}</div>
            </div>
          </div>
        );
      })}

<!-- db -->

module.exports = ({ env }) => ({
defaultConnection: "default",
connections: {
default: {
connector: "bookshelf",
settings: {
client: "postgres",
host: env("DATABASE_HOST", "localhost"),
port: env.int("DATABASE_PORT", 5432),
database: env("DATABASE_NAME", "chat-app"),
username: env("DATABASE_USERNAME", "postgres"),
password: env("DATABASE_PASSWORD", "admin"),
schema: "public",
},
options: {},
},
},
});

<!-- scripts  -->

    "develop": "strapi develop",
    "strapistart": "strapi start",
    "build": "strapi build",
    "strapi": "strapi",
    "client": "npm run dev --prefix client",
    "dev": "concurrently \"npm run develop\" \"npm run client\"",
    "client-install": "npm install --prefix client",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
