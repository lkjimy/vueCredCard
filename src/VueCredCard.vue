<template>
  <div class="Ccard my-5 cardVisa">

    <div class="card-face" :class="{ 'turnAround': cardInverted }">
      <div class="container">
  
        <div class="form-row justify-content-end mt-2 mb-4">
          <div class="col-auto">
            <img class="logo" src="./images/visa.png" alt="visa logo">
          </div>
        </div>
  
        <div class="form-row mb-3">
          <div class="col-12">
            <p id="cardNumber">{{ cardNumberFormatted }}</p>
          </div>
        </div>
  
        <div class="form-row">
          <div class="col">
            <span class="d-block">Nome:</span>
            <p id="ownerName">John W. Doe</p>
          </div>
  
          <div class="col-auto">
            <span class="d-block">Validade:</span>
            <p id="expirationDate">
              <span id="eMonth">XX</span>/<span id="eYear">XXXX</span>
            </p>
          </div>
        </div>
  
      </div>
    </div>
  
    <div class="card-back" :class="{ 'turnAroundInverted': cardInverted }">
      <div class="magneticStrip mb-3 mt-3"></div>
      <div class="container">
        <div class="form-row">
          <div id="csv" class="col-12 text-right" v-html="cvv"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VueCredCard',
    props: {
      creditCardHolderName: {
        type: String
      },
      cardNumber: {
        type: [Number, String],
        default: '0000 0000 0000 0000'
      },
      expirationMonth: {
        type: [Date, String]
      },
      expirationYear: {
        type: [Date, String]
      },
      cvv: {
        type: [Number, String],
        default: '&#x2731; &#x2731; &#x2731;'
      }
    },
    data () {
      return {
        cardInverted: false
      }
    },
    methods: {
      /**
       * 
       */
      toggleFaceCard () {
        this.cardInverted = !this.cardInverted
      },

      setTurnAround () {
        this.cardInverted = true
      },

      setTurnAroundInverted () {
        this.cardInverted = false
      }
    },
    computed: {
      cardNumberFormatted () {
        return this.cardNumber
      }
    }
  }
</script>
