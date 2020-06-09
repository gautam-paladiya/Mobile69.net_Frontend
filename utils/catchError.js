function catchErrors (error) {
  let errorMsg = error
  if (error.response) {
    errorMsg = error.response.data
    console.log('Error response', errorMsg)

    if (error.response.data.error) {
      errorMsg = error.response.data.error.message
    } else {
      errorMsg = error.response.data
    }
  } else if (error.request) {
    // response return no readible error or non readable response
    errorMsg = error.request
    console.log('Error on request', errorMsg)
  } else if (error.message) {
    errorMsg = error.message
    console.log('Some unknown Error on response', errorMsg)
  } else {
    errorMsg = error
    console.log('Typical Error')
  }
  return errorMsg
}

export default catchErrors
