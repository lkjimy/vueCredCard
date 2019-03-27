<template>
  <div class="Ccard my-5" :class="[brand]">

    <div class="card-face" :class="{ 'turnAround': cardInverted }">
      <div class="container">
  
        <div class="form-row justify-content-end mt-2 mb-4">
          <div class="col-auto">
            <img class="logo" :src="imgCard" alt="card logo">
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
            <p id="ownerName">{{ creditCardHolderName }}</p>
          </div>
  
          <div class="col-auto">
            <span class="d-block">Validade:</span>
            <p id="expirationDate">
              <span id="eMonth">{{ expirationMonthFormatted }}</span>/<span id="eYear">{{ expirationYearFormatted }}</span>
            </p>
          </div>
        </div>
  
      </div>
    </div>
  
    <div class="card-back" :class="{ 'turnAroundInverted': cardInverted }">
      <div class="magneticStrip mb-3 mt-3"></div>
      <div class="container">
        <div class="form-row">
          <div id="csv" class="col-12 text-right" v-html="cvvFormatted"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import creditCardType from 'credit-card-type'

  export default {
    name: 'VueCredCard',
    props: {
      creditCardHolderName: {
        type: String
      },
      cardNumber: {
        type: [Number, String]
      },
      expirationMonth: {
        type: [Date, String]
      },
      expirationYear: {
        type: [Date, String]
      },
      cvv: {
        type: [Number, String]
      }
    },
    data () {
      return {
        cardInverted: false,
        brand: null,
        imgCard: null
      }
    },
    created () {
      this.loadBrandLogo()
    },
    methods: {
      /**
       * 
       */
      toggleFaceCard () {
        this.cardInverted = !this.cardInverted
      },

      getCardBrand () {
        const bin = (this.cardNumber || '').replace(/^(\d{4})(\d)/g,'$1 $2')

        if (!bin) {
          this.brand = null
        } else {
          const [ brand = {} ] = creditCardType(bin)

          this.brand = brand.type
        }
      },

      maskCardNumber (cardNumber = ''){
        cardNumber = cardNumber.replace(/\D/g,'')
        cardNumber = cardNumber.replace(/^(\d{4})(\d)/g,'$1 $2')
        cardNumber = cardNumber.replace(/^(\d{4})\s(\d{4})(\d)/g,'$1 $2 $3')
        cardNumber = cardNumber.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g,'$1 $2 $3 $4')

        if (cardNumber.length >= 19) {
          return cardNumber.slice(0, 19)
        }

        return cardNumber
      },

      async loadBrandLogo () {
        const imagePath = this.brand ? `./images/${this.brand}.png` : './images/default.png'

        const image = await import(/* webpackMode: "eager" */ '' + imagePath + '')
        this.imgCard = image.default
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
        this.getCardBrand()

        if (!this.cardNumber) return '0000 0000 0000 0000'

        return this.maskCardNumber(this.cardNumber)
      },

      cvvFormatted () {
        const { cvv = '' } = this

        return cvv ? cvv.slice(0, 3) : '&#x2731; &#x2731; &#x2731;'
      },

      expirationMonthFormatted () {
        if (!this.expirationMonth) return 'XX'

        return moment(this.expirationMonth).format('MM')
      },

      expirationYearFormatted () {
        if (!this.expirationYear) return 'XXXX'

        return moment(this.expirationYear).format('YYYY')
      }
    },
    watch: {
      async brand () {
        console.log('here')
        this.loadBrandLogo()
      }
    }
  }
</script>

<style scoped lang="scss">
@import './styles/variables.scss';

.Ccard {
  height: $height;
  width: $width;
  position: relative;
  font-family: 'Share Tech Mono', monospace;

  &.visa {
    color: darken(white, .8);

    .card-face {
      background: linear-gradient(45deg, map-get($cl-visa, primary), lighten(map-get($cl-visa, primary), 15%));
    }
    .card-back {
      background: linear-gradient(45deg, map-get($cl-visa, primary), lighten(map-get($cl-visa, primary), 15%));
    }
  }

  %cardStyles {
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    height: $height;
    width: $width;
    border-radius: $radius;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    transition: box-shadow .2s ease-in;
  }

  .card-face {
    z-index: 1;
    @extend %cardStyles;

    .logo {
      max-width: 50px;
      max-height: 20px
    }

    #cardNumber {
      min-height: 40px;
      margin: 0;
      font-size: 1.35em;
      text-shadow: 0px 1px 3px transparentize(black, .6);
    }

    #ownerName, #expirationDate {
      min-height: 20px;
      font-size: .7em;
      margin: 0;

      span {
        font-size: inherit;
        margin: 0;
      }
    }

    span {
      font-size: .6em;
    }

    &.turnAround {
      animation-name: turnAround;
      animation-duration: 1s;
      animation-timing-function: ease-in;
      animation-delay: 0;
      animation-direction: normal;
      animation-fill-mode: both;
    }
  }

  .card-back {
    z-index: 0;
    @extend %cardStyles;
    transform: perspective(2000px) rotate3d(0, 1, 0, -180deg);

    .magneticStrip {
      width: 100%;
      height: 40px;
      background-color: black;
    }

    #csv {
      background: #fff;
      border-radius: 3px;
      color: #000;
      min-height: 25px;
    }

    &.turnAroundInverted {
      animation-name: turnAroundInverted;
      animation-duration: 1s;
      animation-timing-function: ease-out;
      animation-delay: 0;
      animation-direction: normal;
      animation-fill-mode: both;
    }
  }
}

@keyframes turnAround {
  0% {
    transform: perspective(2000px) rotate3d(0, 1, 0, 0deg);
    box-shadow: 0 5px 30px rgba(0,0,0,.15);
  }

  50% {
    transform: perspective(2000px) rotate3d(0, 1, 0, 90deg);
    box-shadow: 0 5px 30px rgba(0,0,0,.15);
  }

  100% {
    transform: perspective(2000px) rotate3d(0, 1, 0, 180deg);
    box-shadow: 0 5px 30px rgba(0,0,0,.15);
  }
}

@keyframes turnAroundInverted {
  0% {
    transform: perspective(2000px) rotate3d(0, 1, 0, -180deg);
    box-shadow: 0 5px 30px rgba(0,0,0,.15);
  }

  50% {
    transform: perspective(2000px) rotate3d(0, 1, 0, -90deg);
    box-shadow: 0 5px 30px rgba(0,0,0,.15);
  }

  100% {
    transform: perspective(2000px) rotate3d(0, 1, 0, 0deg);
    box-shadow: 0 5px 30px rgba(0,0,0,.15);
  }
}
</style>
