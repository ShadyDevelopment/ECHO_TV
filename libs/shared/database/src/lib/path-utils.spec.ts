const homedirMock = jest.fn<string, []>();

jest.mock('os', () => ({
    ...jest.requireActual('os'),
    homedir: () => homedirMock(),
}));

import { existsSync, mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
    ECHO_TV_DATA_DIR_ENV,
    ECHO_TV_E2E_DATA_DIR_ENV,
    getElectronConfigDirectory,
    getElectronUserDataPath,
    getEchoTvDataRoot,
    getEchoTvDatabaseDirectory,
    getEchoTvDatabasePath,
} from './path-utils';

describe('path-utils', () => {
    let tempRoot: string;
    let originalEnvValue: string | undefined;
    let originalDataDirValue: string | undefined;

    beforeEach(() => {
        tempRoot = mkdtempSync(join(tmpdir(), 'echo-tv-path-utils-'));
        homedirMock.mockReturnValue(join(tempRoot, 'home'));
        originalEnvValue = process.env[ECHO_TV_E2E_DATA_DIR_ENV];
        delete process.env[ECHO_TV_E2E_DATA_DIR_ENV];
        originalDataDirValue = process.env[ECHO_TV_DATA_DIR_ENV];
        delete process.env[ECHO_TV_DATA_DIR_ENV];
    });

    afterEach(() => {
        if (originalEnvValue === undefined) {
            delete process.env[ECHO_TV_E2E_DATA_DIR_ENV];
        } else {
            process.env[ECHO_TV_E2E_DATA_DIR_ENV] = originalEnvValue;
        }
        if (originalDataDirValue === undefined) {
            delete process.env[ECHO_TV_DATA_DIR_ENV];
        } else {
            process.env[ECHO_TV_DATA_DIR_ENV] = originalDataDirValue;
        }
        rmSync(tempRoot, { force: true, recursive: true });
    });

    it('uses and creates ECHO_TV_DATA_DIR as the data root', () => {
        const dataDir = join(tempRoot, 'volume');
        process.env[ECHO_TV_DATA_DIR_ENV] = ` ${dataDir} `;

        expect(getEchoTvDataRoot()).toBe(dataDir);
        expect(existsSync(dataDir)).toBe(true);
        expect(getEchoTvDatabasePath()).toBe(
            join(dataDir, 'databases', 'echo-tv.db')
        );
    });

    it('lets the E2E override win over ECHO_TV_DATA_DIR', () => {
        const e2eDir = join(tempRoot, 'e2e');
        process.env[ECHO_TV_E2E_DATA_DIR_ENV] = e2eDir;
        process.env[ECHO_TV_DATA_DIR_ENV] = join(tempRoot, 'volume');

        expect(getEchoTvDataRoot()).toBe(e2eDir);
    });

    it('ignores a blank ECHO_TV_DATA_DIR', () => {
        process.env[ECHO_TV_DATA_DIR_ENV] = '   ';

        expect(getEchoTvDataRoot()).toBe(
            join(tempRoot, 'home', '.echo-tv')
        );
    });

    it('uses and creates the E2E data dir override when the env variable is set', () => {
        const e2eDataDir = join(tempRoot, 'e2e-data');
        process.env[ECHO_TV_E2E_DATA_DIR_ENV] = e2eDataDir;

        expect(getEchoTvDataRoot()).toBe(e2eDataDir);
        expect(existsSync(e2eDataDir)).toBe(true);
    });

    it('falls back to ~/.echo-tv when the env override is blank', () => {
        process.env[ECHO_TV_E2E_DATA_DIR_ENV] = '   ';

        const expectedRoot = join(tempRoot, 'home', '.echo-tv');

        expect(getEchoTvDataRoot()).toBe(expectedRoot);
        expect(existsSync(expectedRoot)).toBe(true);
    });

    it('places the databases directory and database file under the data root', () => {
        const e2eDataDir = join(tempRoot, 'e2e-data');
        process.env[ECHO_TV_E2E_DATA_DIR_ENV] = e2eDataDir;

        const databaseDirectory = getEchoTvDatabaseDirectory();

        expect(databaseDirectory).toBe(join(e2eDataDir, 'databases'));
        expect(existsSync(databaseDirectory)).toBe(true);
        expect(getEchoTvDatabasePath()).toBe(
            join(e2eDataDir, 'databases', 'echo-tv.db')
        );
    });

    it('returns null Electron user-data and config paths outside E2E runs', () => {
        expect(getElectronUserDataPath()).toBeNull();
        expect(getElectronConfigDirectory()).toBeNull();
    });

    it('creates Electron user-data and config directories under the E2E root', () => {
        const e2eDataDir = join(tempRoot, 'e2e-data');
        process.env[ECHO_TV_E2E_DATA_DIR_ENV] = e2eDataDir;

        const userDataPath = getElectronUserDataPath();
        const configDirectory = getElectronConfigDirectory();

        expect(userDataPath).toBe(join(e2eDataDir, 'user-data'));
        expect(configDirectory).toBe(join(e2eDataDir, 'config'));
        expect(existsSync(userDataPath as string)).toBe(true);
        expect(existsSync(configDirectory as string)).toBe(true);
    });
});
