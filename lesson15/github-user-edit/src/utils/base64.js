const encode = str => new Buffer(str).toString('base64');
const decode = base64 => new Buffer(base64, 'base64').toString('ascii');

export { encode, decode };