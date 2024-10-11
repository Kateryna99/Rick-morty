export const setPendingRejectStatus = (state, keys: string[], [...statuses]) => {
    const [loading, error] = keys;
    const [loadingStatus, errorStatus] = statuses;

    state[loading] = loadingStatus;
    state[error] = errorStatus;
}

export const setFulfilledStatus = (state, keys: string[], payload) => {
    const [loading, list] = keys;

    state[list] = payload;
    state[loading] = false;
}