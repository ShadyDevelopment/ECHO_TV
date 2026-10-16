/**
 * Instrumentation flags a journey launch sets on the Electron process.
 *
 * Every journey needs the renderer-API trace (`ECHO_TV_TRACE_IPC`) for its
 * IPC counters. Only J1 and J4 (for its SQL count) record the main-process
 * counters: `ECHO_TV_PERF_CAPTURE` turns on the counters and their read handler, and
 * `ECHO_TV_PERF_COUNT_SQL` wraps every main-thread and worker SQLite
 * statement to count it (see journey-main-counters.ts). A journey that
 * continues from the launch without reading them (J2) leaves both off, so
 * its latency and workload are not measured under that extra
 * instrumentation.
 */
export interface JourneyLaunchInstrumentation {
    readonly mainCounters: boolean;
}

export function journeyLaunchEnvironment(
    instrumentation: JourneyLaunchInstrumentation
): Record<string, string> {
    return {
        ...(instrumentation.mainCounters
            ? { ECHO_TV_PERF_CAPTURE: '1', ECHO_TV_PERF_COUNT_SQL: '1' }
            : {}),
        ECHO_TV_TRACE_IPC: '1',
    };
}
