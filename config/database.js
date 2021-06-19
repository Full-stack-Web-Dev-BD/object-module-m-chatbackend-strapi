module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        host: env("DATABASE_HOST", "cluster0.zgay3.mongodb.net"),
        srv: env.bool("DATABASE_SRV", true),
        port: env.int("DATABASE_PORT", 27017),
        database: env("DATABASE_NAME", "myFirstDatabase"),
        username: env("DATABASE_USERNAME", "admin"),
        password: env("DATABASE_PASSWORD", "PeCcM2YVDxjxBiWA"),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
        ssl: env.bool("DATABASE_SSL", true),
      },
    },
  },
});

// ================================local connection================================

// module.exports = ({ env }) => ({
//   defaultConnection: "default",
//   connections: {
//     default: {
//       connector: "mongoose",
//       settings: {
//         host: env("DATABASE_HOST", "127.0.0.1"),
//         srv: env.bool("DATABASE_SRV", false),
//         port: env.int("DATABASE_PORT", 27017),
//         database: env("DATABASE_NAME", "mongotest"),
//         username: env("DATABASE_USERNAME", null),
//         password: env("DATABASE_PASSWORD", null),
//       },
//       options: {
//         authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
//         ssl: env.bool("DATABASE_SSL", false),
//       },
//     },
//   },
// });

// ====================remote connection================
// PeCcM2YVDxjxBiWA
// mongodb+srv://admin:PeCcM2YVDxjxBiWA@cluster0.zgay3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// module.exports = ({ env }) => ({
//   defaultConnection: "default",
//   connections: {
//     default: {
//       connector: "mongoose",
//       settings: {
//         host: env("DATABASE_HOST", "cluster0.zgay3.mongodb.net"),
//         srv: env.bool("DATABASE_SRV", true),
//         port: env.int("DATABASE_PORT", 27017),
//         database: env("DATABASE_NAME", "myFirstDatabase"),
//         username: env("DATABASE_USERNAME", "admin"),
//         password: env("DATABASE_PASSWORD", "PeCcM2YVDxjxBiWA"),
//       },
//       options: {
//         authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
//         ssl: env.bool("DATABASE_SSL", true),
//       },
//     },
//   },
// });
