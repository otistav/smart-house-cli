

export function saveLightStatus(status) {
  return {
    type: 'LIGHT_STATUS_RECEIVED',
    payload: status,
  };
}
