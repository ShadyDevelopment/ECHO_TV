import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export const ECHO_TV_E2E_DATA_DIR_ENV = 'ECHO_TV_E2E_DATA_DIR';

/**
 * Operator-selected data root for deployments that keep the database on a
 * mounted volume, for example `/data`. The E2E override wins.
 */
export const ECHO_TV_DATA_DIR_ENV = 'ECHO_TV_DATA_DIR';

function ensureDirectory(dirPath: string): string {
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
    }

    return dirPath;
}

export function getEchoTvDataRoot(): string {
    const e2eDataDir = process.env[ECHO_TV_E2E_DATA_DIR_ENV]?.trim();

    if (e2eDataDir) {
        return ensureDirectory(e2eDataDir);
    }

    const dataDir = process.env[ECHO_TV_DATA_DIR_ENV]?.trim();

    if (dataDir) {
        return ensureDirectory(dataDir);
    }

    return ensureDirectory(join(homedir(), '.echo-tv'));
}

export function getEchoTvDatabaseDirectory(): string {
    return ensureDirectory(join(getEchoTvDataRoot(), 'databases'));
}

export function getEchoTvDatabasePath(): string {
    return join(getEchoTvDatabaseDirectory(), 'echo-tv.db');
}

export function getElectronUserDataPath(): string | null {
    const e2eDataDir = process.env[ECHO_TV_E2E_DATA_DIR_ENV]?.trim();

    if (!e2eDataDir) {
        return null;
    }

    return ensureDirectory(join(e2eDataDir, 'user-data'));
}

export function getElectronConfigDirectory(): string | null {
    const e2eDataDir = process.env[ECHO_TV_E2E_DATA_DIR_ENV]?.trim();

    if (!e2eDataDir) {
        return null;
    }

    return ensureDirectory(join(e2eDataDir, 'config'));
}
