<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <vue-cred-card
          :card-number="cardNumber"
          :cvv="cvv"
          :expiration-year="expirationDate"
          :expiration-month="expirationDate"
          :credit-card-holder-name="creditCardHolderName"
          ref="credCard">
        </vue-cred-card>
      </div>
    </div>
  
    <div class="row justify-content-center text-center mt-5">
      <div class="col-12 col-sm-10 col-md-9 col-lg-7 col-xl-6 px-sm-0">
        <div class="form-group">
          <input type="text" class="form-control" v-model="creditCardHolderName" placeholder="Holder name" @focus="setTurnAroundInverted">
        </div>
  
        <div class="form-group">
          <input type="number" class="form-control" maxlength="16" v-model="cardNumber" placeholder="Credit card number" @focus="setTurnAroundInverted">
        </div>
  
        <div class="form-row">
          <div class="col-5">
            <div class="form-group">
              <input type="month" v-model="expirationDate" class="form-control" @focus="setTurnAroundInverted">
            </div>
          </div>
  
          <div class="col-3 offset-4">
            <div class="form-group">
              <input type="number" class="form-control" v-model="cvv" placeholder="CVV" @focus="setTurnAround">
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        expirationDate: null,
        creditCardHolderName: null,
        cardNumber: null,
        cvv: null
      }
    },
    methods: {
      setTurnAround () {
        this.$refs.credCard.setTurnAround()
      },

      setTurnAroundInverted () {
        this.$refs.credCard.setTurnAroundInverted()
      }
    }
  }
</script>
