import {
  useURLforDT,
  useURLforLIB,
  getWorkbenchLinkValues,
  cleanURL,
  useURLbasename,
} from 'util/envUtil';
import { useSelector } from 'react-redux';

jest.unmock('util/envUtil');

describe('envUtil', () => {
  const testDT = 'testDT';
  const testLIB = '';
  const testAppURL = 'https://example.com';
  const testBasename = 'testBasename';
  const testWorkbenchEndpoints = [
    'one',
    '/two',
    'three/',
    '/four/',
    '/five/guy/',
  ];
  const testUsername = 'username';

  window.env = {
    REACT_APP_ENVIRONMENT: 'test',
    REACT_APP_URL: testAppURL,
    REACT_APP_URL_BASENAME: testBasename,
    REACT_APP_URL_DTLINK: testDT,
    REACT_APP_URL_LIBLINK: testLIB,
    REACT_APP_WORKBENCHLINK_TERMINAL: testWorkbenchEndpoints[0],
    REACT_APP_WORKBENCHLINK_VNCDESKTOP: testWorkbenchEndpoints[1],
    REACT_APP_WORKBENCHLINK_VSCODE: testWorkbenchEndpoints[2],
    REACT_APP_WORKBENCHLINK_JUPYTERLAB: testWorkbenchEndpoints[3],
    REACT_APP_WORKBENCHLINK_JUPYTERNOTEBOOK: testWorkbenchEndpoints[4],
  };

  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue({ userName: testUsername });
  });

  test('GetURL should return the correct enviroment variables', () => {
    expect(useURLforDT()).toBe(
      `${testAppURL}/${testBasename}/${testUsername}/${testDT}`
    );
    expect(useURLforLIB()).toBe(
      `${testAppURL}/${testBasename}/${testUsername}/${testLIB}`
    );
    expect(useURLbasename()).toBe(testBasename);
  });

  test('GetWorkbenchLinkValues should return an array', () => {
    const result = getWorkbenchLinkValues();
    expect(Array.isArray(result)).toBe(true);
  });

  // Test that array elements have the expected shape
  test('GetWorkbenchLinkValues should return an array of objects with "key" and "link" properties', () => {
    const result = getWorkbenchLinkValues();
    expect(
      result.every(
        (el) => typeof el.key === 'string' && typeof el.link === 'string'
      )
    ).toBe(true);
  });

  // Test that the links are correctly constructed
  it('should construct the links correctly', () => {
    const result = getWorkbenchLinkValues();

    result.forEach((el, i) => {
      expect(el.link).toEqual(
        `${testAppURL}/${testBasename}/${testUsername}/${cleanURL(
          testWorkbenchEndpoints[i]
        )}`
      );
    });
  });

  it('cleanURL should remove leading and trailing slashes', () => {
    expect(cleanURL('/test/')).toBe('test');
    expect(cleanURL('/test')).toBe('test');
    expect(cleanURL('test/')).toBe('test');
    expect(cleanURL('test')).toBe('test');
  });

  it('still handles if basename is set to empty string', () => {
    window.env.REACT_APP_URL_BASENAME = '';
    expect(useURLforDT()).toBe(`${testAppURL}/${testUsername}/${testDT}`);
    expect(useURLforLIB()).toBe(`${testAppURL}/${testUsername}/${testLIB}`);
    expect(useURLbasename()).toBe('');
  });
});
