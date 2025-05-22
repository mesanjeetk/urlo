import Redis from "ioredis";

const redis = new Redis({
  port: 17281,
  username: "default",
  password: "85h3lKslM5EkGGlSz5GB28v925nxSwvY",
  host: "redis-17281.c267.us-east-1-4.ec2.redns.redis-cloud.com",
});

export default redis;
