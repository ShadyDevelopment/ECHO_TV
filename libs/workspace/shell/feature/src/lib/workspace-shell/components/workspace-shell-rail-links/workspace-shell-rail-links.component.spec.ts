import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { PortalRailLink } from '@echo-tv/portal/shared/util';
import { WorkspaceShellRailLinksComponent } from './workspace-shell-rail-links.component';

describe('WorkspaceShellRailLinksComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WorkspaceShellRailLinksComponent],
            providers: [provideRouter([])],
        });
    });

    it('renders the ECHO TV mark only for the workspace dashboard link', () => {
        const fixture = TestBed.createComponent(
            WorkspaceShellRailLinksComponent
        );
        const dashboardLink: PortalRailLink = {
            icon: 'dashboard',
            tooltip: 'Dashboard',
            path: ['/workspace', 'dashboard'],
        };
        const sourceLink: PortalRailLink = {
            icon: 'playlist_play',
            tooltip: 'Sources',
            path: ['/workspace', 'sources'],
        };
        fixture.componentRef.setInput('links', [dashboardLink, sourceLink]);
        fixture.detectChanges();

        expect(fixture.componentInstance.isDashboardLink(dashboardLink)).toBe(
            true
        );
        expect(fixture.componentInstance.isDashboardLink(sourceLink)).toBe(
            false
        );
        expect(
            fixture.nativeElement.querySelector(
                '.portal-rail-link__brand-mark'
            )?.getAttribute('src')
        ).toBe('assets/images/echo-tv-mark.png');
        expect(
            fixture.nativeElement.querySelectorAll(
                '.portal-rail-link__brand-mark'
            )
        ).toHaveLength(1);
    });
});
