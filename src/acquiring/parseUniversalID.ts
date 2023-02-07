const parseUniversalID = (universalID: string) =>
  Object.fromEntries(universalID.split(';').map(item => item.split(':')));

export default parseUniversalID;
