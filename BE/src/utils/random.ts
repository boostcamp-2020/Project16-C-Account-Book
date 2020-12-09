const randomStr = (num: number): string => {
  let str = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  for (let i = 0; i < num; ++i) {
    str += chars[Math.floor(Math.random() * 100) % chars.length];
  }
  return str;
};

export default { randomStr };
