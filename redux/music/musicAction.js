export const play = id => ({
  type: 'PLAY',
  payload: { itemId: id }
})

export const pause = id => ({
  type: 'PAUSE',
  payload: { itemId: id }
})
