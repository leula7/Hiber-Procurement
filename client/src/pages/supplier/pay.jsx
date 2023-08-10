import React from 'react'

const Pay = ({name , email,price}) => {
  const rand= Math.floor(Math.random() * 100 ) + 1
  return (
    <div><form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
    <input type="hidden" name="public_key" value="CHAPUBK_TEST-0DWLW0PkMZGsNnBzcUtBngiTx0IvxYXO" />
    <input type="hidden" name="tx_ref" value={name+rand} />
    <input type="hidden" name="amount" value={price} />
    <input type="hidden" name="currency" value="ETB" />
    <input type="hidden" name="email" value={email} />
    <input type="hidden" name="first_name" value="Israel" />
    <input type="hidden" name="last_name" value="Goytom" />
    <input type="hidden" name="title" value="Let us do this" />
    <input type="hidden" name="description" value="Paying with Confidence with cha" />
    <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
    <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
    <input type="hidden" name="return_url" value="http://192.168.43.11:3000/mytender" />
    <input type="hidden" name="meta[title]" value="test" />
    <button type="submit">Pay Now</button>
</form></div>
  )
}

export default Pay