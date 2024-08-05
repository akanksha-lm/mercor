// defining a function to get the time ago from the created date
export const timeAgo = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  const units = [
    { name: "y", seconds: 31536000 }, // 1 year = 365 * 24 * 60 * 60
    { name: "mn", seconds: 2592000 }, // 1 month = 30 * 24 * 60 * 60
    { name: "w", seconds: 604800 }, // 1 week = 7 * 24 * 60 * 60
    { name: "d", seconds: 86400 }, // 1 day = 24 * 60 * 60
    { name: "h", seconds: 3600 }, // 1 hour = 60 * 60
    { name: "m", seconds: 60 }, // 1 minute = 60
    { name: "s", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval}${unit.name}`;
    }
  }

  return "just now";
};
