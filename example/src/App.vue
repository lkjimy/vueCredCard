<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <vue-cred-card :card-number="cardNumber" ref="credCard"></vue-cred-card>
      </div>
    </div>
  
    <div class="row justify-content-center text-center mt-5">
      <div class="col-12 col-sm-10 col-md-9 col-lg-7 col-xl-6 px-sm-0">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Holder name" @focus="setTurnAroundInverted">
        </div>
  
        <div class="form-group">
          <input type="text" class="form-control" v-model="cardNumber" placeholder="Credit card number" @focus="setTurnAroundInverted">
        </div>
  
        <div class="form-row">
          <div class="col-3">
            <div class="form-group">
              <input type="date" class="form-control" @focus="setTurnAroundInverted">
            </div>
          </div>
  
          <div class="col-3">
            <div class="form-group">
              <input type="date" class="form-control" @focus="setTurnAroundInverted">
            </div>
          </div>
  
          <div class="col-3 offset-3">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="CVV" @focus="setTurnAround">
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueCredCard from '../../src/VueCredCard.vue'

  export default {
    name: 'app',
    components: {
      VueCredCard
    },
    data () {
      return {
        cardNumber: ''
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
