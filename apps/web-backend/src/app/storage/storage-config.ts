export interface ServerStorageConfig {
    /** `ECHO_TV_STORAGE=server`; the Docker image sets it. */
    readonly enabled: boolean;
    /** `ECHO_TV_ACCESS_TOKEN`; guards every non-public route when set. */
    readonly accessToken: string | null;
    /** Largest accepted playlist document (`ECHO_TV_MAX_DOCUMENT_MB`). */
    readonly maxDocumentBytes: number;
}

const DEFAULT_MAX_DOCUMENT_MB = 64;
const BYTES_PER_MB = 1024 * 1024;

export function readServerStorageConfig(
    env: Record<string, string | undefined> = process.env
): ServerStorageConfig {
    const mode = env['ECHO_TV_STORAGE']?.trim().toLowerCase();
    const token = env['ECHO_TV_ACCESS_TOKEN']?.trim();
    const megabytes = Number(env['ECHO_TV_MAX_DOCUMENT_MB']);

    return {
        enabled: mode === 'server',
        accessToken: token ? token : null,
        maxDocumentBytes:
            (Number.isFinite(megabytes) && megabytes > 0
                ? megabytes
                : DEFAULT_MAX_DOCUMENT_MB) * BYTES_PER_MB,
    };
}
