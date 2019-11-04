/*
 * Adjust the scheduledEndTime to (roughly) match the client clock
 * Assumes a fixed value for LATENCY
 */

import {Handler} from 'relay-runtime'

const LATENCY = 200 // ms to travel from server to client

const setClientClockOffset = (viewer, scheduledEndTime, timeRemaining) => {
  const serverTime = scheduledEndTime - timeRemaining + LATENCY
  const clientTime = Date.now()
  const clientClockOffset = clientTime - serverTime
  viewer.setValue(clientClockOffset, 'clientClockOffset')
  return clientClockOffset
}

const LocalTimeHandler: Handler = {
  update(store, payload) {
    const record = store.get(payload.dataID)
    const viewer = store.getRoot().getLinkedRecord('viewer')
    if (!record || !viewer) return
    const scheduledEndTimeStr = record.getValue(payload.fieldKey)
    const timeRemaining = record.getValue('timeRemaining')
    if (!scheduledEndTimeStr || !timeRemaining) {
      record.setValue(null, 'localScheduledEndTime')
      return
    }
    const scheduledEndTime = new Date(scheduledEndTimeStr).getTime()
    const clientClockOffset =
      viewer.getValue('clientClockOffset') ||
      setClientClockOffset(viewer, scheduledEndTime, timeRemaining)
    console.log('clock offset', clientClockOffset)
    const localScheduledEndTime = scheduledEndTime + clientClockOffset
    const localScheduledEndTimeStr = new Date(localScheduledEndTime).toJSON()
    record.setValue(localScheduledEndTimeStr, 'localScheduledEndTime')
  }
}

export default LocalTimeHandler
