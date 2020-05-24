import getColorByString from 'helpers/getColorByString';

const resolvers = {
  Account: {
    avatarColor: ({ name, currency }) => getColorByString(`${currency}${name}`),
    avatarSymbol: ({ name }) => name[0]
  },
  Transaction: {
    avatarColor:
      ({ account, amount }) => (
        getColorByString(`${account.id}${amount}${account.currency}`)
      )
  },
};

export default resolvers;
