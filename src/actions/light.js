

export function saveStatus(status) {
  return {
    type: 'STATE_REFRESHED',
    payload: status,
  };
}
