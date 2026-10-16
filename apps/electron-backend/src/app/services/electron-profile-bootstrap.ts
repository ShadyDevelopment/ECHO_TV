import { app } from 'electron';
import { getElectronUserDataPath } from '@echo-tv/shared/database';
import { selectLegacyProfile } from './legacy-profile';

const override = getElectronUserDataPath();
const current = override ?? app.getPath('userData');
const legacy = selectLegacyProfile(
    process.env.ECHO_TV_E2E_DATA_DIR?.trim() || app.getPath('appData'),
    current
);
if (legacy || override) app.setPath('userData', legacy ?? current);
