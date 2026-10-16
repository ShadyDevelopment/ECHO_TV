import { inject, Injectable, Provider } from '@angular/core';
import type { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PORTAL_SHELL_ACTIONS } from '@echo-tv/portal/shared/util/tokens';
import { LazyMatDialog } from '@echo-tv/ui/components/lazy-dialog';
import {
    WORKSPACE_SHELL_ACTIONS,
    WorkspaceAccountInfoData,
    WorkspacePlaylistType,
    WorkspaceShellActions,
    WorkspaceStalkerAccountInfoData,
} from '@echo-tv/workspace/shell/util';

/**
 * Created with the app (the shell's keyboard shortcuts reach it from the
 * root), so every dialog it opens, and Material's dialog service itself,
 * is imported on first use.
 */
@Injectable({ providedIn: 'root' })
export class AppWorkspaceShellActionsService implements WorkspaceShellActions {
    private readonly lazyDialog = inject(LazyMatDialog);
    private readonly router = inject(Router);

    openAddPlaylistDialog(type?: WorkspacePlaylistType): void {
        this.openDialog(
            import('@echo-tv/playlist/import/feature'),
            (dialog, { AddPlaylistDialogComponent }) => {
                dialog.open(AddPlaylistDialogComponent, {
                    // Width sized for the 5-card method picker plus the
                    // selected method's form below. Matches the v0.22
                    // mockup; falls back to viewport-clamped width on
                    // narrow screens so the grid can collapse via the
                    // SCSS responsive breakpoints.
                    width: '780px',
                    maxWidth: '92vw',
                    data: type ? { type } : {},
                });
            }
        );
    }

    openGlobalSearch(initialQuery = ''): void {
        const query = initialQuery.trim();
        void this.router.navigate(['/workspace/search'], {
            queryParams: query ? { q: query } : {},
        });
    }

    openGlobalRecent(): void {
        void this.router.navigate(['/workspace/global-recent']);
    }

    openAccountInfo(data: WorkspaceAccountInfoData): void {
        this.openDialog(
            import('@echo-tv/portal/xtream/feature'),
            (dialog, { AccountInfoComponent }) => {
                dialog.open(AccountInfoComponent, {
                    width: '80%',
                    maxWidth: '1200px',
                    maxHeight: '90vh',
                    data,
                });
            }
        );
    }

    openStalkerAccountInfo(data: WorkspaceStalkerAccountInfoData): void {
        this.openDialog(
            import('@echo-tv/portal/stalker/feature'),
            (dialog, { StalkerAccountInfoComponent }) => {
                dialog.open(StalkerAccountInfoComponent, {
                    width: '80%',
                    maxWidth: '1200px',
                    maxHeight: '90vh',
                    data,
                });
            }
        );
    }

    /** Opens once both the dialog service and the component's chunk are in. */
    private openDialog<T>(
        load: Promise<T>,
        open: (dialog: MatDialog, module: T) => void
    ): void {
        void Promise.all([this.lazyDialog.resolve(), load]).then(
            ([dialog, module]) => open(dialog, module)
        );
    }
}

export function provideWorkspaceShellActions(): Provider[] {
    return [
        AppWorkspaceShellActionsService,
        {
            provide: WORKSPACE_SHELL_ACTIONS,
            useExisting: AppWorkspaceShellActionsService,
        },
        {
            provide: PORTAL_SHELL_ACTIONS,
            useExisting: AppWorkspaceShellActionsService,
        },
    ];
}
