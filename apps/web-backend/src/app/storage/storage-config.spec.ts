import { readServerStorageConfig } from './storage-config';

describe('readServerStorageConfig', () => {
    it('keeps storage off and the API open by default', () => {
        expect(readServerStorageConfig({})).toEqual({
            enabled: false,
            accessToken: null,
            maxDocumentBytes: 64 * 1024 * 1024,
        });
    });

    it('enables storage only for ECHO_TV_STORAGE=server', () => {
        expect(
            readServerStorageConfig({ ECHO_TV_STORAGE: ' Server ' }).enabled
        ).toBe(true);
        expect(
            readServerStorageConfig({ ECHO_TV_STORAGE: 'none' }).enabled
        ).toBe(false);
        expect(
            readServerStorageConfig({ ECHO_TV_STORAGE: '1' }).enabled
        ).toBe(false);
    });

    it('reads a trimmed access token and ignores a blank one', () => {
        expect(
            readServerStorageConfig({ ECHO_TV_ACCESS_TOKEN: ' s3cret ' })
                .accessToken
        ).toBe('s3cret');
        expect(
            readServerStorageConfig({ ECHO_TV_ACCESS_TOKEN: '  ' })
                .accessToken
        ).toBeNull();
    });

    it('reads a positive document limit in megabytes', () => {
        expect(
            readServerStorageConfig({ ECHO_TV_MAX_DOCUMENT_MB: '8' })
                .maxDocumentBytes
        ).toBe(8 * 1024 * 1024);
        expect(
            readServerStorageConfig({ ECHO_TV_MAX_DOCUMENT_MB: '-1' })
                .maxDocumentBytes
        ).toBe(64 * 1024 * 1024);
    });
});
