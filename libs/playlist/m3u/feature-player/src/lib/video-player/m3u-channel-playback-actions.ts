import { ChannelActions } from '@echo-tv/m3u-state';
import { Channel } from '@echo-tv/shared/interfaces';

export function createM3uChannelPlaybackRequest(channel: Channel) {
    return ChannelActions.setActiveChannel({
        channel,
        startPlayback: true,
    });
}
