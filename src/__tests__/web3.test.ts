import EthersHelper from '../index';

test('Init', async () => {
  const ethersHelper = new EthersHelper();
  const response = ethersHelper.initRpc('http://127.0.0.1:7545');
  expect(response.hasOwnProperty('provider')).toBe(true);
  expect(response.hasOwnProperty('signer')).toBe(true);
});
